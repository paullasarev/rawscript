const initialState = {
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
