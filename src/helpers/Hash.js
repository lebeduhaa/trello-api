const bcrypt = require('bcrypt');

class Hash {
    static getHash(data) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(data, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    }

    static compareHash(data, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(data, hash, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Hash;
