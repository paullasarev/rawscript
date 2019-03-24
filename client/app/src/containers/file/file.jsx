// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { map, slice } from 'lodash';

import type { ReturnType } from '../../common/types';

import './file.scss';

import FileRouteItem from './file-route-item';
import FileList from './file-list';
import { selector, type StoreState, type State } from './reducer';

import {
  selectPathList,
  selectRouteItem,
} from './actions';
import { FileState } from './entities';

function makeRoutes(props) {
  const {
    path,
    file,
    selectRouteItem,
  } = props;
  const paths = path ? path.split(':') : [];
  return (
    <div className='file__route'>
      { map(paths, (pathItem, index: number) => {
        const itemPath = slice(paths, 0, index).join(':');
        return (
          <FileRouteItem
            name={ pathItem }
            path={ itemPath }
            key={ itemPath }
            action={ selectRouteItem }
            placeholder='<path>'
          />
        );
      }) }
      <FileRouteItem
        name={ file }
        path={ path }
        action={ selectRouteItem }
        placeholder='<select>'
      />
    </div>
  );
}

function makeList(props) {
  const {
    viewState,
    pathList,
    selectPathList,
  } = props;

  switch (viewState) {
    case FileState.PATH_LIST:
      return <FileList items={ pathList.data } action={ selectPathList } />;
    default:
      return null;
  }
}

const mapDispatchToProps = {
  selectPathList,
  selectRouteItem,
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
