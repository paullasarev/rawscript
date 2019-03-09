// @flow
import React, { useCallback, type Node } from 'react';
import classNames from 'classnames';

import './sidebar.scss';

type SidebarProps = {
  className?: string,
  show: boolean,
  setShow: (value: boolean) => any,
  children?: Node,
}

const Sidebar = ({ className, show, setShow, children }: SidebarProps) => {
  const onClick = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <div
      className={ classNames('sidebar', className, {
        'sidebar--collapsed': !show,
        'sidebar--expanded': show,
      }) }
    >
      <div
        className={ classNames('sidebar__tag', {
          'sidebar__tag--collapsed': !show,
          'sidebar__tag--expanded': show,
        }) }
        onClick={ onClick }
      >
        <div className='sidebar__tag-label' />
      </div>
      { children }
    </div>
  );
};

export default Sidebar;
