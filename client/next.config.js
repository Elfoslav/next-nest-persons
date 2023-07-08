const nextConfigDev = require('./next.config.dev');
const nextConfigProd = require('./next.config.prod');

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = isProduction ? nextConfigProd : nextConfigDev;

module.exports = nextConfig;
