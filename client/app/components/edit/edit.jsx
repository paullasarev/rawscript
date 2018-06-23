import React from 'react';

import './edit.scss';

import Paper from '../paper/paper';
import Script from '../script/script';
import Console from '../console/console';

const Edit = () => {
  return (
    <div className='edit'>
      <div className='edit__left'>
        <Paper className='edit__paper edit__top' />
        <Console className='edit__console edit__bottom' />
      </div>
      <Script
        className='edit__right edit__script'
      />
    </div>
  );
};

export default Edit;
