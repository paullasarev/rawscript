// @flow
import {
  EDIT_SHOW_PICTURE,
  type Action,
} from './actions';

export type State = {
  showPicture: boolean;
}

const initialState: State = {
  showPicture: true,
};

export const section = 'edit';
export type StoreState = { edit: State };
export const selector = (state: StoreState) => state.edit;

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case EDIT_SHOW_PICTURE: {
      const showPicture = action.payload;
      return {
        ...state,
        showPicture,
      };
    }
    default:
      return state;
  }
}
