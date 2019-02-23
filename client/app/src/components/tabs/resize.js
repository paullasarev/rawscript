
const MIN_WIDTH = 200;

export function collectSource(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

export function setNodeWidth(monitor) {
  const item = monitor.getItem();
  if (!item) {
    return;
  }
  const { getNode, xStart } = item;
  const node = getNode && getNode();
  if (!node) {
    return;
  }
  // const rect = monitor.getClientOffset();
  const rect = monitor.getDifferenceFromInitialOffset();
  if (!rect) {
    return;
  }
  // console.log('diff', monitor.getDifferenceFromInitialOffset());
  //return;
  // const { x: xEnd } = monitor.getClientOffset();
  // const dx = xStart - xEnd;
  const { x: dx} = rect;

  const { width } = node.getBoundingClientRect();
  const newWidth = Math.max(width - dx, MIN_WIDTH);

  // console.log('setNodeWidth', dx, width, newWidth)
  node.style.width = `${newWidth}px`;
}

export const tabsSource = {
  beginDrag(props, monitor, component) {
    const { x: xStart } = monitor.getClientOffset();
    const { getNode } = component;
    const item = { getNode, xStart };
    // console.log('beginDrag', xStart);
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
    // setNodeWidth(monitor);

    // if (!monitor.didDrop()) {
    //   return;
    // }

    // When dropped on a compatible target, do something
    // const dropResult = monitor.getDropResult();
    // CardActions.moveCardToList(item.id, dropResult.listId);
  },
};

export const tabsTarget = {
  canDrop(props, monitor) {
    return true;
  },
  // hover(props, monitor, component) {
  //   setNodeWidth(monitor);
  //   console.log('hover')
  // },
  drop(props, monitor) {
    setNodeWidth(monitor);
  }
}

export function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

