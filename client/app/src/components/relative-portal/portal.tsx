import * as React from 'react';
// import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useHtmlRef } from '../../hooks/use-html-ref';

const { useRef, useEffect } = React;

interface PortalProps {
  onOutClick: (e: MouseEvent) => void;
}


export default function Portal({ onOutClick, ...props }: PortalProps) {
  const rootRef = useHtmlRef();
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const node = rootRef.current;
      // const target = ((e.target: any): Node);
      const target = ((e.target as any) as Node);
      // const target: any = e.target ;
      if (node && !node.contains(target)) {
        onOutClick(e);
      }
    };

    if (document.body) {
      document.body.appendChild(el.current);
    }
    if (onOutClick) {
      document.addEventListener('click', handleOutClick, true);
    }
    return () => {
      if (onOutClick) {
        document.removeEventListener('click', handleOutClick, true);
      }
      if (document.body) {
        document.body.removeChild(el.current);
      }
    };
  }, [onOutClick]);

  return createPortal(<div { ...props } ref={ rootRef } />, el.current);
}
