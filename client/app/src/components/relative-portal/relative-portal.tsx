import * as React from 'react';
import classNames from 'classnames';
import { isEqual } from 'lodash';

import { useHtmlRef } from '../../hooks/use-html-ref';

import './relative-portal.scss';

import Portal from './portal';

const { useRef, useState, useEffect } = React;

const SCREEN_GAP = 5;

function getPageOffset() {
  const { documentElement } = document;
  if (!documentElement) return { x: 0, y: 0 };
  return {
    x: documentElement.scrollLeft,
    y: documentElement.scrollTop,
  };
}

interface RelativePortalProps {
  className?: string;
  onOutClick: (e: MouseEvent) => void;
  children: any;
}

export default function RelativePortal({ className, onOutClick, children }: RelativePortalProps) {
  const el = useHtmlRef();
  const portalEl = useHtmlRef();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const node = el.current;
    const portalNode = portalEl.current;
    const { documentElement } = document;
    if (!node || !portalNode || !documentElement) return;

    const rect = node.getBoundingClientRect();
    const portalRect = portalNode.getBoundingClientRect();
    const pageOffset = getPageOffset();
    const top = pageOffset.y + rect.top;
    const maxWidth = documentElement.clientWidth;
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
