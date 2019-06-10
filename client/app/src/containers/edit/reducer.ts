import {
  EDIT_SHOW_PICTURE,
  setShowPicture,
} from './actions';

// import { ReturnType } from '../../common/types';

export type State = {
  showPicture: boolean;
}

const initialState: State = {
  showPicture: true,
};

export type StateAction =
  ReturnType<typeof setShowPicture>
;

export const section = 'edit';
export type StoreState = { edit: State };
export const selector = (state: StoreState) => state.edit;

export default function reducer(state: State = initialState, action: StateAction): State {
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
