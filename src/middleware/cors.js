/**
 * 设置跨域的中间件
 */
module.exports = (req, res, next) => {
  const origin = req.get('origin');
  res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS,HEAD');
  res.set('Access-Control-Allow-Credentials', true);
  next();
};
