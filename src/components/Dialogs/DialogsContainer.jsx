import React from 'react';
import { connect } from 'react-redux';
import { selectDialogs } from 'redux/entities/dialogsSlice';
import { selectCurrentUserId } from 'redux/authSlice';
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
