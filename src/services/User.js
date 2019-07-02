const Auth = require('../services/Auth');
const helpers = require('../helpers');

class UserService {
  static async signIn(user) {
    const { login, password } = user;
    const authenticatedUser = await Auth.getUser(login, password);

    if (!authenticatedUser) {
      return null;
    }

    return Auth.getToken(authenticatedUser, helpers.constants.secret);
  }
}

module.exports = UserService;
