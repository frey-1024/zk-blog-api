const UserDao = require('../dao/userDao');


class UserService {
  constructor() {
    this.userDao = new UserDao();
  }
  findByAccount(name) {
    return this.userDao.findOne({
      fields: 'id, account, password, salt, status',
      where: {
        eqs: { name }
      },
    });
  }
  login({ name }) {
    return this.userDao.pool.queryAsync(`select * from ${this.userDao.tableName} where name=?`, name);
  }
}

module.exports = UserService;
