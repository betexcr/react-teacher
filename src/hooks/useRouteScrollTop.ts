import { useCallback, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMainScrollRef } from '../context/MainScrollContext';
import { scrollMainToTop } from '../utils/scroll';

/** Scroll main content to top when this route mounts or pathname changes. */
export function useRouteScrollTop() {
  const { pathname } = useLocation();
  const mainRef = useMainScrollRef();

  const scroll = useCallback(() => {
    scrollMainToTop(mainRef?.current ?? null);
  }, [mainRef]);

  useLayoutEffect(() => {
    scroll();
    const id = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(id);
  }, [pathname, scroll]);
}
