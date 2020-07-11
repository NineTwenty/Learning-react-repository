import React from 'react';
import Dialogs from './Dialogs';

// Actions and connect
import {
  addNewMessage,
  updateNewMessage,
  getDialogs,
} from '../../data/dialogs-reducer';
import { connect } from 'react-redux';

// Class container for making ajax calls
class DialogsContainer extends React.Component {
  componentDidMount() {
    const { isLoaded, isFetching, userId } = this.props;

    // Check if dialogs are not already loaded
    // or are in process of loading
    if (!isLoaded && !isFetching) {
      // And then require them
      this.props.getDialogs(userId);
    }
  }

  render() {
    return <Dialogs {...this.props} />;
  }
}

const mapStateToProps = ({
  authentication: {
    user: { avatar, username, id },
  },
  dialogsPage: { isFetching, isLoaded, selectedDialog, dialogs },
}) => {
  return {
    dialogs,
    avatar,
    username,
    userId: id,
    isFetching,
    isLoaded,
    selectedDialog,
  };
};

export default connect(mapStateToProps, {
  addNewMessage,
  updateNewMessage,
  getDialogs,
})(DialogsContainer);
