export const SIDE_PANEL_SHOW_SIDEBAR = 'SIDE_PANEL_SHOW_SIDEBAR';
export const SIDE_PANEL_SET_ACTIVE_TAB = 'SIDE_PANEL_SET_ACTIVE_TAB';
export const SIDE_PANEL_SET_SIDEBAR_WIDTH = 'SIDE_PANEL_SET_SIDEBAR_WIDTH';
export const SIDE_PANEL_MOVE_TAB = 'SIDE_PANEL_MOVE_TAB';
export const SIDE_PANEL_SHOW_TAB = 'SIDE_PANEL_SHOW_TAB';

export function setShowSidebar(value) {
  return {
    type: SIDE_PANEL_SHOW_SIDEBAR,
    payload: value,
  };
}

export function setActiveTab(value) {
  return {
    type: SIDE_PANEL_SET_ACTIVE_TAB,
    payload: value,
  };
}

export function setSidebarWidth(value) {
  return {
    type: SIDE_PANEL_SET_SIDEBAR_WIDTH,
    payload: value,
  };
}

export function moveTab(srcId, dstId) {
  return {
    type: SIDE_PANEL_MOVE_TAB,
    payload: {
      srcId,
      dstId,
    },
  };
}

export function showTab(value) {
  return {
    type: SIDE_PANEL_SHOW_TAB,
    payload: value,
  };
}
