import { postsReducer, submitPost } from './postsSlice';
import { submitLoginForm } from 'data/authentication-reducer';

// Reducer test

const stubState = {
  data: {
    byId: {
      2: { id: 2 },
      3: { id: 3 },
      6: { id: 6 },
    },
    allIds: [2, 3, 6],
  },
};

const action = {
  type: submitPost.fulfilled,
  payload: [
    {
      id: 4,
      name: 'First',
    },
    {
      id: 10,
      name: 'Second',
    },
    {
      id: 12,
      name: 'Third',
    },
  ],
};

describe('post reducer', () => {
  it('should add news posts', () => {
    const newState = postsReducer(stubState, action);
    expect(newState.data.allIds).toHaveLength(6);
  });

  it('should keep ids order', () => {
    const newState = postsReducer(stubState, action);
    expect(newState.data.allIds).toStrictEqual([2, 3, 6, 4, 10, 12]);
  });
});
