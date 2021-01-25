import { Action } from 'redux';

export interface State {
  text: string;
}

const initialState: State = {
  text: `\
const Processor = require('processor');
const Files = require('files');
const image = Files.load('.araw');
const proc = new Processor(image);
proc.input(image);
proc.raster();
proc.applyStandardSettings();
const out = Files.create(image.name, '.png');
proc.save(out);
`,
};

export const selector = (rootState: { script: State }) => rootState.script;

export function script(state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
