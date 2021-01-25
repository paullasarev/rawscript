import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';

import Script from '../script/script';
import Console from '../console/console';
import File from '../file/file';
import Tabs from '../../components/tabs/tabs';
import Sidebar from '../../components/sidebar/sidebar';
import { useActions } from '../../hooks/use-actions';
import { selector } from './reducer';
import { setShowSidebar, setActiveTab, setSidebarWidth, moveTab, showTab } from './actions';

const tabsComponents = {
  script: { name: 'script', component: Script, title: 'Script' },
  console: { name: 'console', component: Console, title: 'Console' },
  file: { name: 'file', component: File, title: 'File' },
};

// const mapDispatchToProps = {
//   setShowSidebar,
//   setActiveTab,
//   setSidebarWidth,
//   moveTab,
//   showTab,
// };
//
// type mapDispatchToPropsType = {|
//   setShowSidebar: typeof setShowSidebar,
//   setActiveTab: typeof setActiveTab,
//   setSidebarWidth: typeof setSidebarWidth,
//   moveTab: typeof moveTab,
//   showTab: typeof showTab,
// |};
// type mapDispatchToPropsType = typeof mapDispatchToProps;

// const mapStateToProps = (state: StoreState) => ({
//   ...selector(state),
// });
// type mapStateToPropsType = $Call<typeof mapStateToProps, StoreState>; // eslint-disable-line no-undef
// type Props = {| ...mapDispatchToPropsType, ...mapStateToPropsType |};

export interface SidePanelProps {}

export const SidePanel: FunctionComponent<SidePanelProps> = (props) => {
  // const {
  //   activeTab,
  //   setActiveTab,
  //   showSidebar,
  //   setShowSidebar,
  //   sidebarWidth,
  //   setSidebarWidth,
  //   moveTab,
  //   showTab,
  //   tabs,
  // } = props;
  const { showSidebar, activeTab, sidebarWidth, tabs } = useSelector(selector);
  const { setShow } = useActions({ setShow: setShowSidebar });

  return (
    <Sidebar {...{ show: showSidebar, setShow }}>
      <Tabs
        {...{
          active: activeTab,
          setActive: setActiveTab,
          width: sidebarWidth,
          setWidth: setSidebarWidth,
          moveTab,
          showTab,
          tabs,
          tabsComponents,
        }}
      />
    </Sidebar>
  );
};

export default SidePanel;
