import React from 'react';
import classNames from 'classnames';

import './console.scss';

const Console = (props) => {
  const { className } = props;
  const text = `\
> run script
> set contrast +10
`;
  return (
    <div className={ classNames('console', className) }>
      <div className='console__text'>
        { text }
      </div>
    </div>
  );
};

export default Console;
