class Board {
    #grid = new Array(9);
    value = 0;
    saturation = 0;

    constructor(other) {  // Copy Constructor
        if (other !== undefined) {
            this.saturation = other.saturation;
            this.value = other.value;
            [...this.#grid] = other.get();
            return;
        }
    }

    
    get(i, j) {  // Getter for a specific cell; Call with no parameters to get the entire grid
        if (i === undefined && j === undefined)
            return this.#grid;

        return this.#grid[i * 3 + j];
    }

    
    set(i, j, turn) {  // Setter for a specific cell;
        if (this.#grid[i * 3 + j] !== undefined) // Override Guard
            return;

        this.#grid[i * 3 + j] = turn.description;
        ++this.saturation;
        
        if (  // Scan board axes and diagonals 
             this.#grid[i * 3 + 0] === turn.description && this.#grid[i * 3 + 1] === turn.description && this.#grid[i * 3 + 2] === turn.description ||
             this.#grid[0 * 3 + j] === turn.description && this.#grid[1 * 3 + j] === turn.description && this.#grid[2 * 3 + j] === turn.description ||
             this.#grid[0] === turn.description && this.#grid[4] === turn.description && this.#grid[8] === turn.description                         ||
             this.#grid[2] === turn.description && this.#grid[4] === turn.description && this.#grid[6] === turn.description
           )
           this.value = turn === COMPUTER ? 1 : -1;
    }
}