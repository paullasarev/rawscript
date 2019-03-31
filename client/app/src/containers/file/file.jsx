// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { flatMap, slice } from 'lodash';

import './file.scss';

import type { ReturnType } from '../../common/types';

import Button from '../../components/buttons/button';
import ButtonBar from '../../components/buttons/button-bar';

import FileRouteItem from './file-route-item';
import FileList from './file-list';
import { selector, type StoreState, type State } from './reducer';

import {
  selectPathList,
  selectRouteItem,
  importItem,
} from './actions';
import { FileState } from './entities';

function renderRoutes(props) {
  const {
    path,
    file,
    selectRouteItem,
  } = props;
  const paths = path ? path.split(':') : [];
  return (
    <div className='file__route'>
      { flatMap(paths, (pathItem, index: number) => {
        const itemPath = slice(paths, 0, index).join(':');
        return [(
          <FileRouteItem
            name={ pathItem }
            path={ itemPath }
            key={ itemPath }
            action={ selectRouteItem }
            placeholder='<path>'
            isPath
          />
        ), (
          <div
            className='file__route-item file__route-item--path'
            key={ `${itemPath}-path` }
          >
          /
          </div>
        )];
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

function renderList(props) {
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

function renderButtons(props) {
  const {
    path,
    file,
    importItem,
  } = props;
  return (
    <ButtonBar right className='file__buttons'>
      <Button text='Import' action={ importItem } arg={ [path, file] } />
    </ButtonBar>
  );
}

const mapDispatchToProps = {
  selectPathList,
  selectRouteItem,
  importItem,
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
  return (
    <div className='file'>
      { renderButtons(props) }
      { renderRoutes(props) }
      { renderList(props) }
    </div>
  );
};

export default connect<Props, OwnProps, _, _, _, _>(mapStateToProps, mapDispatchToProps)(File);
