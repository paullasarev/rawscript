// @flow
import React, { FunctionComponent } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators, compose } from 'redux';

import './edit.scss';

// import { setShowPicture } from './actions';

import Paper from '../paper/paper';
import SidePanel from '../side-panel/side-panel';

// import { StoreState, State, selector } from './reducer';

// const mapDispatchToProps = {
//   setShowPicture,
// };
// type mapDispatchToPropsType = typeof mapDispatchToProps;
// const mapStateToProps = (state: StoreState) => ({
//   ...selector(state),
// });
// type mapStateToPropsType = $Call<typeof mapStateToProps, StoreState>; // eslint-disable-line no-undef
// type Props = {| ...mapDispatchToPropsType, ...mapStateToPropsType |};

export interface EditProps {}

const Edit: FunctionComponent<EditProps> = (props) => {
  // const {
  //   setShowPicture,
  //   showPicture,
  // } = props;

  return (
    <div className="edit">
      <div className="edit__left">
        <Paper className="edit__paper edit__top" />
      </div>
      <div className="edit__sidebar">
        <SidePanel />
      </div>
    </div>
  );
};

export default Edit;
// export default connect<Props, {||}, _, _, _, _>(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Edit);
