import React, { useState } from 'react';

import './edit.scss';

import Paper from '../paper/paper.jsx';
import Script from '../script/script.jsx';
import Console from '../console/console.jsx';
import Tabs from '../../controls/tabs/tabs';
import Tab from '../../controls/tabs/tab';

const Edit = () => {
  const [active, setActive] = useState('script');
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

export default Edit;
