// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import type { ReturnType } from '../../common/types';

import './file.scss';

import FileRouteItem from './file-route-item';
import FileList from './file-list';
import { selector, type StoreState, type State } from './reducer';

import {
  selectCatalogList,
  selectCatalogItem,
  selectYearList,
  selectYearItem,
  selectDayList,
  selectDayItem,
  selectFotoList,
  selectFotoItem,
} from './actions';
import { FileState } from './entities';

function makeRoutes(props) {
  const {
    catalogItem,
    selectCatalogItem,
    yearItem,
    selectYearItem,
    dayItem,
    selectDayItem,
    fotoItem,
    selectFotoItem,
  } = props;
  return (
    <div className='file__route'>
      <FileRouteItem
        item={ catalogItem.data }
        action={ selectCatalogItem }
        placeholder='<catalog>'
      />
      <FileRouteItem
        item={ yearItem.data }
        action={ selectYearItem }
        placeholder='<year>'
      />
      <FileRouteItem
        item={ dayItem.data }
        action={ selectDayItem }
        placeholder='<day>'
      />
      <FileRouteItem
        item={ fotoItem.data }
        action={ selectFotoItem }
        placeholder='<foto>'
      />
    </div>
  );
}

function makeList(props) {
  const {
    viewState,
    catalogList,
    selectCatalogList,
    yearList,
    selectYearList,
    dayList,
    selectDayList,
    fotoList,
    selectFotoList,
  } = props;

  switch (viewState) {
    case FileState.CATALOG_LIST:
      return <FileList items={ catalogList.data } action={ selectCatalogList } />;
    case FileState.YEAR_LIST:
      return <FileList items={ yearList.data } action={ selectYearList } />;
    case FileState.DAY_LIST:
      return <FileList items={ dayList.data } action={ selectDayList } />;
    case FileState.FOTO_LIST:
      return <FileList items={ fotoList.data } action={ selectFotoList } />;
    default:
      return null;
  }
}

const mapDispatchToProps = {
  selectCatalogList,
  selectCatalogItem,
  selectYearList,
  selectYearItem,
  selectDayList,
  selectDayItem,
  selectFotoList,
  selectFotoItem,
};
type mapDispatchToPropsType = typeof mapDispatchToProps;
const mapStateToProps = (storeState: StoreState) => {
  return {
    ...selector(storeState),
  };
};
type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type OwnProps = {|
  // className?: string,
|};
type Props = {| ...mapDispatchToPropsType, ...mapStateToPropsType |};

const File = (props: Props) => {
  const routes = makeRoutes(props);
  const list = makeList(props);
  return (
    <div className='file'>
      { routes }
      { list }
    </div>
  );
};

export default connect<Props, OwnProps, _, _, _, _>(mapStateToProps, mapDispatchToProps)(File);
