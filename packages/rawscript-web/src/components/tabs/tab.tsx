import React, { FunctionComponent, ReactElement } from 'react';

import './tabs.scss';

type TabProps = {
  children?: ReactElement;
};

export const Tab: FunctionComponent<TabProps> = ({ children }) => {
  return <div className="tab">{children}</div>;
};

export default Tab;
