import React, { useState, useRef, useEffect } from 'react';
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

export const Tabs  = (props) => {
  const { children, active, setActive } = props;

  const activeTab = find(children, { props: {name: active}});
  const headers = map(children, ({props:{name}}) => (
    <TabHeader {...{name, isActive: name === active, key:name, setActive}} />
  ))

  const MIN_WIDTH = 100;
  // const [isResizing, setResizing] = useState(false);
  const resizing = useRef();
  const [startX, setStartX] = useState(0);
  // const [endX, setEndX] = useState(0);
  const tabsEl = useRef();

  const setNewSize = (dx) => {
    const { width } = tabsEl.current.getBoundingClientRect();
    let newWidth = width - dx;
    if (newWidth < MIN_WIDTH) {
      newWidth = MIN_WIDTH;
    }
    console.log('setNewSize', {dx, width, newWidth})
    tabsEl.current.style.width = `${newWidth}px`;
  }

  useEffect(() => {
    const handleUp = (event) => { 
      const isResizing = resizing.current;
      console.log('handleUp', {isResizing});
      event.preventDefault();
      event.stopPropagation();
      //setResizing(false);
      resizing.current = false;
    };
    const handleResize = (event) => {
      const {screenX} = event;
      const isResizing = resizing.current;
      event.preventDefault();
      event.stopPropagation();
      const endX = screenX;
      if (isResizing) {           
        console.log('handleResize', { endX, startX, isResizing })
        setNewSize(endX - startX);
      }
    };
    console.log('useEffect', {resizing});
  
    document.addEventListener('mouseup', handleUp, true);
    document.addEventListener('mousemove', handleResize, true);
    return () => {
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mousemove', handleResize);
    };
  }
  , []
  );

  const onResizerMouseDown = (event) => {
    const {screenX} = event;
    event.preventDefault();
    event.stopPropagation();
    setStartX(screenX);
    // setResizing(true);
    const isResizing = resizing.current;
    resizing.current = true;
    console.log('onResizerMouseDown', {screenX, isResizing})
  }

  // const onResizerMouseMove = ({screenX}) => {
  //   // setNewSize(screenX - startX);
  //   setEndX(screenX);
  // }

  // const onResizerMouseUpOut = ({screenX}) => {
  //   // setNewSize(screenX - startX);
  //   // setEndX(screenX);
  //   setResizing(false);
  // }

  const isResizing = resizing.current;
  return (
    <div
      className='tabs'
      ref={ tabsEl }
    >
      <div className='tabs__header'>
        {headers}
      </div>
      <div className='tabs__tab'>
        { activeTab }
      </div>
      <div
        className={classNames('tabs__resizer',{
          'tabs__resizer--dragging': isResizing
        })}
        onMouseDown={onResizerMouseDown}
        // onMouseMove={onResizerMouseMove}
        // onMouseOut={onResizerMouseUpOut}
        // onMouseUp={onResizerMouseUpOut}
      />
    </div>
  );
};

export default Tabs;

// export class Tabs extends PureComponent {
//   getNode = () => {
//     return this.tabsNode;
//   }

//   render() {
//     const props = this.props;
//     const { children, active, setActive } = props;

//     const activeTab = find(children, { props: {name: active}});
//     const headers = map(children, ({props:{name}}) => (
//       <TabHeader {...{name, isActive: name === active, key:name, setActive}} />
//     ))

//     const { isDragging, connectDragSource } = props;

//     return (
//       <div
//         className='tabs'
//         ref={ (node) => { this.tabsNode = node; } }
//       >
//         <div className='tabs__header'>
//           {headers}
//         </div>
//         <div className='tabs__tab'>
//           { activeTab }
//         </div>
//         { connectDragSource(<div
//           className={classNames('tabs__resizer',{
//             'tabs__resizer--dragging': isDragging
//           })}
//         />) }
//       </div>
//     );
//   }
// }

// export default DragSource('tabs', tabsSource, collectSource)(Tabs);
