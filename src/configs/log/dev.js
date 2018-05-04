const path = require('path');

function resolve (dir) {
  return path.join(__dirname, 'logs', dir);
}

module.exports = {
  appenders: {
    console: {type: 'console'},
    error: {
      type: 'file', // 日志文件类型
      filename: resolve('error.log'), // 日志文件名，可以设置相对路径或绝对路径
      maxLogSize: 10 * 1024 * 1024,
      layout: {
        type: 'basic'
      },
      backups: 5
    },
    monitor: {
      type: 'file',
      filename: resolve('monitor.log'),
      // 1M 单文件大小，单位字节
      maxLogSize: 10 * 1024 * 1024,
      backups: 5
    },
    cron: {
      type: 'dateFile',
      filename: resolve('cron.log'),
      pattern: '-yyyy-MM-dd.log'
    }
  },
  categories: {
    default: {appenders: ['console'], level: 'info'},
    monitor: {appenders: ['monitor'], level: 'info'},
    cron: {appenders: ['cron'], level: 'info'}
  }
};
