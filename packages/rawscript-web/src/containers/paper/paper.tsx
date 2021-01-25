import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import './paper.scss';
import img from '../../assets/images/react_logo_512x512.png';

import Image from '../image/image';
// import img from '../../../assets/images/react_logo_512x512.png';

interface PaperProps {
  className: string;
}

const Paper: FunctionComponent<PaperProps> = (props) => {
  const { className } = props;
  return (
    <div className={classNames('paper', className)}>
      <Image className="paper__image" img={img} width={200} height={200} alt="react" />
    </div>
  );
};

export default Paper;
