import React from 'react';
import Dialogs from './Dialogs';

// Actions and connect
import {
  addNewMessage,
  updateNewMessage,
  getDialogs,
} from '../../data/dialogs-reducer';
import { connect } from 'react-redux';
import { getMembers } from '../../data/dialogs-members-reducer';

// Class container for making ajax calls
class DialogsContainer extends React.Component {
  componentDidMount() {
    const { isLoaded, isFetching } = this.props;

    // Check if dialogs are not already loaded
    // or are in process of loading
    if (!isLoaded && !isFetching) {
      // And then require them
      this.props.getDialogs();
    }

    const { membersIsLoaded, membersIsFetching } = this.props;

    // Same for members
    if (!membersIsLoaded && !membersIsFetching) {
      this.props.getMembers();
    }
  }

  render() {
    return <Dialogs {...this.props} />;
  }
}

const mapStateToProps = ({
  authentication: {
    user: { avatar, username },
  },
  dialogsPage: {
    dialogs: { isFetching, isLoaded, selectedDialog, dialogs },
    membersList: {
      members,
      isFetching: membersIsFetching,
      isLoaded: membersIsLoaded,
    },
  },
}) => {
  return {
    dialogs,
    avatar,
    username,
    isFetching,
    isLoaded,
    selectedDialog,
    members,
    membersIsFetching,
    membersIsLoaded,
  };
};

export default connect(mapStateToProps, {
  addNewMessage,
  updateNewMessage,
  getDialogs,
  getMembers,
})(DialogsContainer);
