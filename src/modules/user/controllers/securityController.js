const securityService = require('../services/securityService');

class UserController {
  static login(req, res, next) {
    const { name } = req.query;
    new securityService().login({
      name,
    }).then((a) => {
      res.json(a[0]);
    });
  }
}

module.exports = UserController;

