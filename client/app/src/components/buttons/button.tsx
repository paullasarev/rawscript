// @ts-ignore
import React, { useCallback } from 'react';
import classNames from 'classnames';

import './button.scss';

interface ButtonProps {
  className?: string;
  text: string;
  action: (...values: any) => any;
  arg: any;
}

export default function Button (props: ButtonProps) {
  const { action, arg } = props;
  const onClick = useCallback(() => {
    action(...arg);
  }, [action, arg]);

  const { className, text } = props;
  return (
    <div className={ classNames('button', className) } onClick={ onClick } tabIndex={0}>
      { text }
    </div>
  );
}
