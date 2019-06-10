import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import './console.scss';

import { run } from './actions';
import ButtonBar from '../../components/buttons/button-bar';
import Button from '../../components/buttons/button';
import { StoreState } from './reducer';

const Console = (props) => {
  const { className, text, run } = props;
  return (
    <div className={ classNames('console', className) }>
      <ButtonBar className='console__buttons'>
        <Button text='Run' action={ run } arg='run' />
      </ButtonBar>
      <div className='console__text'>
        { text }
      </div>
    </div>
  );
};

export default connect((state: StoreState) => ({
  text: state.console.text,
}), dispatch => bindActionCreators({
  run,
}, dispatch))(Console);
