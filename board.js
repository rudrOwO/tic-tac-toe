class Board {
  #grid = new Array(9);
  value = 0;
  saturation = 0;

  constructor(other) {
    // Copy Constructor
    if (other !== undefined) {
      this.saturation = other.saturation;
      this.value = other.value;
      [...this.#grid] = other.get();
      return;
    }
  }

  get(i, j) {
    // Getter for a specific cell; Call with no parameters to get the entire grid
    if (i === undefined && j === undefined) return this.#grid;

    return this.#grid[i * 3 + j];
  }

  test(i, j, turn) {
    let testCases = [
      [
        [i, 0],
        [i, 1],
        [i, 2],
      ],
      [
        [0, j],
        [1, j],
        [2, j],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const sequence of testCases)
      if (
        sequence.every((testPos) => this.get(...testPos) === turn.description)
      )
        return sequence;

    return null;
  }

  set(i, j, turn) {
    // Setter for a specific cell;
    if (
      this.#grid[i * 3 + j] !== undefined ||
      !(i >= 0 && i < 3 && j >= 0 && j < 3)
    )
      // Override + Out-of-bounds Guard
      return false;

    this.#grid[i * 3 + j] = turn.description;
    ++this.saturation;

    // Scan board axes and diagonals
    if (this.test(i, j, turn)) this.value = turn === COMPUTER ? 1 : -1;

    return true;
  }
}
