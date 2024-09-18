const withTM = require('next-transpile-modules')(['@sky-mavis/tanto-connect', '@sky-mavis/waypoint']);

const nextConfig = withTM({
  reactStrictMode: true,
});

module.exports = nextConfig;
