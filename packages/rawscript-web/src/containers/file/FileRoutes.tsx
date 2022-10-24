import React, { FunctionComponent } from 'react';
import { flatMap, slice } from 'lodash';
import { AnAction } from '../../common/types';
import FileRouteItem from './file-route-item';

interface FileRoutesProps {
  path: string;
  file: string;
  selectRouteItem: AnAction;
}

export const FileRoutes: FunctionComponent<FileRoutesProps> = ({ path, file, selectRouteItem }) => {
  const paths = path ? path.split(':') : [];
  return (
    <div className="file__route">
      <FileRouteItem
        name={'catalog'}
        path={''}
        key={'catalog'}
        action={selectRouteItem}
        placeholder="<path>" />
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
            placeholder="<path>" />,
        ];
      })}
    </div>
  );
};
