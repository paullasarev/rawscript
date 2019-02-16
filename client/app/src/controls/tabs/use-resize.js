import { useState, useRef, useEffect } from 'react';

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

  useEffect(() => {
    const getResizeState = () => resizeStateRef.current;
    const setResizeState = (state) => {
      resizeStateRef.current = state;
    };

    const handleUp = (event) => {
      const { screenX: endX } = event;
      const { startX, isResizing, width } = getResizeState();
      if (isResizing) {
        setResizeState({ startX, isResizing: false });
        setNewSize(width, endX - startX, true);
        setState(endX - startX); // force redraw
      }
    };
    const handleResize = (event) => {
      const { screenX: endX } = event;
      const { startX, isResizing, width } = getResizeState();
      if (isResizing) {
        event.preventDefault();
        event.stopPropagation();
        setNewSize(width, endX - startX);
        if (redrawOnResize) {
          setState(endX - startX); // force redraw
        }
      }
    };
    const handleDown = (event) => {
      const { screenX: startX } = event;
      event.preventDefault();
      event.stopPropagation();
      const { width } = resizableRef.current.getBoundingClientRect();
      setResizeState({ startX, isResizing: true, width });
    };

    document.addEventListener('mouseup', handleUp);
    document.addEventListener('mousemove', handleResize);
    resizerRef.current.addEventListener('mousedown', handleDown);
    return () => {
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mousemove', handleResize);
      resizerRef.current.removeEventListener('mousedown', handleDown);
    };
  }, []);

  return { resizableRef, resizerRef, isResizing: resizeStateRef.current.isResizing };
}

export function useHorizontalLeftResize(options) {
  return useHorizontalResize({ ...options, isLeftMargin: true });
}
