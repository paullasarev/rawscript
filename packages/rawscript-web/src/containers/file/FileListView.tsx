import React, { FunctionComponent } from 'react';
import { AnAction } from '../../common/types';
import { ApiState } from '../../common/composite';
import { PathArray } from '../../models/path';
import FileList from './file-list';
import { FileState } from './entities';

interface FileListProps {
  viewState: FileState;
  pathList: ApiState<PathArray>;
  selectPathList: AnAction;
}

export const FileListView: FunctionComponent<FileListProps> = ({
  viewState,
  pathList,
  selectPathList,
}) => {

  switch (viewState) {
    case FileState.PATH_LIST:
      return <FileList items={pathList.data} action={selectPathList} />;
    default:
      return null;
  }
};
