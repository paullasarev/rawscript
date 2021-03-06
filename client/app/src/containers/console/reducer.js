import {
  CONSOLE_RUN,
} from './actions';

const initialState = {
  text: `\
> run script
> set contrast +10
`,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONSOLE_RUN: {
      return {
        ...state,
        text: `${state.text}\n${action.payload}`,
      };
    }
    default:
      return state;
  }
}
