const helpers = require('../helpers');
const Model = require('./Model');

class Card extends Model {
    constructor() {
        super(helpers.constants.sourceFiles.cards);
    }
}

module.exports = new Card();
