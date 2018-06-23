import React from 'react';

import './edit.scss';

import Paper from '../paper/paper';
import Script from '../script/script';

const Edit = () => {
  return (
    <div className='edit'>
      <Paper
        className='edit__paper'
      />
      <Script
        className='edit__script'
      />
    </div>
  );
};

export default Edit;
