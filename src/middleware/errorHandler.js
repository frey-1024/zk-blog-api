const Logger = require('log4js').getLogger('middleware.errorHandler');

module.exports = (err, req, res, next) => {
  Logger.error(err.stack || err);
  res.send(err.message);
  return next();
};
