import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './script.scss';

const Script = (props) => {
  const { className, text } = props;
  return (
    <div className={ classNames('script', className) }>
      <div className='script__text'>
        { text }
      </div>
    </div>
  );
};

export default connect(state => ({
  text: state.script.text,
}))(Script);
