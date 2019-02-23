import { isUndefined, isEmpty } from 'lodash';

import {
  EDIT_SET_SHOW_SIDEBAR,
  EDIT_SET_ACTIVE_TAB,
  EDIT_SET_SIDEBAR_WIDTH,
  EDIT_SET_MOVE_TAB,
} from './actions';

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

function swap(plist, iA, iB) {
  const list = [...plist];
  [list[iA], list[iB]] = [list[iB], list[iA]];
  return list;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_SET_SHOW_SIDEBAR: {
      const show = action.payload;
      return {
        ...state,
        showSidebar: isUndefined(show) ? !state.showSidebar : show,
      };
    }
    case EDIT_SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.payload,
      };
    }
    case EDIT_SET_SIDEBAR_WIDTH: {
      return {
        ...state,
        sidebarWidth: action.payload,
      };
    }
    case EDIT_SET_MOVE_TAB: {
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
    default:
      return state;
  }
}
