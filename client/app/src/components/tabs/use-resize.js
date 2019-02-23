import { useState, useRef, useEffect } from 'react';
import { isUndefined } from 'lodash';

export function useHorizontalResize(options) {
  const params = {
    isLeftMargin: true,
    minWidth: 100,
    minGap: 20,
    redrawOnResize: false,
    ...options,
  };
  const { isLeftMargin, minWidth, minGap, redrawOnResize, setWidth } = params;

  const resizeStateRef = useRef({ startX: 0, isResizing: false, width: 0 });
  const [, setState] = useState(0);
  const resizableRef = useRef();
  const resizerRef = useRef();
  const requestRef = useRef(0);

  const setRefWidth = (newWidth, force) => {
    window.cancelAnimationFrame(requestRef.current);
    requestRef.current = window.requestAnimationFrame(() => {
      resizableRef.current.style.width = `${newWidth}px`;
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

  function getScreenX(event, touchType, preventDefault = false) {
    const { type, changedTouches } = event;
    let result = 0;
    if (type === touchType && changedTouches.length) {
      result = changedTouches[0].screenX;
    } else {
      result = event.screenX;
      if (preventDefault) {
        event.preventDefault();
      }
    }
    return result;
  }

  useEffect(() => {
    const getResizeState = () => resizeStateRef.current;
    const setResizeState = (state) => {
      resizeStateRef.current = state;
    };

    const handleUp = (event) => {
      const endX = getScreenX(event, 'touchend');
      const { startX, isResizing, width } = getResizeState();
      if (isResizing) {
        setResizeState({ startX, isResizing: false });
        setNewSize(width, endX - startX, true);
        setState(endX - startX); // force redraw
      }
    };
    const handleResize = (event) => {
      const { startX, isResizing, width } = getResizeState();
      const endX = getScreenX(event, 'touchmove', true);
      if (isResizing) {
        event.stopPropagation();
        setNewSize(width, endX - startX);
        if (redrawOnResize) {
          setState(endX - startX); // force redraw
        }
      }
    };
    const handleDown = (event) => {
      const startX = getScreenX(event, 'touchstart');
      event.preventDefault();
      event.stopPropagation();
      const { width } = resizableRef.current.getBoundingClientRect();
      setResizeState({ startX, isResizing: true, width });
    };

    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('touchmove', handleResize);
    resizerRef.current.addEventListener('mousedown', handleDown);
    resizerRef.current.addEventListener('touchstart', handleDown);
    return () => {
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchend', handleUp);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('touchmove', handleResize);
      resizerRef.current.removeEventListener('mousedown', handleDown);
      resizerRef.current.removeEventListener('touchstart', handleDown);
    };
  }, []);

  return { resizableRef, resizerRef, isResizing: resizeStateRef.current.isResizing };
}

export function useHorizontalLeftResize(options) {
  return useHorizontalResize({ ...options, isLeftMargin: true });
}
