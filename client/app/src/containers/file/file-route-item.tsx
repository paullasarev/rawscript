import * as React from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

type Props = {
  path: string,
  name: string,
  placeholder: string,
  action: (path: string, name: string) => any,
  isPath?: boolean,
}

export default function FileRouteItem(props: Props) {
  const { path, name, action, placeholder } = props;
  const isEmptyName = isEmpty(name);
  const nameValue = isEmptyName ? placeholder : name;
  return (
    <div
      className={ classNames('file__route-item', {
        'file__route-item--placeholder': isEmptyName,
      }) }
      onClick={ () => { action(path, name); } }
    >
      { nameValue }
    </div>
  );
}
