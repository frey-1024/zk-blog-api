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
  login({ name, res }) {
    this.userDao.pool.query(`select * from ${this.userDao.tableName} where name=?`, name, function(a, b) {
      console.log(a, b);
      res.json(b[0]);
    });
    // return this.findByAccount(name)
    //   .then((user) => {
    //     if (!user) {
    //       throw {'msg': 'ERROR'};
    //     }
    //     return {
    //       uid: user.id,
    //       account: user.account,
    //       status: user.status,
    //     };
    //   });
  }
}

module.exports = UserService;
