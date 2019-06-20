const Model = require('./Model');

class Logger extends Model {
    constructor() {
        super('logs.json');
    }
}

module.exports = new Logger();
