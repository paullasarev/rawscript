import React, { PureComponent } from 'react';
import { find, map } from 'lodash';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';

import './tabs.scss';

const MIN_WIDTH = 200;

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

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const tabsSource = {
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    console.log('beginDrag', monitor.getClientOffset(), component)
    const { x: xStart } = monitor.getClientOffset();
    const { getNode } = component;
    const item = { getNode, xStart };
    return item;
  },

  // canDrag(props, monitor) {
  //   return true;
  // },

  // isDragging(props, monitor) {
  //   console.log('isDragging', monitor.getClientOffset())
  //   return true;
  // },

  endDrag(props, monitor, component) {
    const item = monitor.getItem();
    const { getNode, xStart } = item;
    const node = getNode && getNode();
    if (!node) {
      return;
    }
    const { x: xEnd } = monitor.getClientOffset();
    const dx = xStart - xEnd;
    const { width } = node.getBoundingClientRect();
    const newWidth = Math.max(width + dx, MIN_WIDTH);

    console.log('endDrag', dx, width, newWidth)
    node.style.width = `${newWidth}px`;

    // if (!monitor.didDrop()) {
    //   return;
    // }

    // When dropped on a compatible target, do something
    // const dropResult = monitor.getDropResult();
    // CardActions.moveCardToList(item.id, dropResult.listId);
  },
};

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

export default DragSource('tabs', tabsSource, collect)(Tabs);
