import React, { useState } from 'react';
import { DropTarget } from 'react-dnd';

import './edit.scss';

import Paper from '../paper/paper';
import Script from '../script/script';
import Console from '../console/console';
import Tabs from '../../controls/tabs/tabs';
import Tab from '../../controls/tabs/tab';

// import { tabsTarget, collectTarget } from '../../controls/tabs/resize';

const Edit = (props) => {
  const [active, setActive] = useState('script');
  // const { connectDropTarget } = props;
  return (
    <div className='edit'>
      <div className='edit__left'>
        <Paper className='edit__paper edit__top' />
      </div>
      <div className='edit__right'>
        <Tabs {...{active, setActive}}>
          <Tab name='script'>
            <Script/>
          </Tab>
          <Tab name='console'>
            <Console/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

// export default DropTarget('tabs', tabsTarget, collectTarget)(Edit);
export default Edit;
