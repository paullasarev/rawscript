import React, { FunctionComponent, Fragment } from 'react';
import { Dictionary, map } from 'lodash';

interface ExifViewProps {
  exif?: Dictionary<string>;
}

export const ExifView: FunctionComponent<ExifViewProps> = ({ exif }) => {
  if (!exif) {
    return null;
  }
  return (
    <div className="file__section">
      <div className="file__title">Exif</div>
      <div className="file__info">
        {map(exif, (val, key) => (
          <Fragment key={key}>
            <div className="file__info-key">{key}</div>
            <div className="file__info-val">{val}</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
