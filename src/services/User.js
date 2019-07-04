const AuthService = require('../services/Auth');
const config = require('../config');

class UserService {
  static async signIn(user) {
    const { login, password } = user;
    const authenticatedUser = await AuthService.getUser(login, password);

    if (!authenticatedUser) {
      return null;
    }

    return AuthService.getToken(authenticatedUser, config.secret);
  }
}

module.exports = UserService;
