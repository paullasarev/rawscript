import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { isEqual } from 'lodash';

import './relative-portal.scss';

import Portal from './portal';

const SCREEN_GAP = 5;

function getPageOffset() {
  return {
    x: (window.pageXOffset !== undefined)
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
    y: (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop,
  }
}

export default function RelativePortal({ className, onOutClick, children }) {
  const el = useRef();
  const portalEl = useRef();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const node = el.current;
    const rect = node.getBoundingClientRect();
    const portalRect = portalEl.current.getBoundingClientRect();
    const pageOffset = getPageOffset();
    const top = pageOffset.y + rect.top;
    const maxWidth = document.documentElement.clientWidth;
    // const right = document.documentElement.clientWidth - rect.right - pageOffset.x;
    let left = pageOffset.x + rect.left;
    const { width } = portalRect;
    if (left + width + SCREEN_GAP > maxWidth) {
      left = maxWidth - width - SCREEN_GAP;
    }
    const newStyles = { left, top };
    if (!isEqual(newStyles, styles)) {
      setStyles(newStyles);
    }
  });

  return (
    <div
      className={ classNames('relative-portal', className) }
      ref={ el }
    >
      <Portal { ...{ onOutClick } }>
        <div
          style={ {
            position: 'fixed',
            zIndex: 1,
            ...styles,
          } }
          ref={ portalEl }
        >
          { children }
        </div>
      </Portal>
    </div>
  );
}
