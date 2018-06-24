const initialState = {
  text: `\
> run script
> set contrast +10
`,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
