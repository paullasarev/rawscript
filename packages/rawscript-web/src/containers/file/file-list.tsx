import React, { FunctionComponent } from 'react';
import { map } from 'lodash';
import { Path, PathArray } from '../../models/path';
import { AnAction } from '../../common/types';

interface FileListProps {
  items: PathArray;
  action: AnAction;
}

interface ListItemProps {
  item: Path;
  action: AnAction;
}

export const ListItem: FunctionComponent<ListItemProps> = ({ item, action }) => {
  const { name } = item;
  return (
    <div
      className="file__list-item"
      onClick={() => {
        action(item);
      }}
    >
      {name}
    </div>
  );
};

export const FileList: FunctionComponent<FileListProps> = (props) => {
  const { items, action } = props;
  return (
    <div className="file__list">
      {map(items, (item) => (
        <ListItem {...{ item, action, key: item.name }} />
      ))}
    </div>
  );
};

export default FileList;
