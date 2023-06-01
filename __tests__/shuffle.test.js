const shuffle = require("../src/shuffle");

describe("shuffle should...", () => {
  test('returns an array with exactly ten cards', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = shuffle(input);

    expect(shuffled.length).toBe(10);
  });
});

describe('shuffle should...', () => {
  test('returns the elements randomly', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled1 = shuffle(input)
    const shuffled2 = shuffle(input)

    expect(shuffled1).not.toEqual(shuffled2);
  });
});