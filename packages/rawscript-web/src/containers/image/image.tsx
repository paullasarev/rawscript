import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import './image.scss';

interface ImageProps {
  height?: number;
  width?: number;
  img?: string;
  alt?: string;
  className?: string;
}

const Image: FunctionComponent<ImageProps> = (props) => {
  const { height, width, img, alt, className } = props;
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

export default Image;
