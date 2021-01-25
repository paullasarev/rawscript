import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import './script.scss';

import { selector } from './reducer';

export interface ScriptProps {
  className?: string;
}

const Script: FunctionComponent<ScriptProps> = (props) => {
  const { className } = props;
  const { text } = useSelector(selector);

  return (
    <div className={classNames('script', className)}>
      <div className="script__text">{text}</div>
    </div>
  );
};

export default Script;
