const withTM = require('next-transpile-modules')(['@sky-mavis/tanto-connect']);

const nextConfig = withTM({
  reactStrictMode: true,
});

module.exports = nextConfig;
