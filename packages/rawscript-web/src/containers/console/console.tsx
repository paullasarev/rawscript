import React, { FunctionComponent } from 'react';
// import { connect } from 'react-redux';
// import { Action } from 'redux';
import classNames from 'classnames';

import './console.scss';

import ButtonBar from '../../components/buttons/button-bar';
import Button from '../../components/buttons/button';
import { run } from './actions';

export interface ConsoleProps {
  className: string;
  text: string;
}

const Console: FunctionComponent<ConsoleProps> = (props) => {
  const { className, text } = props;
  return (
    <div className={classNames('console', className)}>
      <ButtonBar className="console__buttons">
        <Button text="Run" action={run} arg="run" />
      </ButtonBar>
      <div className="console__text">{text}</div>
    </div>
  );
};

export default Console;
// export default connect(state => ({
//   text: state.console.text,
// }), dispatch => bindActionCreators({
//   run,
// }, dispatch))(Console);
