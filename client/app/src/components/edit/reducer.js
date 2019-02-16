import { isUndefined } from 'lodash';

import {
  EDIT_SET_SHOW_SIDEBAR,
  EDIT_SET_ACTIVE_TAB,
} from './actions';

const initialState = {
  showSidebar: true,
  activeTab: 'script',
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
    default:
      return state;
  }
}
