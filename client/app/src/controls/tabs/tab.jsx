import React from 'react';

import './tabs.scss';

export const Tab = ({children}) => {
  return (
    <div className='tab'>
      {children}
    </div>
  );
}

export default Tab;
