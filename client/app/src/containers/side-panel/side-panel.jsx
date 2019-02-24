import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { setShowSidebar, setActiveTab, setSidebarWidth, moveTab, showTab } from './actions';

import Script from '../script/script';
import Console from '../console/console';
import Tabs from '../../components/tabs/tabs';
import Sidebar from '../../components/sidebar/sidebar';

const tabsComponents = {
  script: { name: 'script', component: Script, title: 'Script' },
  console: { name: 'console', component: Console, title: 'Console' },
  file: { name: 'file', component: null, title: 'File' },
};

const SidePanel = (props) => {
  const {
    activeTab,
    setActiveTab,
    showSidebar,
    setShowSidebar,
    sidebarWidth,
    setSidebarWidth,
    moveTab,
    showTab,
    tabs,
  } = props;

  return (
    <Sidebar
      { ...{ show: showSidebar, setShow: setShowSidebar } }
    >
      <Tabs { ...{
        active: activeTab,
        setActive: setActiveTab,
        width: sidebarWidth,
        setWidth: setSidebarWidth,
        moveTab,
        showTab,
        tabs,
        tabsComponents,
      } }
      />
    </Sidebar>
  );
};

export default compose(
  connect(state => ({
    showSidebar: state.sidePanel.showSidebar,
    sidebarWidth: state.sidePanel.sidebarWidth,
    activeTab: state.sidePanel.activeTab,
    tabs: state.sidePanel.tabs,
  }), dispatch => bindActionCreators({
    setShowSidebar,
    setActiveTab,
    setSidebarWidth,
    moveTab,
    showTab,
  }, dispatch)),
)(SidePanel);
