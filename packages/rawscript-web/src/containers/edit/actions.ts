export const EDIT_SHOW_PICTURE = 'EDIT_SHOW_PICTURE';

export function setShowPicture(value: boolean) {
  return {
    type: EDIT_SHOW_PICTURE,
    payload: value,
  };
}

export type EditAction =
  ReturnType<typeof setShowPicture>
;
