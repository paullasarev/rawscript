export const EDIT_SET_SHOW_SIDEBAR = 'EDIT_SET_SHOW_SIDEBAR';
export const EDIT_SET_ACTIVE_TAB = 'EDIT_SET_ACTIVE_TAB';

export function setShowSidebar(value) {
  return {
    type: EDIT_SET_SHOW_SIDEBAR,
    payload: value,
  };
}

export function setActiveTab(value) {
  return {
    type: EDIT_SET_ACTIVE_TAB,
    payload: value,
  };
}
