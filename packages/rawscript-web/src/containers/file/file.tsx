import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import './file.scss';

import { useActions } from '../../hooks/use-actions';

import { selectPathList, selectRouteItem, importFiles } from './actions';
import { selector } from './reducer';
import { FileInfo } from './FileInfo';
import { FileRoutes } from './FileRoutes';
import { FileButtons } from './FileButtons';
import { FileListView } from './FileListView';
import { ExifView } from './ExifView';

export interface FileProps {
  className?: string;
}

const FilePage: FunctionComponent<FileProps> = ({ className }) => {
  const state = useSelector(selector);
  const actions = useActions({ selectPathList, selectRouteItem, importFiles });
  const { path, file, fileInfo, viewState, pathList, exif } = state;

  return (
    <div className={classNames('file', className)}>
      <FileButtons {...{path, importFiles: actions.importFiles}} />
      <FileRoutes {...{path, file, selectRouteItem: actions.selectRouteItem}} />
      <FileListView {...{viewState, pathList, selectPathList: actions.selectPathList}} />
      <FileInfo {...{fileInfo}} />
      <ExifView {...{exif}} />
    </div>
  );
};

export default FilePage;
