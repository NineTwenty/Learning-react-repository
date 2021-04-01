import React from 'react';
import { connect } from 'react-redux';
import { selectDialogs } from 'data/dialogsSlice';
import { selectCurrentUserId } from 'data/authSlice';
import Dialogs from './Dialogs';

class DialogsContainer extends React.Component {
  render() {
    return <Dialogs {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    userId: selectCurrentUserId(state),
    dialogs: selectDialogs(state),
  };
};

export default connect(mapStateToProps)(DialogsContainer);
