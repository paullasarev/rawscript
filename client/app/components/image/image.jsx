import React, { Component } from 'react';
import classNames from 'classnames';

import './image.scss';

export default class Image extends Component {
  render() {
    const { height, width, img, alt, className } = this.props;
    return (
      <div className={ classNames('image', className) }>
        <img
          className='image__img'
          height={ height }
          width={ width }
          src={ img }
          alt={ alt }
        />
      </div>
    );
  }
}
