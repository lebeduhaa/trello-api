const jwt = require('jsonwebtoken');
const users = require('../../db/users.json');
const Hash = require('./Hash');

class Auth {
    static getUser(login, password) {
        return new Promise(async (resolve, reject) => {
            let user;

            for (let i = 0; i < users.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                const result = await Hash.compareHash(password, users[i].password);

                if (result && login === users[i].login) {
                    user = users[i];
                    break;
                }
            }

            resolve(user);
        });
    }

    static getToken(user, secret) {
        const token = jwt.sign(user, secret, { expiresIn: 2000 });

        return token;
    }

    static getUserByToken(token, secret) {
        let user;

        try {
            user = jwt.verify(token, secret);
        } catch (exception) {
            return null;
        }

        return user;
    }
}

module.exports = Auth;
