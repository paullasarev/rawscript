// @flow
import React, { useCallback, useState } from 'react';
import { map, slice } from 'lodash/fp';
import { compose } from 'redux';
import classNames from 'classnames';

import './tabs.scss';

import Tab from './tab';
import Dropdown from '../dropdown/dropdown';

import { useHorizontalLeftResize } from '../../hooks/use-resize';
import { useMaxHeader } from '../../hooks/use-max-header';
import { useDragDrop } from '../../hooks/use-drag-drop';

const HEADER_GAP = 50;
const mapIndex = map.convert({ cap: false });

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

function makeHeaders(tabsComponents, active, setActive, lastVisible, dragProps, dropProps) {
  return mapIndex((name, index) => {
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
}

function makeHiddenTabs(tabsComponents, lastVisible) {
  return compose(
    map(({ title, name }) => ({ title, value: name })),
    map(name => tabsComponents[name]),
    slice(lastVisible, Number.MAX_VALUE),
  );
}

type TabsProps = {
  tabs: Array<string>,
  tabsComponents: {[string]: { title: string, name: string, component: any } },
  active: string,
  setActive: (active: string) => any,
  width: number,
  setWidth: (width: number) => any,
  moveTab: (src: string, dst: string) => any,
  showTab: (src: string, lastVisible: number) => any,
};

export const Tabs = (props: TabsProps) => {
  const { tabs, tabsComponents, active, setActive, width, setWidth, moveTab, showTab } = props;

  const { headerRef, lastVisible, headersCount } = useMaxHeader(HEADER_GAP);
  const showMore = headersCount && (lastVisible < headersCount);

  const { dragProps, dropProps } = useDragDrop('tabs', moveTab);
  const headers = makeHeaders(tabsComponents, active, setActive, lastVisible, dragProps, dropProps)(tabs);

  const { resizableRef, resizerRef, isResizing } = useHorizontalLeftResize(setWidth, { redrawOnResize: true });

  const activeTab = tabsComponents[active];
  const TabComponent = activeTab ? activeTab.component : null;

  const [showMorePopup, setShowMorePopup] = useState(false);

  const hiddenTabs = makeHiddenTabs(tabsComponents, lastVisible)(tabs);
  const onShowTab = useCallback((tabId) => {
    showTab(tabId, lastVisible);
  }, [showTab, lastVisible]);

  return (
    <div
      className='tabs'
      ref={ resizableRef }
      style={ { width } }
    >
      <div
        className='tabs__header'
        ref={ headerRef }
        { ...dropProps('') }
      >
        {headers}
      </div>
      { showMore && (
        <div
          className='tabs__more'
          onClick={ () => { setShowMorePopup(!showMorePopup); } }
        >
          { showMorePopup && (
            <Dropdown
              items={ hiddenTabs }
              onSelect={ onShowTab }
              onOutClick={ () => { setShowMorePopup(false); } }
            />
          )}
        </div>
      ) }
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
