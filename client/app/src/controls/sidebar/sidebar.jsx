import React, { useCallback } from 'react';
import classNames from 'classnames';

import './sidebar.scss';

const Sidebar = ({ className, show, setShow, children }) => {
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
        onClick={ useCallback((e) => { setShow(!show); }, [show]) }
      >
        <div className='sidebar__tag-label'>
          { '>' }
        </div>
      </div>
      { children }
    </div>
  );
}

export default Sidebar;
