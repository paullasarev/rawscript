import React from 'react';
import { map } from 'lodash';

function ListItem({ item, action }) {
  const { name } = item;
  return (
    <div
      className='file__list-item'
      onClick={ () => { action(item); } }
    >
      { name }
    </div>
  );
}

export default function FileList(props) {
  const { items, action } = props;
  return (
    <div
      className='file__list'
    >
      { map(items, (item) => (<ListItem { ...{ item, action, key: item.name } } />)) }
    </div>
  );
}
