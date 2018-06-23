import React from 'react';
import classNames from 'classnames';

import './script.scss';

const Script = (props) => {
  const { className } = props;
  const text = `\
const Processor = require('processor');
const Files = require('files');
const image = Files.load('.araw');
const proc = new Processor(image);
proc.input(image);
proc.raster();
proc.applyStandardSettings();
const out = Files.create(image.name, '.png');
proc.save(out);
`;
  return (
    <div className={ classNames('script', className) }>
      <div className='script__text'>
        { text }
      </div>
    </div>
  );
};

export default Script;
