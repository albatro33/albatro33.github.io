import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://albatro33.github.io';

  // 모든 포스트 가져오기
  const posts = getAllPosts();

  // 포스트 페이지들
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...postUrls];
}

