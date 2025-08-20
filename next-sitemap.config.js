/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.aryasamajseawoods.co.in', // your canonical domain
  generateRobotsTxt: true, // generate robots.txt
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/api/*',   // exclude API routes
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }
    ],
  },
};
