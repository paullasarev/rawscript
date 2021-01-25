import { useEffect, useRef } from 'react';
import { memoize } from 'lodash';

// import { useHtmlRef } from './use-html-ref';

type DropType = (src: string, dst: string) => void;

export function useDragDrop(typeId: string, onDrop: DropType) {
  const funcs = useRef({ dragProps: (srcId: string) => ({}), dropProps: (dstId: string) => ({}) });

  useEffect(() => {
    const type = `custom/${typeId}`;
    funcs.current.dragProps = memoize((srcId) => {
      return {
        draggable: true,
        onDragStart: (e: DragEvent) => {
          if (!e.dataTransfer) return;
          e.dataTransfer.setData(type, `${srcId}`);
        },
      };
    });

    funcs.current.dropProps = memoize((dstId) => {
      return {
        onDragOver: (e: DragEvent) => {
          if (!e.dataTransfer) return;
          if ([...e.dataTransfer.types].includes(type)) {
            e.preventDefault();
          }
        },
        onDragEnter: (e: DragEvent) => {
          if (!e.dataTransfer) return;
          if ([...e.dataTransfer.types].includes(type)) {
            e.preventDefault();
          }
        },
        onDrop: (e: DragEvent) => {
          const { dataTransfer } = e;
          if (!dataTransfer) return;
          e.preventDefault();
          e.stopPropagation();
          const srcId = dataTransfer.getData(type);
          onDrop(`${srcId}`, `${dstId}`);
        },
      };
    });
  }, [typeId, onDrop]);

  return funcs.current;
}
