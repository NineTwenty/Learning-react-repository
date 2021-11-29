import { createLoadingActions } from '.';

describe('createLoadingActions', () => {
  const actions = createLoadingActions('testEntity', 'testAction');

  it('should return object', () => {
    expect(typeof actions).toBe('object');
  });

  describe('created object', () => {
    it('should have request method', () => {
      expect(typeof actions.request).toBe('function');
    });
    it('should have success method', () => {
      expect(typeof actions.success).toBe('function');
    });
    it('should have failure method', () => {
      expect(typeof actions.failure).toBe('function');
    });
  });
});
