import { EntityId } from '@reduxjs/toolkit';
import { redirectTo } from 'data';
import { AppDispatch, RootState } from 'data/store';
import { submitDialog, selectDialogByMember } from 'data/entities';

export const redirectToDialogByUser =
  (userId: EntityId) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    let dialog = selectDialogByMember(userId)(getState());

    if (!dialog) {
      dialog = await dispatch(submitDialog(userId));
    }

    if (dialog) {
      dispatch(redirectTo(`/dialogs/${dialog.id}`));
    }
  };
