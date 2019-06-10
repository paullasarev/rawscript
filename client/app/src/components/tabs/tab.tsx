import * as React from 'react';

import './tabs.scss';

interface TabProps {
  children?: any;
}

export default function Tab({ children }: TabProps) {
  return (
    <div className='tab'>
      { children }
    </div>
  );
}
