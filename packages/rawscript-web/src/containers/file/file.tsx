import React, { FunctionComponent } from 'react';
import { flatMap, slice } from 'lodash';

import './file.scss';

import { useSelector } from 'react-redux';
import classNames from 'classnames';
import ButtonBar from '../../components/buttons/button-bar';
import UploadButton from '../../components/buttons/upload-button';

import { useActions } from '../../hooks/use-actions';
import { AnAction } from '../../common/types';
import { ApiState } from '../../common/composite';
import { File } from '../../models/file.types';
import { PathArray } from '../../models/path';
import FileRouteItem from './file-route-item';
import FileList from './file-list';

import { selectPathList, selectRouteItem, importFiles } from './actions';
import { FileState } from './entities';
import { selector } from './reducer';

function renderRoutes(props: { path: string; file: string; selectRouteItem: AnAction }) {
  const { path, file, selectRouteItem } = props;
  const paths = path ? path.split(':') : [];
  return (
    <div className="file__route">
      <FileRouteItem
            name={'catalog'}
            path={''}
            key={'catalog'}
            action={selectRouteItem}
            placeholder="<path>"
      />
      {flatMap(paths, (pathItem, index: number) => {
        const itemPath = slice(paths, 0, index + 1).join(':');
        return [
          <div className="file__route-item file__route-item--path" key={`${itemPath}-path`}>
            /
          </div>,
          <FileRouteItem
            name={pathItem}
            path={itemPath}
            key={itemPath}
            action={selectRouteItem}
            placeholder="<path>"
          />,
        ];
      })}
    </div>
  );
}

function renderList(props: {
  viewState: FileState;
  pathList: ApiState<PathArray>;
  selectPathList: AnAction;
}) {
  const { viewState, pathList, selectPathList } = props;

  switch (viewState) {
    case FileState.PATH_LIST:
      return <FileList items={pathList.data} action={selectPathList} />;
    default:
      return null;
  }
}

function renderButtons(props: { path: string; importFiles: AnAction }) {
  const { path, importFiles } = props;
  return (
    <ButtonBar right className="file__buttons">
      <UploadButton text="Import" action={importFiles} arg={{ path }} />
    </ButtonBar>
  );
}

function renderFileInfo(props: { fileInfo?: File}) {
  const { fileInfo } = props;
  if (!fileInfo) {
    return null;
  }
  return (
    <div className="file__info">
      <div className="file__info-key">name</div>
      <div className="file__info-val">{fileInfo.name}</div>

      <div className="file__info-key">ext</div>
      <div className="file__info-val">{fileInfo.ext}</div>

      <div className="file__info-key">ctime</div>
      <div className="file__info-val">
        {new Date(fileInfo.ctime).toLocaleDateString()}
        {' '}
        {new Date(fileInfo.ctime).toLocaleTimeString()}
      </div>

      <div className="file__info-key">mtime</div>
      <div className="file__info-val">
        {new Date(fileInfo.mtime).toLocaleDateString()}
        {' '}
        {new Date(fileInfo.mtime).toLocaleTimeString()}
      </div>

      <div className="file__info-key">size</div>
      <div className="file__info-val">
        {Number(fileInfo.size).toLocaleString('fr', {
          style: 'decimal',
          useGrouping: true,
          })}
        </div>
    </div>
  );
}

export interface FileProps {
  className?: string;
}

const FilePage: FunctionComponent<FileProps> = ({ className }) => {
  const stateProps = useSelector(selector);
  const actions = useActions({ selectPathList, selectRouteItem, importFiles });
  const props = { ...stateProps, ...actions };

  return (
    <div className={classNames('file', className)}>
      {renderButtons(props)}
      {renderRoutes(props)}
      {renderList(props)}
      {renderFileInfo(props)}
    </div>
  );
};

export default FilePage;
