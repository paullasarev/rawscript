import React, { PureComponent } from 'react';
import { find, map } from 'lodash';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';

import './tabs.scss';

import { tabsSource, collectSource } from './resize';

const TabHeader = ({name, isActive, setActive}) => {
  return (
    <div
      className={classNames('tabs__title', {
        'tabs__title--active': isActive,
      })}
      onClick={ ()=>setActive(name) }
    >
      { name }
    </div>
  )
}

export class Tabs extends PureComponent {
  getNode = () => {
    return this.tabsNode;
  }

  render() {
    const props = this.props;
    const { children, active, setActive } = props;

    const activeTab = find(children, { props: {name: active}});
    const headers = map(children, ({props:{name}}) => (
      <TabHeader {...{name, isActive: name === active, key:name, setActive}} />
    ))

    const { isDragging, connectDragSource } = props;

    return (
      <div
        className='tabs'
        ref={ (node) => { this.tabsNode = node; } }
      >
        <div className='tabs__header'>
          {headers}
        </div>
        <div className='tabs__tab'>
          { activeTab }
        </div>
        { connectDragSource(<div
          className={classNames('tabs__resizer',{
            'tabs__resizer--dragging': isDragging
          })}
        />) }
      </div>
    );
  }
}

export default DragSource('tabs', tabsSource, collectSource)(Tabs);
