import { redirectTo } from 'data';
import { AppDispatch, RootState } from 'data/store';
import { submitDialog, selectDialogByMember } from 'data/entities';
import type { User } from 'utils/prismaUtils';

export const redirectToDialogByUser =
  (userId: User['id']) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    let dialog = selectDialogByMember(userId)(getState());

    if (!dialog) {
      dialog = await dispatch(submitDialog(userId));
    }

    if (dialog) {
      dispatch(redirectTo(`/dialogs/${dialog.id}`));
    }
  };
