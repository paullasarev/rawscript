// @flow
import React, { type Node } from 'react';

import './tabs.scss';

type TabProps = {
  children?: Node,
};

export default function Tab({ children }: TabProps) {
  return (
    <div className='tab'>
      { children }
    </div>
  );
}
