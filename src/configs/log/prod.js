const path = require('path');

function resolve (dir) {
  return path.join(__dirname, 'logs', dir);
}


module.exports = {
  appenders: {
    console: { type: 'console' },
    app: {
      type: 'file',
      filename: resolve('app.log'),
      maxLogSize: 1048576,
      layout: {
        type: 'basic'
      },
      backups: 5
    },
    error: {
      type: 'file',
      filename: resolve('error.log'),
      maxLogSize: 1048576,
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
    default: { appenders: ['app'], level: 'info' },
    monitor: { appenders: ['monitor'], level: 'info' },
    cron: { appenders: ['cron'], level: 'info' }
  }
};
