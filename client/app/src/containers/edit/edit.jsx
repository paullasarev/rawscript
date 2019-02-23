import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import './edit.scss';

import { setShowPicture } from './actions';

import Paper from '../paper/paper';
import SidePanel from '../side-panel/side-panel';

const Edit = (props) => {
  const {
    activeTab,
    setActiveTab,
    showSidebar,
    setShowSidebar,
    sidebarWidth,
    setSidebarWidth,
    moveTab,
    tabs,
  } = props;

  return (
    <div className='edit'>
      <div className='edit__left'>
        <Paper className='edit__paper edit__top' />
      </div>
      <div className='edit__sidebar'>
        <SidePanel />
      </div>
    </div>
  );
};

export default compose(
  connect(state => ({
    showPicture: state.edit.showPicture,
  }), dispatch => bindActionCreators({
    setShowPicture,
  }, dispatch)),
)(Edit);
