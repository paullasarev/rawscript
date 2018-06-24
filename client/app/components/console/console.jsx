import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './console.scss';

const Console = (props) => {
  const { className, text } = props;
  //   const text = `\
  // > run script
  // > set contrast +10
  // `;
  return (
    <div className={ classNames('console', className) }>
      <div className='console__text'>
        { text }
      </div>
    </div>
  );
};

export default connect(state => ({
  text: state.console.text,
}))(Console);
