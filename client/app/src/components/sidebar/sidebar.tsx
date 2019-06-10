import * as React from 'react';
import classNames from 'classnames';

import './sidebar.scss';

const { useCallback } = React;

interface SidebarProps {
  className?: string;
  show: boolean;
  setShow: (value: boolean) => any;
  children?: any;
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
