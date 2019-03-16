// @flow
import type { ReturnType } from '../../common/types';

export const CONSOLE_RUN = 'CONSOLE_RUN';

export function run(text: string) {
  return {
    type: CONSOLE_RUN,
    payload: text,
  };
}

export type Action =
  ReturnType<typeof run>
;
