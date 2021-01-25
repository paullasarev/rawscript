import React, { useCallback, ReactElement, FunctionComponent } from 'react';
import classNames from 'classnames';

import './sidebar.scss';

interface SidebarProps {
  className?: string;
  show: boolean;
  setShow: (value: boolean) => any;
  children?: ReactElement;
}

export const Sidebar: FunctionComponent<SidebarProps> = ({
  className,
  show,
  setShow,
  children,
}) => {
  const onClick = useCallback(() => {
    setShow(!show);
  }, [show, setShow]);

  return (
    <div
      className={classNames('sidebar', className, {
        'sidebar--collapsed': !show,
        'sidebar--expanded': show,
      })}
    >
      <div
        className={classNames('sidebar__tag', {
          'sidebar__tag--collapsed': !show,
          'sidebar__tag--expanded': show,
        })}
        onClick={onClick}
      >
        <div className="sidebar__tag-label" />
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
