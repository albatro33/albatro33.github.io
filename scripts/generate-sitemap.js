const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const baseUrl = 'https://albatro33.github.io';
const postsDirectory = path.join(process.cwd(), 'posts');

// 모든 포스트 가져오기
function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          date: data.date,
          updatedAt: data.updatedAt,
        };
      });

    return posts;
  } catch (error) {
    console.error('포스트를 읽을 수 없습니다:', error);
    return [];
  }
}

// Sitemap XML 생성
function generateSitemap() {
  const posts = getAllPosts();

  const postUrls = posts
    .map((post) => {
      const lastmod = post.updatedAt || post.date;
      return `  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
${postUrls}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated: public/sitemap.xml');
}

generateSitemap();

