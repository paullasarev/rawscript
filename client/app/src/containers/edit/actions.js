export const EDIT_SHOW_PICTURE = 'EDIT_SHOW_PICTURE';
export function setShowPicture(value) {
  return {
    type: EDIT_SHOW_PICTURE,
    payload: value,
  };
}
