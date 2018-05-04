const express = require('express');
const log4js = require('log4js');
const bodyParser = require('body-parser');

const { logConfig, port } = require('./config');
log4js.configure(logConfig);
const Logger = log4js.getLogger('app');

const app = express();

// body数据解析
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 部分IE会对ajax请求缓存，设置禁止缓存的header
app.use(require('./middleware/noCache'));

// 跨域中间件
app.use(require('./middleware/cors'));

// 错误处理
app.use(require('./middleware/errorHandler'));

// 动态路由
app.use('/', require('./modules/router'));

app.listen(port, (err) => {
  if (err) {
    return Logger.error('启动失败：', err);
  }
  Logger.info(`api start successfully`);
  return Logger.info(`服务启动，访问地址：http://localhost:${port}`);
});

module.exports = app;