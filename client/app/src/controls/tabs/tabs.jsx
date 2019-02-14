import React from 'react';
import { find, map } from 'lodash';
import classNames from 'classnames';
// import { DragSource } from 'react-dnd';

import './tabs.scss';

// import { tabsSource, collectSource } from './resize';
import { useHorizontalLeftResize } from './use-resize';

const TabHeader = ({ name, isActive, setActive }) => {
  return (
    <div
      className={ classNames('tabs__title', {
        'tabs__title--active': isActive,
      }) }
      onClick={ () => setActive(name) }
    >
      { name }
    </div>
  );
};

export const Tabs = (props) => {
  const { children, active, setActive } = props;

  const activeTab = find(children, { props: { name: active } });
  const headers = map(children, ({ props: { name } }) => (
    <TabHeader { ...{ name, isActive: name === active, key: name, setActive } } />
  ));

  const { resizableRef, resizerRef, isResizing } = useHorizontalLeftResize({redrawOnResize: true});

  // console.log('render', { isResizing })

  return (
    <div
      className='tabs'
      ref={ resizableRef }
    >
      <div className='tabs__header'>
        {headers}
      </div>
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
