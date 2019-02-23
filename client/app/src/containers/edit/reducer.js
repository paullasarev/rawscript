import {
  EDIT_SHOW_PICTURE,
} from './actions';

const initialState = {
  showPicture: true,
};

export default function reducer(state = initialState, action) {
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
