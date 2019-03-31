// @flow
import React from 'react';
import classNames from 'classnames';

import './button-bar.scss';

type ButtonBarProps ={
  className?: string,
  children: any,
  right?: boolean,
}

const ButtonBar = (props: ButtonBarProps) => {
  const { className, children, right } = props;
  return (
    <div className={ classNames('button-bar', className, {
      'button-bar--right': right,
    }) }
    >
      { children }
    </div>
  );
};

export default ButtonBar;
