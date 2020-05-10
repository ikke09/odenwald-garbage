/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: `${process.env.REACT_APP_URL}`,
        pathRewrite: {
            '^/api': '/.netlify/functions/api/',
        },
    }));
};
