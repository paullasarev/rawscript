// @flow
import React from 'react';
import classNames from 'classnames';

import './button-bar.scss';

type ButtonBarProps ={
  className?: string,
  children: any,
}

const ButtonBar = (props: ButtonBarProps) => {
  const { className, children } = props;
  return (
    <div className={ classNames('button-bar', className) }>
      { children }
    </div>
  );
};

export default ButtonBar;
