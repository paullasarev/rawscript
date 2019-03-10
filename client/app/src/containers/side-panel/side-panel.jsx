// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setShowSidebar, setActiveTab, setSidebarWidth, moveTab, showTab } from './actions';
import { type State, type StoreState, selector } from './reducer';

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

const mapDispatchToProps = {
  setShowSidebar,
  setActiveTab,
  setSidebarWidth,
  moveTab,
  showTab,
};

type mapDispatchToPropsType = {|
  setShowSidebar: typeof setShowSidebar,
  setActiveTab: typeof setActiveTab,
  setSidebarWidth: typeof setSidebarWidth,
  moveTab: typeof moveTab,
  showTab: typeof showTab,
|};
// type mapDispatchToPropsType = typeof mapDispatchToProps;

const mapStateToProps = (state: StoreState) => ({
  ...selector(state),
});
type mapStateToPropsType = $Call<typeof mapStateToProps, StoreState>; // eslint-disable-line no-undef
type Props = {| ...mapDispatchToPropsType, ...mapStateToPropsType |};

const SidePanel = (props: Props) => {
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

// export default connect<Props, {||}, mapStateToPropsType, mapDispatchToPropsType, StoreState, {}>(
export default connect<Props, {||}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(SidePanel);
