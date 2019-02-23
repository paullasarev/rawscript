import React, { useCallback } from 'react';
import { find, map } from 'lodash';
import classNames from 'classnames';

import './tabs.scss';

import Tab from './tab';

import { useHorizontalLeftResize } from './use-resize';
import { useMaxHeader } from './use-max-header';
import { useDragDrop } from './use-drag-drop';

const TabHeader = ({ name, title, isActive, setActive, visible, ...props }) => {
  return (
    <div
      className={ classNames('tabs__title', {
        'tabs__title--active': isActive,
      }) }
      onClick={ (e) => { e.stopPropagation(); setActive(name); } }
      style={ { visibility: visible ? 'visible' : 'hidden' } }
      { ...props }
    >
      { title }
    </div>
  );
};

const HEADER_GAP = 50;

export const Tabs = (props) => {
  const { tabs, tabsComponents, active, setActive, setShow, width, setWidth, moveTab } = props;

  const { headerRef, lastVisible, headersCount } = useMaxHeader(HEADER_GAP);
  const showMore = headersCount && (lastVisible < headersCount);
  const { dragProps, dropProps } = useDragDrop('tabs', moveTab);

  const activeTab = tabsComponents[active];
  const headers = map(tabs, (name, index) => {
    const tabComponent = tabsComponents[name];
    return (
      <TabHeader
        { ...{ name, isActive: name === active, key: name, setActive } }
        visible={ index < lastVisible }
        title={ tabComponent.title }
        { ...dragProps(name) }
        { ...dropProps(name) }
      />
    );
  });

  const { resizableRef, resizerRef, isResizing } = useHorizontalLeftResize({
    redrawOnResize: true,
    setWidth,
  });

  // console.log('render', { lastVisible, headersCount })
  const TabComponent = activeTab ? activeTab.component : null;

  return (
    <div
      className='tabs'
      ref={ resizableRef }
      style={ { width } }
    >
      <div
        className='tabs__header'
        // onClick={ useCallback(() => setShow()) }
        ref={ headerRef }
        { ...dropProps('') }
      >
        {headers}
      </div>
      { showMore && <div className='tabs__more' /> }
      <div className='tabs__tab'>
        <Tab>
          { TabComponent ? <TabComponent /> : null }
        </Tab>
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
