import { useState, useRef, useEffect } from 'react';

export function useHorizontalResize(options) {
  const params = {
    isLeftMargin: true,
    minWidth: 100,
    minGap: 20,
    ...options,
  };
  const { isLeftMargin, minWidth, minGap } = params;

  const resizeStateRef = useRef({ startX: 0, isResizing: false });
  const [state, setState] = useState(0);
  const resizableRef = useRef();
  const resizerRef = useRef();

  const getResizeState = () => resizeStateRef.current;
  const setResizeState = (state) => {
    resizeStateRef.current = state;
  };

  const setNewSize = (dx) => {
    const { width } = resizableRef.current.getBoundingClientRect();
    let newWidth = isLeftMargin ? width - dx : width + dx;
    if (newWidth < minWidth) {
      newWidth = minWidth;
    }
    const maxWidth = window.innerWidth - minGap;
    if (newWidth > maxWidth) {
      newWidth = maxWidth;
    }
    // console.log('setNewSize', {dx, width, newWidth})
    resizableRef.current.style.width = `${newWidth}px`;
  };

  useEffect(() => {
    const handleUp = (event) => {
      // console.log('handleUp', getResizeState());
      const { screenX: endX } = event;
      const { startX, isResizing } = getResizeState();
      if (isResizing) {
        setResizeState({ startX, isResizing: false });
        setState(endX - startX); // force redraw
      }
    };
    const handleResize = (event) => {
      const { screenX: endX } = event;
      const { startX, isResizing } = getResizeState();
      if (isResizing) {
        event.preventDefault();
        event.stopPropagation();
        // console.log('handleResize', { endX, startX, isResizing })
        setResizeState({ startX: endX, isResizing: true });
        setNewSize(endX - startX);
      }
    };
    const handleDown = (event) => {
      const { screenX: startX } = event;
      event.preventDefault();
      event.stopPropagation();
      // console.log('handleDown', getResizeState())
      setResizeState({ startX, isResizing: true });
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

  return { resizableRef, resizerRef, isResizing: getResizeState().isResizing };
}

export function useHorizontalLeftResize(options) {
  return useHorizontalResize({ ...options, isLeftMargin: true });
}
