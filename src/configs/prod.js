module.exports = {
  logConfig: require('./log/prod.js'),
  apiHost: '',
  mysqlConfig: {
    connectionLimit: 10,          //允许同时有10个线程访问mysql
    host: '39.106.21.192',            //本地IP
    user: 'root',
    password: 'zhang123456',
    dateStrings: true,
    port: '3306',
    database: 'db_zk'           //数据库名字
  },
};
