import React, { Component } from 'react';
import classNames from 'classnames';

import './paper.scss';

import Image from '../image/image';
import img from '../../assets/images/react_logo_512x512.png';

export default class Paper extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={ classNames('paper', className) }>
        <Image
          className='paper__image'
          img={ img }
          width={ 40 }
          height={ 40 }
          alt='react'
        />
      </div>
    );
  }
}
