const securityService = require('../services/securityService');

class UserController {
  static login(req, res, next) {
    console.log(req.query);
    const { name } = req.query;
    new securityService().login({
      name,
      res
    });
  }
}

module.exports = UserController;

