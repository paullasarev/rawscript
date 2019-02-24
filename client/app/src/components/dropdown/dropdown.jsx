import React, { useCallback } from 'react';
import classNames from 'classnames';
import { map } from 'lodash/fp';

import './dropdown.scss';

import RelativePortal from '../relative-portal/relative-portal';

const DropdownOption = ({ value, title, onSelect }) => {
  return (
    <div
      className='dropdown__option'
      onClick={ useCallback(() => { onSelect(value); }, value) }
    >
      { title }
    </div>
  );
};

function makeOptions(onSelect) {
  return map(({ title, value }) => (
    <DropdownOption
      { ...{ title, value, onSelect, key: value } }
    />
  ));
}

const Dropdown = (props) => {
  const { className, items, onSelect, onOutClick } = props;
  const options = makeOptions(onSelect)(items);

  return (
    <RelativePortal { ...{ onOutClick } }>
      <div className={ classNames('dropdown', className) }>
        { options }
      </div>
    </RelativePortal>
  );
};

export default Dropdown;

