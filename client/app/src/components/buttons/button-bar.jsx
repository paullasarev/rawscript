import React from 'react';
import classNames from 'classnames';

import './button-bar.scss';

const ButtonBar = (props) => {
  const { className, children } = props;
  return (
    <div className={ classNames('button-bar', className) }>
      { children }
    </div>
  );
};

export default ButtonBar;
