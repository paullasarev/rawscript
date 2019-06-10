import * as React from 'react';
import { connect } from 'react-redux';

import './edit.scss';

import { setShowPicture } from './actions';

import Paper from '../paper/paper';
import SidePanel from '../side-panel/side-panel';

import { StoreState, selector } from './reducer';

// const mapDispatchToProps = {
//   setShowPicture,
// };
// type mapDispatchToPropsType = typeof mapDispatchToProps;
// const mapStateToProps = (state: StoreState) => ({
//   ...selector(state),
// });
// type mapStateToPropsType = $Call<typeof mapStateToProps, StoreState>;
// type Props = {| ...mapDispatchToPropsType, ...mapStateToPropsType |};

const Edit = (props) => {
  const {
    setShowPicture,
    showPicture,
  } = props;

  return (
    <div className='edit'>
      <div className='edit__left'>
        <Paper className='edit__paper edit__top' />
      </div>
      <div className='edit__sidebar'>
        <SidePanel />
      </div>
    </div>
  );
};

export default connect(
  (state: StoreState) => ({
    ...selector(state),
  }),
  {
    setShowPicture,
  },
)(Edit);
