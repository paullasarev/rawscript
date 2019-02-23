import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { setShowSidebar, setActiveTab, setSidebarWidth, moveTab } from './actions';

import Script from '../script/script';
import Console from '../console/console';
import Tabs from '../../components/tabs/tabs';
import Sidebar from '../../components/sidebar/sidebar';

const tabsComponents = {
  script: { component: Script, title: 'Script' },
  console: { component: Console, title: 'Console' },
  file: { component: null, title: 'File' },
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
    tabs,
  } = props;

  return (
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
  }, dispatch)),
)(SidePanel);
