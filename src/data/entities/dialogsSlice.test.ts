import { addDialogs } from 'data/entities';
import { selectDialogByMember } from 'data/entities/dialogsSlice';
import store from 'data/store';

describe('dialogs selectors', () => {
  store.dispatch(
    addDialogs([
      {
        updatedAt: new Date().toISOString(),
        messages: [],
        id: 1,
        members: [1, 2],
      },
      {
        updatedAt: new Date().toISOString(),
        messages: [],
        id: 2,
        members: [5, 7],
      },
      {
        updatedAt: new Date().toISOString(),
        messages: [],
        id: 3,
        members: [3, 92],
      },
      {
        updatedAt: new Date().toISOString(),
        messages: [],
        id: 4,
        members: [34, 23],
      },
    ])
  );

  describe('selectDialogByMember', () => {
    it('return correct dialog', () => {
      expect(selectDialogByMember(7)(store.getState())).toHaveProperty('id', 2);
      expect(selectDialogByMember(1)(store.getState())).toHaveProperty('id', 1);
    });
  });
});
