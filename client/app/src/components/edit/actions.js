export const EDIT_SET_SHOW_SIDEBAR = 'EDIT_SET_SHOW_SIDEBAR';
export const EDIT_SET_ACTIVE_TAB = 'EDIT_SET_ACTIVE_TAB';
export const EDIT_SET_SIDEBAR_WIDTH = 'EDIT_SET_SIDEBAR_WIDTH';
export const EDIT_SET_MOVE_TAB = 'EDIT_SET_MOVE_TAB';

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

export function setSidebarWidth(value) {
  return {
    type: EDIT_SET_SIDEBAR_WIDTH,
    payload: value,
  };
}

export function moveTab(srcId, dstId) {
  return {
    type: EDIT_SET_MOVE_TAB,
    payload: {
      srcId,
      dstId,
    },
  };
}
