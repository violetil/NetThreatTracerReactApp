// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/threat-data',
    createProxyMiddleware({
      target: 'http://178.128.209.118:5000',
      changeOrigin: true,
    })
  );
};
