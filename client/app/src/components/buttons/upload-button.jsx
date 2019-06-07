// @flow
import React, { useCallback, useRef } from 'react';
import classNames from 'classnames';

import './button.scss';

type Props = {
  className?: string,
  text: string,
  action: (...values: any) => any,
  arg: any,
};

export default function UploadButton (props: Props) {
  const { action, arg } = props;
  const ref = useRef<HTMLInputElement|null>(null);

  const onChange = useCallback(() => {
    if (ref.current) {
      action(ref.current.files);
    }
  }, [action, arg, ref]);

  const onClick = useCallback(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, [ref]);

  const { className, text } = props;
  return (
    <div className={ classNames('button.tsx', className) } onClick={ onClick } tabIndex='0'>
      <input
        type='file'
        style={ { display: 'none' } }
        onChange={ onChange }
        ref={ ref }
        multiple
      />
      { text }
    </div>
  );
}
