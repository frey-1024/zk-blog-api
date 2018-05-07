const mysql = require('mysql');   //引入mysql包，(npm install mysql --save)
const { mysqlConfig } = require('../configs/index');
const pool = mysql.createPool(mysqlConfig);

module.exports = pool;
// pool.getConnection(function (err, connection) {   //开启连接
//   if (err) throw err;
//
//   var value = 'zhang';
//   var query = connection.query('SELECT * FROM user WHERE name=?', value, function (err, result) {
//     if (err) throw err;
//
//     console.log(result);
//     connection.release();
//   });
//   console.log(query.sql);
// });