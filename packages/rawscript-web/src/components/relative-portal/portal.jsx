import React, { useRef, useEffect, FunctionComponent } from 'react';
import { createPortal } from 'react-dom';

import { useHtmlRef } from '../../hooks/use-html-ref';

type PortalProps = {
  onOutClick: (e: MouseEvent) => void,
};

export const Portal: FunctionComponent<PortalProps> = ({ onOutClick, ...props }) => {
  const rootRef = useHtmlRef();
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      const node = rootRef.current;
      const target = ((e.target: any): Node);
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

    const elCurrent = el.current;
    return () => {
      if (onOutClick) {
        document.removeEventListener('click', handleOutClick, true);
      }
      if (document.body) {
        document.body.removeChild(elCurrent);
      }
    };
  }, [onOutClick, rootRef, el]);

  return createPortal(<div {...props} ref={rootRef} />, el.current);
};

export default Portal;
