const Auth = require('../services/Auth');
const config = require('../config');

class UserService {
  static async signIn(user) {
    const { login, password } = user;
    const authenticatedUser = await Auth.getUser(login, password);

    if (!authenticatedUser) {
      return null;
    }

    return Auth.getToken(authenticatedUser, config.secret);
  }
}

module.exports = UserService;
