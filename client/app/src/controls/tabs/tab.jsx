import React from 'react';

import './tabs.scss';

const Tab = ({ children }) => {
  return (
    <div className='tab'>
      { children }
    </div>
  );
}

export default Tab;
