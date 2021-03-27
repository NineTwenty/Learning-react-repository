import React from 'react';
import { connect } from 'react-redux';
import { selectDialogs } from 'data/dialogsSlice';
import Dialogs from './Dialogs';

class DialogsContainer extends React.Component {
  render() {
    return <Dialogs {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.authentication.user.id,
    avatar: state.authentication.user.avatar,
    username: state.authentication.user.username,
    dialogs: selectDialogs(state),
  };
};

export default connect(mapStateToProps)(DialogsContainer);
