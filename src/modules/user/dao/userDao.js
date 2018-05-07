/**
 * @description 用户 dao
 * @author        yq
 * @date          2017-10-09 16:04:33
 */

const pool = require('../../../utils/mysqlPool');
// const BaseDao = require('./baseDao');

class UserDao{
  /**
   * 构造函数
   */
  constructor() {
    this.pool = pool;
    this.tableName = 'user';
    // super({
    //   pool: pool,
    //   tableName: 'user',
    // });
  }
}

module.exports = UserDao;
