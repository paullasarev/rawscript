import React, { useState } from 'react';
import { connect } from 'react-redux';

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

const File = (props) => {
  const {
    viewState,
    catalogList,
    selectCatalogList,
    catalogItem,
    selectCatalogItem,
  } = props;
  const isCatalogList = viewState === FileState.CATALOG_LIST;
  return (
    <div className='file'>
      <div className='file__route'>
        <FileRouteItem
          item={ catalogItem }
          action={ selectCatalogItem }
          placeholder='<catalog>'
        />
      </div>
      { isCatalogList && <FileList items={ catalogList } action={ selectCatalogList } /> }
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
