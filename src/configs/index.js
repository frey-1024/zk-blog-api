let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./prod');
    break;
  default:
    config = require('./dev');
}

module.exports = config;
