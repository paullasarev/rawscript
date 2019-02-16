import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './edit.scss';

import { setShowSidebar, setActiveTab } from './actions';

import Paper from '../paper/paper';
import Script from '../script/script';
import Console from '../console/console';
import Tabs from '../../controls/tabs/tabs';
import Tab from '../../controls/tabs/tab';
import Sidebar from '../../controls/sidebar/sidebar';

const Edit = (props) => {
  const {
    activeTab,
    setActiveTab,
    showSidebar,
    setShowSidebar,
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
          } }
          >
            <Tab name='script'>
              <Script />
            </Tab>
            <Tab name='console'>
              <Console />
            </Tab>
          </Tabs>
        </Sidebar>
      </div>
    </div>
  );
};

export default connect(state => ({
  showSidebar: state.edit.showSidebar,
  activeTab: state.edit.activeTab,
}), dispatch => bindActionCreators({
  setShowSidebar,
  setActiveTab,
}, dispatch))(Edit);
