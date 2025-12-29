const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

const domain = 'https://elijahfarrell.com';

const staticRoutes = [
  '/',
  '/services',
  // Add more routes as you create them
];

async function generate() {
  const sitemap = new SitemapStream({ 
    hostname: domain,
    xmlns: {
      news: 'http://www.google.com/schemas/sitemap-news/0.9',
      xhtml: 'http://www.w3.org/1999/xhtml',
      image: 'http://www.google.com/schemas/sitemap-image/1.1',
      video: 'http://www.google.com/schemas/sitemap-video/1.1'
    }
  });
  const filePath = path.resolve(__dirname, '../public/sitemap.xml');
  const writeStream = createWriteStream(filePath);

  // Write routes to sitemap
  for (const route of staticRoutes) {
    sitemap.write({
      url: route,
      changefreq: 'monthly',
      priority: route === '/' ? 1.0 : 0.5,
      lastmod: new Date().toISOString(),
    });
  }

  sitemap.end();

  try {
    const sm = await streamToPromise(sitemap);
    // Format the XML with proper indentation
    const xmlString = sm.toString();
    const formattedXml = xmlString
      .replace(/></g, '>\n<')
      .replace(/^<\?xml/, '<?xml')
      .replace(/\n<urlset/, '\n<urlset')
      .replace(/\n<url>/g, '\n  <url>')
      .replace(/\n<\/url>/g, '\n  </url>')
      .replace(/\n<loc>/g, '\n    <loc>')
      .replace(/\n<lastmod>/g, '\n    <lastmod>')
      .replace(/\n<changefreq>/g, '\n    <changefreq>')
      .replace(/\n<priority>/g, '\n    <priority>')
      .replace(/\n<\/urlset>/g, '\n</urlset>');
    
    writeStream.write(formattedXml);
    writeStream.end();
    console.log(`✅ Sitemap generated at ${filePath}`);
  } catch (err) {
    console.error('❌ Failed to generate sitemap:', err);
    writeStream.end();
  }
}

generate().catch((err) => {
  console.error('❌ Failed to generate sitemap:', err);
});
