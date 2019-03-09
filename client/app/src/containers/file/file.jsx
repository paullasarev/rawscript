import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './file.scss';

import FileRouteItem from './file-route-item';
import FileList from './file-list';

import {
  selectCatalogList,
  getCatalogList,
  selectCatalogItem,
  getCatalogItem,
} from './actions';
import { FileState } from './entities';

function makeRoutes(props) {
  const {
    catalogItem,
    selectCatalogItem,
  } = props;
  return (
    <div className='file__route'>
      <FileRouteItem
        item={ catalogItem }
        action={ selectCatalogItem }
        placeholder='<catalog>'
      />
    </div>
  );
}

function makeList(props) {
  const {
    viewState,
    catalogList,
    selectCatalogList,
  } = props;

  switch (viewState) {
    case FileState.CATALOG_LIST:
      return <FileList items={ catalogList } action={ selectCatalogList } />;
    default:
      return null;
  }
}

const File = (props) => {
  const {
    className,
  } = props;
  const list = makeList(props);
  const routes = makeRoutes(props);
  return (
    <div className={ classNames('file', className) }>
      { routes }
      { list }
    </div>
  );
};

export default connect(state => ({
  viewState: state.file.viewState,
  catalogList: state.file.catalogList.data,
  catalogItem: state.file.catalogItem.data,
}), {
  selectCatalogList,
  getCatalogList,
  selectCatalogItem,
  getCatalogItem,
})(File);
