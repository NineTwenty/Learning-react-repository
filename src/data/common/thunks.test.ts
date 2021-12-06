import { redirectTo } from 'data';
import { RootState } from 'data/store';
import { selectDialogByMember, submitDialog } from 'data/entities';
import { redirectToDialogByUser } from 'data/common/thunks';

const dispatch = jest.fn();
const mockSelectDialogByMember = selectDialogByMember as jest.MockedFunction<
  typeof selectDialogByMember
>;
const mockSubmitDialog = submitDialog as jest.MockedFunction<
  typeof submitDialog
>;

const mockDialog = {
  count: 12323,
  time: '234',
  messages: [],
  id: '2',
  members: [5, 7],
};

jest.mock('data/entities/dialogsSlice', () => ({
  selectDialogByMember: jest.fn(),
  submitDialog: jest.fn(),
}));

describe('Common thunks', () => {
  describe('redirectToDialogByUser', () => {
    describe('if dialog finded', () => {
      beforeEach(async () => {
        mockSelectDialogByMember.mockReturnValue(() => mockDialog);
        const thunk = redirectToDialogByUser(7);
        await thunk(dispatch, () => ({} as RootState));
      });

      it('should skip dialog creation', () => {
        expect(dispatch).toBeCalledTimes(1);
      });

      it('should dispatch correct redirect link', () => {
        expect(dispatch).toBeCalledWith(redirectTo('/dialogs/2'));
      });
    });

    describe('if dialog not finded', () => {
      beforeEach(async () => {
        mockSelectDialogByMember.mockReturnValue(() => undefined);
        mockSubmitDialog.mockReturnValue(() => Promise.resolve(mockDialog));
        dispatch.mockResolvedValueOnce(mockDialog);
        const thunk = redirectToDialogByUser(7);
        await thunk(dispatch, () => ({} as RootState));
      });

      it('should call submit dialog', () => {
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, mockSubmitDialog(0));
      });

      it('should dispatch correct redirect link', () => {
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenLastCalledWith(redirectTo('/dialogs/2'));
      });
    });
  });
});
