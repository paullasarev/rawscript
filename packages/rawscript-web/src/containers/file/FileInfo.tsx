import React, { FunctionComponent } from 'react';
import { File } from '../../models/file.types';

interface FileInfoProps {
  fileInfo?: File;
}

export const FileInfo: FunctionComponent<FileInfoProps> = ({ fileInfo }) => {
  if (!fileInfo) {
    return null;
  }
  return (
    <div className="file__section">
      <div className="file__title">File info</div>
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
    </div>
  );
};
