import { isUndefined } from 'lodash';

import {
  EDIT_SET_SHOW_SIDEBAR,
  EDIT_SET_ACTIVE_TAB,
  EDIT_SET_SIDEBAR_WIDTH,
} from './actions';

const initialState = {
  showSidebar: true,
  activeTab: 'Script',
  sidebarWidth: 280,
};

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
    default:
      return state;
  }
}
