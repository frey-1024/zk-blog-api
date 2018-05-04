var mysql = require('mysql');   //引入mysql包，(npm install mysql --save)

var pool = mysql.createPool({    //创建一个线程池
  connectionLimit: 10,          //允许同时有10个线程访问mysql
  host: '39.106.21.192',            //本地IP
  user: 'root',
  password: 'zhang123456',
  dateStrings: true,
  port: '3306',
  database: 'db_zk'           //数据库名字
});

pool.getConnection(function (err, connection) {   //开启连接
  if (err) throw err;

  var value = 'zhang';
  var query = connection.query('SELECT * FROM user WHERE name=?', value, function (err, result) {
    if (err) throw err;

    console.log(result);
    connection.release();
  });
  console.log(query.sql);
});