import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMainScrollRef } from '../context/MainScrollContext';
import { scrollMainToTop } from '../utils/scroll';

/** Scrolls the main content pane to top on every route change. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const mainRef = useMainScrollRef();

  const scroll = useCallback(() => {
    scrollMainToTop(mainRef?.current ?? null);
  }, [mainRef]);

  useLayoutEffect(() => {
    scroll();
  }, [pathname, scroll]);

  useEffect(() => {
    const id1 = requestAnimationFrame(() => {
      scroll();
      requestAnimationFrame(scroll);
    });
    return () => cancelAnimationFrame(id1);
  }, [pathname, scroll]);

  return null;
}
