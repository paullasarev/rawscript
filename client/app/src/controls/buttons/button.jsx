import React, { PureComponent } from 'react';
import classNames from 'classnames';

import './button.scss';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = () => {
      const { action, arg } = props;
      if (action) {
        action(arg);
      }
    };
  }

  render() {
    const { className, text } = this.props;
    return (
      <div className={ classNames('button', className) } onClick={ this.onClick } tabIndex='0' >
        { text }
      </div>
    );
  }
}

export default Button;
