// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './file.scss';

import FileRouteItem from './file-route-item';
import FileList from './file-list';
import { selector, type StoreState } from './reducer';

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

const mapDispatchToProps = {
  selectCatalogList,
  getCatalogList,
  selectCatalogItem,
  getCatalogItem,
};
type mapDispatchToPropsType = typeof mapDispatchToProps;
const mapStateToProps = (storeState: StoreState) => {
  const state = selector(storeState);
  return {
    viewState: state.viewState,
    catalogList: state.catalogList.data,
    catalogItem: state.catalogItem.data,
  };
};
type mapStateToPropsType = $Call<typeof mapStateToProps, StoreState>; // eslint-disable-line no-undef
type OwnProps = {|
  // className?: string,
|};
type Props = {| ...mapDispatchToPropsType, ...mapStateToPropsType |};

const File = (props: Props) => {
  const list = makeList(props);
  const routes = makeRoutes(props);
  return (
    <div className='file'>
      { routes }
      { list }
    </div>
  );
};

export default connect<Props, {||}, _, _, _, _>(mapStateToProps, mapDispatchToProps)(File);

