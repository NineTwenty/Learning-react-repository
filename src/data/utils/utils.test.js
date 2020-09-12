import { formByIdsList } from '.';

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