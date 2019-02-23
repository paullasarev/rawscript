import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import './edit.scss';

import { setShowSidebar, setActiveTab, setSidebarWidth, moveTab } from './actions';

import Paper from '../paper/paper';
import Script from '../script/script';
import Console from '../console/console';
import Tabs from '../../components/tabs/tabs';
import Sidebar from '../../components/sidebar/sidebar';

const tabsComponents = {
  script: { component: Script, title: 'Script' },
  console: { component: Console, title: 'Console' },
  file: { component: null, title: 'File' },
};

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
        <Sidebar
          { ...{ show: showSidebar, setShow: setShowSidebar } }
        >
          <Tabs { ...{
            active: activeTab,
            setActive: setActiveTab,
            setShow: setShowSidebar,
            width: sidebarWidth,
            setWidth: setSidebarWidth,
            moveTab,
            tabs,
            tabsComponents,
          } }
          />
        </Sidebar>
      </div>
    </div>
  );
};

export default compose(
  connect(state => ({
    showSidebar: state.edit.showSidebar,
    sidebarWidth: state.edit.sidebarWidth,
    activeTab: state.edit.activeTab,
    tabs: state.edit.tabs,
  }), dispatch => bindActionCreators({
    setShowSidebar,
    setActiveTab,
    setSidebarWidth,
    moveTab,
  }, dispatch)),
)(Edit);
