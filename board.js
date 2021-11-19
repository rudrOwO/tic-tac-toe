class Board {
    #grid;
    saturation;

    constructor(other = null) {
        // Copy Constructor
        if (other !== null) {
            this.saturation = other.saturation;
            Object.assign(this.#grid, other.get());
            return;
        }

        // Default Constructor
        this.saturation = 0;
        this.#grid = new Array();
        for (let i = 0; i < 3; ++i) 
            this.#grid.push(new Array(null, null, null));
    }

    // Getter for a specific cell; Call with no parameters to get the entire grid
    get(i = null, j = null) {
        if (i === null && j === null)
            return this.#grid;
        return this.#grid[i][j];
    }

    // Setter for a specific cell;
    set(i, j, turn) {
        this.#grid[i][j] = (turn == player ? 'o' : 'x');
        ++this.saturation;
    }
}