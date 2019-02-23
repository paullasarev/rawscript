import { useEffect, useRef, useState } from 'react';
import { reduce } from 'lodash';

export function useMaxHeader(headerGap) {
  const headerRef = useRef();
  const [lastVisible, setLast] = useState(0);
  useEffect(() => {
    const node = headerRef.current;
    const maxWidth = node.clientWidth - headerGap;
    const headerState = reduce(node.children, ({ width, last }, el) => {
      const newWidth = width + el.clientWidth;
      const newLast = newWidth < maxWidth ? last + 1 : last;
      return { width: newWidth, last: newLast };
    }, { width: 0, last: 0 });
    setLast(headerState.last);
  });

  const headersCount = headerRef.current ? headerRef.current.children.length : 0;
  return { headerRef, lastVisible, headersCount };
}
