const mysql = require('mysql');
const bluebird = require('bluebird');
const log = require('log4js').getLogger('mysql');
const { mysqlConfig } = require('../configs/index');
// promisify
bluebird.promisifyAll(require('mysql/lib/Connection').prototype);
bluebird.promisifyAll(require('mysql/lib/Pool').prototype);

function createPool() {
  log.info('创建mysql连接池......');
  return mysql.createPool(mysqlConfig);
}

module.exports = createPool();