class Board {
    constructor(other = null) {
        // Copy Constructor
        if (other !== null) {
            Object.assign(this, other);
            return;
        }

        // Default Constructor
        this.data = new Array();
        for (let i = 0; i < 3; ++i) 
            this.data.push(new Array(null, null, null));
    }

}