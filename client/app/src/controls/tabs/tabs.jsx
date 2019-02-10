import React from 'react';
import { find, map } from 'lodash';
import classNames from 'classnames';

import './tabs.scss';

const TabHeader = ({name, isActive, setActive}) => {
  return (
    <div
      className={classNames('tabs__title', {
        'tabs__title--active': isActive,
      })}
      onClick={ ()=>setActive(name) }
    >
      { name }
    </div>
  )
}

export const Tabs = (props) => {
  const { children, active, setActive } = props;
  const activeTab = find(children, { props: {name: active}});
  const headers = map(children, ({props:{name}}) => (
    <TabHeader {...{name, isActive: name === active, key:name, setActive}} />
  ))
  return (
    <div className='tabs'>
      <div className='tabs__header'>
        {headers}
      </div>
      <div className='tabs__tab'>
        { activeTab }
      </div>
    </div>
  );
}

export default Tabs;
