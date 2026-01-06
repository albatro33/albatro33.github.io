import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/write', '/api/'],
      },
    ],
    sitemap: 'https://albatro33.github.io/sitemap.xml',
  };
}

