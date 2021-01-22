import { useRef } from 'react';

export function useHtmlRef() {
  return useRef<HTMLDivElement|null>(null);
}
