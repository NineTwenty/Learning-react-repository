import { formByIdsList, createLoadingActions } from '.';

describe('formByIdsList', () => {
  const received = [
    { id: 4 },
    { id: 10 },
    { id: 12 }
  ]

  const expected = {
    10: { id: 10 },
    12: { id: 12 },
    4: { id: 4 }
  }

  it('should return expected obj structure', () => {
    const result = formByIdsList(received);
    expect(result).toMatchObject(expected)
  })
});

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
