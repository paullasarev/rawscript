import React, { FunctionComponent, useCallback } from 'react';
import classNames from 'classnames';

import './button.scss';

type ButtonProps = {
  className?: string;
  text: string;
  action: (...values: any) => any;
  arg: any;
};

export const Button: FunctionComponent<ButtonProps> = (props) => {
  const { action, arg } = props;
  const onClick = useCallback(() => {
    action(...arg);
  }, [action, arg]);

  const { className, text } = props;
  return (
    <div className={classNames('button', className)} onClick={onClick} tabIndex={0}>
      {text}
    </div>
  );
};

export default Button;
