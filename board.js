class Board {
    #grid = new Array(9);
    value = 0;
    saturation = 0;

    // Copy Constructor
    constructor(other) {
        if (other !== undefined) {
            this.saturation = other.saturation;
            this.value = other.value;
            [...this.#grid] = other.get();
            return;
        }
    }

    // Getter for a specific cell; Call with no parameters to get the entire grid
    get(i, j) {
        if (i === undefined && j === undefined)
            return this.#grid;

        return this.#grid[i * 3 + j];
    }

    // Setter for a specific cell;
    set(i, j, turn) {
        // Override Guard
        if (this.#grid[i * 3 + j] !== undefined)
            return;

        this.#grid[i * 3 + j] = turn.description;
        ++this.saturation;
        
        // Scan board axes and diagonals
        if ( 
             this.#grid[i * 3 + 0] === turn.description && this.#grid[i * 3 + 1] === turn.description && this.#grid[i * 3 + 2] === turn.description ||
             this.#grid[0 * 3 + j] === turn.description && this.#grid[1 * 3 + j] === turn.description && this.#grid[2 * 3 + j] === turn.description ||
             this.#grid[0] === turn.description && this.#grid[4] === turn.description && this.#grid[8] === turn.description                         ||
             this.#grid[2] === turn.description && this.#grid[4] === turn.description && this.#grid[6] === turn.description
           )
           this.value = turn === COMPUTER ? 1 : -1;
    }
}