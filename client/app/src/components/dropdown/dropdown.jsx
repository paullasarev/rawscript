import React, { useCallback } from 'react';
import classNames from 'classnames';
import { map } from 'lodash/fp';

import './dropdown.scss';

const DropdownOption = ({ name, title, onSelect }) => {
  return (
    <div
      className='dropdown__option'
      onClick={ useCallback(onSelect, name) }
    >
      { title }
    </div>
  );
}

const Dropdown = (props) => {
  const { className, items, onSelect } = props;
  const options = map(({ title, name }) => (
    <DropdownOption { ...{ title, name, onSelect, key: name } } />
  ))(items);

  return (
    <div className={ classNames('dropdown', className) }>
      { options }
    </div>
  );
};

export default Dropdown;
