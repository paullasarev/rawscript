// @flow
export const SIDE_PANEL_SHOW_SIDEBAR = 'SIDE_PANEL_SHOW_SIDEBAR';
export const SIDE_PANEL_SET_ACTIVE_TAB = 'SIDE_PANEL_SET_ACTIVE_TAB';
export const SIDE_PANEL_SET_SIDEBAR_WIDTH = 'SIDE_PANEL_SET_SIDEBAR_WIDTH';
export const SIDE_PANEL_MOVE_TAB = 'SIDE_PANEL_MOVE_TAB';
export const SIDE_PANEL_SHOW_TAB = 'SIDE_PANEL_SHOW_TAB';

export function setShowSidebar(value: boolean) {
  return {
    type: SIDE_PANEL_SHOW_SIDEBAR,
    payload: value,
  };
}

export function setActiveTab(value: string) {
  return {
    type: SIDE_PANEL_SET_ACTIVE_TAB,
    payload: value,
  };
}

export function setSidebarWidth(value: number) {
  return {
    type: SIDE_PANEL_SET_SIDEBAR_WIDTH,
    payload: value,
  };
}

export function moveTab(srcId: string, dstId: string) {
  return {
    type: SIDE_PANEL_MOVE_TAB,
    payload: {
      srcId,
      dstId,
    },
  };
}

export function showTab(tabId: string, lastVisible: number) {
  return {
    type: SIDE_PANEL_SHOW_TAB,
    payload: {
      tabId,
      lastVisible,
    },
  };
}

export type Action =
  $Call<typeof setShowSidebar, boolean> // eslint-disable-line no-undef
  | $Call<typeof setActiveTab, string> // eslint-disable-line no-undef
  | $Call<typeof setSidebarWidth, number> // eslint-disable-line no-undef
  | $Call<typeof moveTab, string, string> // eslint-disable-line no-undef
  | $Call<typeof showTab, string, number> // eslint-disable-line no-undef
;
