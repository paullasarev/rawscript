// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setShowSidebar, setActiveTab, setSidebarWidth, moveTab, showTab } from './actions';
import { type State, selector } from './reducer';

import Script from '../script/script';
import Console from '../console/console';
import File from '../file/file';
import Tabs from '../../components/tabs/tabs';
import Sidebar from '../../components/sidebar/sidebar';

const tabsComponents = {
  script: { name: 'script', component: Script, title: 'Script' },
  console: { name: 'console', component: Console, title: 'Console' },
  file: { name: 'file', component: File, title: 'File' },
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

export default connect((state) => {
  return {
    ...selector(state),
  };
}, dispatch => bindActionCreators({
  setShowSidebar,
  setActiveTab,
  setSidebarWidth,
  moveTab,
  showTab,
}, dispatch))(SidePanel);
