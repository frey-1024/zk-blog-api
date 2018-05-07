/**
 * @description
 * @author yq
 * @date 2017/8/4 上午12:36
 */
const Logger = require('log4js').getLogger('sql');

function formatWhere(where) {
  let whereParams = [];
  const whereStrs = [];
  const { likes, ors, ins, notIns, eqs, neqs, gts, lts, gtes, ltes } = where;
  // 像
  if (likes) {
    const likesKeys = Object.keys(likes);
    if (likesKeys.length > 0) {
      const likesWhere = likesKeys.map((key) => {
        whereParams.push(likes[key]);
        return `${key} LIKE ?`;
      })
        .join(' AND ');
      whereStrs.push(likesWhere);
    }
  }
  // 包含
  if (ins) {
    const insKeys = Object.keys(ins);
    if (insKeys.length > 0) {
      const insWhere = insKeys.map((key) => {
        whereParams.push(ins[key]);
        return `${key} IN ( ? )`;
      })
        .join(' AND ');
      whereStrs.push(insWhere);
    }
  }
  // 不包含
  if (notIns) {
    const notInsKeys = Object.keys(notIns);
    if (notInsKeys.length > 0) {
      const notInsWhere = notInsKeys.map((key) => {
        whereParams.push(notIns[key]);
        return `${key} NOT IN ( ? )`;
      })
        .join(' AND ');
      whereStrs.push(notInsWhere.join(','));
    }
  }
  // 等于
  if (eqs) {
    const eqsKeys = Object.keys(eqs);
    if (eqsKeys.length > 0) {
      const eqsWhere = eqsKeys.map((key) => {
        whereParams.push(eqs[key]);
        return `${key} = ?`;
      })
        .join(' AND ');
      whereStrs.push(eqsWhere);
    }
  }
  // 不等于
  if (neqs) {
    const neqsKeys = Object.keys(neqs);
    if (neqsKeys.length > 0) {
      const neqsWhere = neqsKeys.map((key) => {
        whereParams.push(neqs[key]);
        return `${key} != ?`;
      })
        .join(' AND ');
      whereStrs.push(neqsWhere);
    }
  }
  // 大于
  if (gts) {
    const gtsKeys = Object.keys(gts);
    if (gtsKeys.length > 0) {
      const gtsWhere = gtsKeys.map((key) => {
        whereParams.push(gts[key]);
        return `${key} > ?`;
      })
        .join(' AND ');
      whereStrs.push(gtsWhere);
    }
  }
  // 小于
  if (lts) {
    const ltsKeys = Object.keys(lts);
    if (ltsKeys.length > 0) {
      const ltsWhere = ltsKeys.map((key) => {
        whereParams.push(lts[key]);
        return `${key} < ?`;
      })
        .join(' AND ');
      whereStrs.push(ltsWhere);
    }
  }
  // 大于等于
  if (gtes) {
    const gtesKeys = Object.keys(gtes);
    if (gtesKeys.length > 0) {
      const gtesWhere = gtesKeys.map((key) => {
        whereParams.push(gtes[key]);
        return `${key} >= ?`;
      })
        .join(' AND ');
      whereStrs.push(gtesWhere);
    }
  }
  // 小于等于
  if (ltes) {
    const ltesKeys = Object.keys(ltes);
    if (ltesKeys.length > 0) {
      const ltesWhere = ltesKeys.map((key) => {
        whereParams.push(ltes[key]);
        return `${key} <= ?`;
      })
        .join(' AND ');
      whereStrs.push(ltesWhere);
    }
  }
  // 或者
  if (Array.isArray(ors) && ors.length > 0) {
    let orWhereParams = [];
    let orWhereStrs = [];
    ors.forEach((or) => {
      const orFormatWhere = formatWhere(or);
      orWhereParams = orWhereParams.concat(orFormatWhere.whereParams);
      orWhereStrs = orWhereStrs.concat(orFormatWhere.whereStrs);
    });
    whereStrs.push(`(( ${orWhereStrs.join(' ) OR ( ')} ))`);
    whereParams = whereParams.concat(orWhereParams);
  }
  return {
    whereParams,
    whereStrs
  };
}

class BaseDao {
  constructor({ mysqlClient, tableName }) {
    this.mysqlClient = mysqlClient;
    this.tableName = tableName;
  }

  /**
   * Query: Create, Update, Delete
   * @param sql
   * @param args
   * @param mysqlClient
   * @returns {*}
   */
  query(sql, args, mysqlClient) {
    if (!mysqlClient) {
      mysqlClient = this.mysqlClient;
    }
    Logger.debug(sql, args);
    return mysqlClient.queryAsync(sql, args);
  }

  /**
   * 统计记录数量
   *
   * @param count 统计字段
   * @param where  where条件
   * @param group 分组
   * @returns {*}
   */
  count({ count = 'COUNT(*)', where = {}, group }) {
    let querySql = `SELECT ${count} AS total FROM ${this.tableName}`;
    const { whereParams, whereStrs } = formatWhere(where);
    if (whereStrs.length > 0) {
      querySql += ` WHERE ${whereStrs.join(' AND ')}`;
    }
    if (Array.isArray(group) && group.length > 0) {
      querySql += ' GROUP BY ?';
      whereParams.push(group.join(','));
    }
    return this.query(querySql, whereParams)
      .then(result => ((result[0] && result[0].total) || 0));
  }

  /**
   * 分页查询数据
   *
   * @param fields 查询字段
   * @param where  where条件
   * @param offset 偏移量
   * @param limit 每页数量
   * @param sort 排序
   * @returns {*}
   */
  find({ fields = '*', where = {}, group, limit, offset, sorts }) {
    let querySql = `SELECT ${fields} FROM ${this.tableName}`;
    const { whereParams, whereStrs } = formatWhere(where);
    if (whereStrs.length > 0) {
      querySql += ` WHERE ${whereStrs.join(' AND ')}`;
    }
    if (Array.isArray(group) && group.length > 0) {
      querySql += ' GROUP BY ?';
      whereParams.push(group.join(','));
    }
    if (Array.isArray(sorts) && sorts.length > 0) {
      const sortBy = sorts.map(sort => `${sort.sortName} ${sort.sortBy}`)
        .join(' , ');
      querySql += ` ORDER BY ${sortBy}`;
    }
    if (limit && offset) {
      querySql += ' LIMIT ? , ?';
      whereParams.push(offset);
      whereParams.push(limit);
    }
    return this.query(querySql, whereParams);
  }

  /**
   * 查找单个对象
   *
   * @param {String} fields 查询的字段
   * @param {Object} where 查询的条件
   */
  findOne({ fields = '*', where = {} }) {
    return this.find({ fields, where, page: 1, pageSize: 1 })
      .then(result => (result && result[0]));
  }

  /**
   * Query: Update
   * @param updates
   * @param where
   * @param mysqlClient
   * @returns {*}
   */
  update({ updates, where = {} }, mysqlClient) {
    let querySql = `UPDATE ${this.tableName} SET ? WHERE`;
    const { whereParams, whereStrs } = formatWhere(where);
    if (whereStrs.length > 0) {
      querySql += ` ${whereStrs.join(' AND ')}`;
    }
    return this.query(querySql, [updates, whereParams], mysqlClient);
  }

  /**
   * 新增
   *
   * @param {Object} adds 添加的内容
   */
  create({ adds }) {
    // 新建点播记录
    const sql = `INSERT INTO ${this.tableName} SET ?`;
    return this.query(sql, adds);
  }

  /**
   * 删除
   *   delete是关键字，因此用remove作为删除方法名
   *
   * @param {Object} where 删除条件
   */
  remove({ where }) {
    let sql = `DELETE FROM ${this.tableName} WHERE`;
    const { whereParams, whereStrs } = formatWhere(where);
    if (whereStrs.length > 0) {
      sql += ` ${whereStrs.join(' AND ')}`;
    }
    return this.query(sql, [whereParams]);
  }
}

module.exports = BaseDao;
