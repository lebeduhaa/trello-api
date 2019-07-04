const Model = require('./Model');
const helpers = require('../helpers');

class Board extends Model {
    constructor() {
        super(helpers.constants.sourceFiles.boards);
    }
}

module.exports = new Board();
