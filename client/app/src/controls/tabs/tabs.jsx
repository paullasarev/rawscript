import React, { useCallback, useEffect, useRef } from 'react';
import { find, map } from 'lodash';
import classNames from 'classnames';
// import { DragSource } from 'react-dnd';

import './tabs.scss';

// import { tabsSource, collectSource } from './resize';
import { useHorizontalLeftResize } from './use-resize';
import { useMaxHeader } from './use-max-header';

const TabHeader = ({ name, isActive, setActive, visible }) => {
  return (
    <div
      className={ classNames('tabs__title', {
        'tabs__title--active': isActive,
      }) }
      onClick={ (e) => { e.stopPropagation(); setActive(name); } }
      style={ { visibility: visible ? 'visible' : 'hidden' } }
    >
      { name }
    </div>
  );
};

const HEADER_GAP = 50;

export const Tabs = (props) => {
  const { children, active, setActive, setShow, width, setWidth } = props;

  const { headerRef, lastVisible, headersCount } = useMaxHeader(HEADER_GAP);
  const showMore = headersCount && (lastVisible < headersCount);

  const activeTab = find(children, { props: { name: active } });
  const headers = map(children, ({ props: { name } }, index) => {
    return (
      <TabHeader
        { ...{ name, isActive: name === active, key: name, setActive } }
        visible={ index < lastVisible }
      />
    );
  });

  const { resizableRef, resizerRef, isResizing } = useHorizontalLeftResize({
    redrawOnResize: true,
    setWidth,
  });

  console.log('render', { lastVisible, headersCount })

  return (
    <div
      className='tabs'
      ref={ resizableRef }
      style={ { width } }
    >
      <div
        className='tabs__header'
        onClick={ useCallback(() => setShow()) }
        ref={ headerRef }
      >
        {headers}
      </div>
      { showMore && <div className='tabs__more' /> }
      <div className='tabs__tab'>
        { activeTab }
      </div>
      <div
        className={ classNames('tabs__resizer', {
          'tabs__resizer--dragging': isResizing,
        }) }
        ref={ resizerRef }
      />
    </div>
  );
};

export default Tabs;
