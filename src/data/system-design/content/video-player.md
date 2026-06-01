# Custom Video Player

## Problem Statement

Build a custom HTML5 video player in React with:

- **Playback:** Play/pause, seek, volume, mute, fullscreen, playback rate
- **Streaming:** HLS/DASH adaptive bitrate for long-form content
- **Performance:** Smooth UI at 60fps; minimal main-thread blocking
- **Accessibility:** Keyboard controls, captions (WebVTT), focus management
- **Analytics:** Quartile events (25/50/75/100%), buffering metrics
- **Mobile:** Inline playback policies, touch-friendly controls

## System Architecture

- **Client Layer:** React player shell, Media element controller, hls.js/shaka for MSE, caption track renderer
- **API Layer:** Signed URL issuance, CDN token auth, analytics ingest endpoint
- **Data Layer:** Asset catalog, transcoding pipeline (multiple renditions), viewership warehouse

```text
CDN (HLS segments) ◄── Player (MSE) ◄── Manifest (.m3u8)
Analytics beacon ──► /events (batch, sendBeacon on unload)
```

## Key Technical Decisions

### 1. Native video vs. MSE library

**Progressive MP4** is simple but no ABR. **HLS** via `hls.js` (Safari native HLS) enables adaptive quality based on bandwidth.

### 2. State machine

Player states: `idle | loading | playing | paused | buffering | ended | error`. Centralize transitions to avoid impossible UI (e.g. seek while loading).

### 3. Seek preview and thumbnails

Optional sprite sheet VTT (`#xywh`) for hover scrubber—loaded lazily.

### 4. Memory and bandwidth

Destroy HLS instance on unmount; cap max buffer length in `hls.js` config (`maxBufferLength: 30`).

## Implementation: Core Components

```tsx
import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';

export function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [state, setState] = useState<'loading' | 'playing' | 'paused' | 'buffering'>('loading');

  useEffect(() => {
    const video = videoRef.current!;
    if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferLength: 30 });
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
      return () => hls.destroy();
    }
    video.src = src;
  }, [src]);

  useEffect(() => {
    const video = videoRef.current!;
    const onWaiting = () => setState('buffering');
    const onPlaying = () => setState('playing');
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    return () => {
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
    };
  }, []);

  const seek = (pct: number) => {
    const video = videoRef.current!;
    video.currentTime = pct * video.duration;
  };

  return (
    <div className="player">
      <video ref={videoRef} playsInline />
      <Controls state={state} onPlayPause={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()} onSeek={seek} />
    </div>
  );
}
```

```ts
// Analytics quartiles
useEffect(() => {
  const sent = new Set<number>();
  const onTime = () => {
    const p = (video.currentTime / video.duration) * 100;
    [25, 50, 75, 100].forEach((q) => {
      if (p >= q && !sent.has(q)) {
        sent.add(q);
        navigator.sendBeacon('/analytics/video', JSON.stringify({ quartile: q }));
      }
    });
  };
  video.addEventListener('timeupdate', onTime);
  return () => video.removeEventListener('timeupdate', onTime);
}, []);
```

## Performance Optimization

- `requestVideoFrameCallback` for frame-accurate overlays (where supported)
- CSS `transform` for control bar show/hide (compositor-friendly)
- Preload `metadata` only until user initiates play (save bandwidth)
- Worker thread for thumbnail parsing if needed
- Avoid React state updates every `timeupdate`—throttle progress bar to 4–10 Hz

## Edge Cases and Error Handling

- **Autoplay policies:** Muted autoplay only; show big play button otherwise
- **Fatal HLS error:** `hls.recoverMediaError()` once, then fallback rendition
- **Empty duration live streams:** Hide seek bar; show LIVE badge
- **Fullscreen API differences:** Prefix handling + iOS `webkitEnterFullscreen`
- **Captions:** Track `mode = 'showing'`; keyboard shortcut `c` toggles
