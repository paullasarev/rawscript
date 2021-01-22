import React, { FunctionComponent, useCallback } from 'react';
import classNames from 'classnames';
import { map } from 'lodash/fp';

import './dropdown.scss';

import RelativePortal from '../relative-portal/relative-portal';

interface DropdownOptionProps {
  title: string;
  value: any;
  onSelect: (value: any) => void,
}

const DropdownOption: FunctionComponent<DropdownOptionProps> = ({ value, title, onSelect }) => {
  return (
    <div
      className='dropdown__option'
      onClick={ useCallback(() => { onSelect(value); }, [onSelect, value]) }
    >
      { title }
    </div>
  );
};

const makeOptions = (onSelect: (value: any) => void,) => {
  return map(({ title, value }) => (
    <DropdownOption
      { ...{ title, value, onSelect, key: value } }
    />
  ));
};

export interface DropdownItem {
  title: string;
  value: any;
}

export type DropdownProps = {
  className?: string,
  items: Array<DropdownItem>,
  onSelect: (value: any) => void,
  onOutClick: (e: MouseEvent) => void,
};

const Dropdown = (props: DropdownProps) => {
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
