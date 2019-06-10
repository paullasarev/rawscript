import { isUndefined, isEmpty } from 'lodash';
import { AnyAction } from 'redux';

import {
  // StateAction,
  SIDE_PANEL_SHOW_SIDEBAR,
  SIDE_PANEL_SET_ACTIVE_TAB,
  SIDE_PANEL_SET_SIDEBAR_WIDTH,
  SIDE_PANEL_MOVE_TAB,
  SIDE_PANEL_SHOW_TAB, setShowSidebar, setActiveTab, setSidebarWidth, moveTab, showTab,
} from './actions';

export type State = {
  showSidebar: boolean;
  activeTab: string;
  sidebarWidth: number;
  tabs: Array<string>;
}

export type StateAction =
  ReturnType<typeof setShowSidebar | typeof setActiveTab | typeof setSidebarWidth | typeof moveTab | typeof showTab>
| AnyAction
;

export const section = 'sidePanel';
export type StoreState = { sidePanel: State };
export const selector = (state: StoreState) => state.sidePanel;

const initialState = {
  showSidebar: true,
  activeTab: 'Script',
  sidebarWidth: 280,
  tabs: [
    'script',
    'console',
    'file',
  ],
};

export default function reducer(state: State = initialState, action: StateAction): State {
  switch (action.type) {
    case SIDE_PANEL_SHOW_SIDEBAR: {
      const show = action.payload;
      return {
        ...state,
        showSidebar: isUndefined(show) ? !state.showSidebar : show,
      };
    }
    case SIDE_PANEL_SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.payload,
      };
    }
    case SIDE_PANEL_SET_SIDEBAR_WIDTH: {
      return {
        ...state,
        sidebarWidth: action.payload,
      };
    }
    case SIDE_PANEL_MOVE_TAB: {
      const { srcId, dstId } = action.payload;
      const { tabs: oldTabs } = state;
      if (srcId === dstId) {
        return state;
      }
      let tabs = oldTabs;
      const srcIndex = oldTabs.indexOf(srcId);
      tabs = [...oldTabs];
      const el = tabs[srcIndex];
      tabs.splice(srcIndex, 1);
      if (isEmpty(dstId)) {
        tabs.push(el);
      } else {
        const dstIndex = oldTabs.indexOf(dstId);
        tabs.splice(dstIndex, 0, el);
      }
      return {
        ...state,
        tabs,
      };
    }
    case SIDE_PANEL_SHOW_TAB: {
      const { tabId, lastVisible } = action.payload;
      const { tabs: oldTabs } = state;
      const srcIndex = oldTabs.indexOf(tabId);
      const dstIndex = lastVisible - 1;
      const tabs = [...oldTabs];
      const srcEl = tabs[srcIndex];
      tabs.splice(srcIndex, 1);
      tabs.splice(dstIndex, 0, srcEl);
      return {
        ...state,
        tabs,
        activeTab: tabId,
      };
    }

    default:
      return state;
  }
}
