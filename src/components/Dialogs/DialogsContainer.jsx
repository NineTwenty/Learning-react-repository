import React from 'react';
import s from './Dialogs.module.css';
import Dialogs from './Dialogs';

// Actions and connect

import {
  addNewMessage,
  updateNewMessage,
  dialogsFetchRequest,
  dialogsFetchSuccess,
  dialogsFetchFailed,
} from '../../data/dialogs-reducer';
import { connect } from 'react-redux';

// Function for dialogs fetch from API

import { fetchDialogs } from '../../api/APIUtils';

// Class container for fetch

class DialogsContainer extends React.Component {
  componentDidMount() {
    const { isLoaded, isFetching } = this.props;
    const {dialogsFetchRequest, dialogsFetchSuccess} = this.props

    if (!isLoaded && !isFetching) {
      dialogsFetchRequest();
      fetchDialogs(this.props.userId).then((data) => {
        dialogsFetchSuccess(data);
      });
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
  dialogsFetchRequest,
  dialogsFetchSuccess,
  dialogsFetchFailed,
})(DialogsContainer);
