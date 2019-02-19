import { useEffect, useRef } from 'react';
import { memoize } from 'lodash';

export function useDragDrop(typeId, onDrop) {
  const funcs = useRef({ dragProps: () => ({}), dropProps: () => ({}) });

  useEffect(() => {
    const type = `custom/${typeId}`;
    funcs.current.dragProps = memoize((srcId) => {
      return {
        draggable: true,
        onDragStart: (e) => {
          e.dataTransfer.setData(type, `${srcId}`);
        },
      };
    });

    funcs.current.dropProps = memoize((dstId) => {
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
  }, [typeId, onDrop]);

  return funcs.current;
}
