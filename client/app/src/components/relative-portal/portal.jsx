import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ onOutClick, ...props }) {
  const el = useRef();
  const rootRef = useRef();
  if (!el.current) {
    el.current = document.createElement('div');
  }

  useEffect(() => {
    const handleOutClick = (e) => {
      const node = rootRef.current;
      if (node && !node.contains(e.target)) {
        onOutClick(e);
      }
    };

    document.body.appendChild(el.current);
    if (onOutClick) {
      document.addEventListener('click', handleOutClick, true);
    }
    return () => {
      if (onOutClick) {
        document.removeEventListener('click', handleOutClick, true);
      }
      document.body.removeChild(el.current);
    };
  }, [onOutClick]);

  return createPortal(<div { ...props } ref={ rootRef } />, el.current);
}
