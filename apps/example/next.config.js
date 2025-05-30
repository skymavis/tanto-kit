module.exports = {
  // For testing safe wallet
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, content-type, Authorization',
          },
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors "self" https://ronin.safe.onchainden.com;',
          },
        ],
      },
    ];
  },
  transpilePackages: ['@sky-mavis/tanto-connect', '@sky-mavis/waypoint'],
};
