import React from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

export default function FileRouteItem(props) {
  const { item: { name }, item, action, placeholder } = props;
  const isEmptyName = isEmpty(name);
  const nameValue = isEmptyName ? placeholder : name;
  return (
    <div
      className={ classNames('file__route-item', {
        'file__route-item--placeholder': isEmptyName,
      }) }
      onClick={ () => { action(item); } }
    >
      { nameValue }
    </div>
  );
}
