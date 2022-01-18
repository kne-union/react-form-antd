const createProxyMiddleware = require('http-proxy-middleware');


module.exports = function (app) {
  app.use(
    '/open-api/upload_static_file',
    createProxyMiddleware({
      target: 'https://lite.knxgalaxy.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/upload_assets',
    createProxyMiddleware({
      target: 'https://static.knxgalaxy.com',
      changeOrigin: true
    })
  );
};
