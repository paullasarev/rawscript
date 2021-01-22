import { useState, useRef, useEffect } from 'react';
// import { isUndefined } from 'lodash';

import { useHtmlRef } from './use-html-ref';

type ResizeOptions = {
  isLeftMargin?: boolean,
  minWidth?: number,
  minGap?: number,
  redrawOnResize?: boolean,
};

type setWidthType = (width: number) => void;

// type ResizeState = {
//   startX: number,
//   isResizing: boolean,
//   width: number,
// };

function getScreenX(event: MouseEvent | TouchEvent, preventDefault = false) {
  let result = 0;
  if (event instanceof TouchEvent) {
    const { changedTouches } = event;
    if (changedTouches.length) {
      result = changedTouches[0].screenX;
    }
  } else {
    result = event.screenX;
    if (preventDefault) {
      event.preventDefault();
    }
  }
  return result;
}

export function useHorizontalResize(setWidth: setWidthType, options: ResizeOptions) {
  const params = {
    isLeftMargin: true,
    minWidth: 100,
    minGap: 20,
    redrawOnResize: false,
    ...options,
  };
  const { isLeftMargin, minWidth, minGap, redrawOnResize } = params;

  const resizeStateRef = useRef({ startX: 0, isResizing: false, width: 0 });
  const [, setState] = useState(0);
  const resizableRef = useHtmlRef();
  const resizerRef = useHtmlRef();
  const requestRef = useRef(0);

  useEffect(() => {
    const getResizeState = () => resizeStateRef.current;
    const setResizeState = (state) => {
      resizeStateRef.current = state;
    };

    const setRefWidth = (newWidth, force) => {
      window.cancelAnimationFrame(requestRef.current);
      requestRef.current = window.requestAnimationFrame(() => {
        if (resizableRef.current) {
          resizableRef.current.style.width = `${newWidth}px`;
        }
      });
      if (setWidth && force) {
        setWidth(newWidth);
      }
    };

    const setNewSize = (width, dx, force = false) => {
      let newWidth = isLeftMargin ? width - dx : width + dx;
      if (newWidth < minWidth) {
        newWidth = minWidth;
      }
      const maxWidth = window.innerWidth - minGap;
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
      }
      setRefWidth(newWidth, force);
    };


    const handleUp = (event: MouseEvent | TouchEvent) => {
      const { startX, isResizing, width } = getResizeState();
      if (isResizing) {
        const endX = getScreenX(event);
        setResizeState({ startX, isResizing: false, width: 0 });
        setNewSize(width, endX - startX, true);
        setState(endX - startX); // force redraw
      }
    };
    const handleResize = (event: MouseEvent | TouchEvent) => {
      const { startX, isResizing, width } = getResizeState();
      if (isResizing) {
        const endX = getScreenX(event, true);
        event.stopPropagation();
        setNewSize(width, endX - startX);
        if (redrawOnResize) {
          setState(endX - startX); // force redraw
        }
      }
    };
    const handleDown = (event: MouseEvent | TouchEvent) => {
      const startX = getScreenX(event);
      event.preventDefault();
      event.stopPropagation();
      if (resizableRef.current) {
        const { width } = resizableRef.current.getBoundingClientRect();
        setResizeState({ startX, isResizing: true, width });
      }
    };

    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('touchmove', handleResize);
    const ref = resizerRef.current;
    if (ref) {
      ref.addEventListener('mousedown', handleDown);
      ref.addEventListener('touchstart', handleDown);
    }
    const resizerRefCurrent = resizerRef.current;
    return () => {
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchend', handleUp);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('touchmove', handleResize);
      const ref = resizerRefCurrent;
      if (ref) {
        ref.removeEventListener('mousedown', handleDown);
        ref.removeEventListener('touchstart', handleDown);
      }
    };
  }, [redrawOnResize, resizableRef, resizerRef, isLeftMargin, minGap, minWidth, setWidth]);

  return { resizableRef, resizerRef, isResizing: resizeStateRef.current.isResizing };
}

export function useHorizontalLeftResize(setWidth: setWidthType, options: ResizeOptions) {
  return useHorizontalResize(setWidth, { ...options, isLeftMargin: true });
}
