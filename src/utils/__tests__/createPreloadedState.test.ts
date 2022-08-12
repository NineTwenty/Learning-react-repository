import createPreloadedState from 'utils/createPreloadedState';

describe('createPreloadedState', () => {
  it('Return new copy of state every call', () => {
    const { defaultState } = createPreloadedState();
    expect(defaultState.app.isInitialized).toBeFalsy();
    defaultState.app.isInitialized = true;
    expect(defaultState.app.isInitialized).toBeTruthy();

    // New state should have its default false value
    const { defaultState: newDefaultState } = createPreloadedState();
    expect(newDefaultState.app.isInitialized).toBeFalsy();

    // First state should still be truthy
    expect(defaultState.app.isInitialized).toBeTruthy();
  });
});
