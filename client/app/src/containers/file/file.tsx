import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { flatMap, slice } from 'lodash';

import './file.scss';

// import { ReturnType } from '../../common/types';

import ButtonBar from '../../components/buttons/button-bar';
// import Button from '../../components/buttons/button';
import UploadButton from '../../components/buttons/upload-button';

import FileRouteItem from './file-route-item';
import FileList from './file-list';
import { selector, StoreState, State } from './reducer';

import {
  selectPathList,
  selectRouteItem,
  importFiles,
} from './actions';
import { FileState } from './entities';

// const { useState } = React;

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
    importFiles,
  } = props;
  return (
    <ButtonBar right className='file__buttons'>
      <UploadButton text='Import' action={ importFiles } arg={ [path, file] } />
    </ButtonBar>
  );
}

// const mapDispatchToProps = {
//   selectPathList,
//   selectRouteItem,
//   importFiles,
// };
// type mapDispatchToPropsType = typeof mapDispatchToProps;
// const mapStateToProps = (storeState: StoreState) => {
//   return {
//     ...selector(storeState),
//   };
// };
// type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
// type OwnProps = {|
//   // className?: string,
// |};
// type Props = {| ...mapDispatchToPropsType, ...mapStateToPropsType |};

const File = (props) => {
  return (
    <div className='file'>
      { renderButtons(props) }
      { renderRoutes(props) }
      { renderList(props) }
    </div>
  );
};

export default connect((state: StoreState) => ({
  ...selector(state),
}), {
  selectPathList,
  selectRouteItem,
  importFiles,
})(File);
