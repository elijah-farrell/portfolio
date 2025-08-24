const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

const domain = 'https://elijahfarrell.com';

const staticRoutes = [
  '/',
  '/services',
  // Add more routes as you create them
];

const sitemap = new SitemapStream({ hostname: domain });

async function generate() {
  const filePath = path.resolve(__dirname, '../public/sitemap.xml');
  const writeStream = createWriteStream(filePath);

  streamToPromise(sitemap).then((sm) => {
    writeStream.write(sm.toString());
    console.log(`✅ Sitemap generated at ${filePath}`);
  });

  for (const route of staticRoutes) {
    sitemap.write({
      url: route,
      changefreq: 'monthly',
      priority: route === '/' ? 1.0 : 0.5,
      lastmod: new Date().toISOString(),
    });
  }

  sitemap.end();
}

generate().catch((err) => {
  console.error('❌ Failed to generate sitemap:', err);
});
