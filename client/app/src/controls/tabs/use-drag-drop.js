import { memoize } from 'lodash';

export function useDragDrop(typeId, onDrop) {
  const type = `custom/${typeId}`;
  const dragProps = memoize((srcId) => {
    return {
      draggable: true,
      onDragStart: (e) => {
        e.dataTransfer.setData(type, `${srcId}`);
      },
    };
  });

  const dropProps = memoize((dstId) => {
    return {
      onDragOver: (e) => {
        if ([...e.dataTransfer.types].includes(type)) {
          e.preventDefault();
        }
      },
      onDrop: (e) => {
        e.preventDefault();
        e.stopPropagation();
        const srcId = e.dataTransfer.getData(type);
        onDrop(`${srcId}`, `${dstId}`);
      },
    };
  });

  return {
    dragProps,
    dropProps,
  };
}
