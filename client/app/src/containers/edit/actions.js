// @flow
import type { ReturnType } from '../../common/types';

export const EDIT_SHOW_PICTURE = 'EDIT_SHOW_PICTURE';

export function setShowPicture(value: boolean) {
  return {
    type: EDIT_SHOW_PICTURE,
    payload: value,
  };
}

export type Action =
  ReturnType<typeof setShowPicture>
;
