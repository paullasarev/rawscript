import { useCallback, useEffect, useState } from 'react';
import { reduce } from 'lodash';

import { useHtmlRef } from './use-html-ref';

export function useMaxHeader(headerGap: number) {
  const headerRef = useHtmlRef();
  const [lastVisible, setLastF] = useState(0);
  const setLast = useCallback(setLastF, [setLastF]);
  useEffect(() => {
    if (!headerRef.current) return;
    const node = headerRef.current;
    const maxWidth = node.clientWidth - headerGap;
    const headerState = reduce(
      node.children,
      ({ width, last }, el) => {
        const newWidth = width + el.clientWidth;
        const newLast = newWidth < maxWidth ? last + 1 : last;
        return { width: newWidth, last: newLast };
      },
      { width: 0, last: 0 },
    );
    if (lastVisible !== headerState.last) {
      setLast(headerState.last);
    }
  });

  const headersCount = headerRef.current ? headerRef.current.children.length : 0;
  return { headerRef, lastVisible, headersCount };
}
