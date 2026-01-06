interface StructuredDataProps {
  type: 'blog' | 'article';
  data?: {
    title?: string;
    description?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    url?: string;
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = 'https://albatro33.github.io';

  if (type === 'blog') {
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'albatro33 blog',
      description: '개발, 기술, 그리고 일상 이야기를 공유하는 블로그',
      url: baseUrl,
      author: {
        '@type': 'Person',
        name: 'albatro33',
      },
      inLanguage: 'ko-KR',
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    );
  }

  if (type === 'article' && data) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.title,
      description: data.description,
      author: {
        '@type': 'Person',
        name: data.author || 'albatro33',
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      image: data.image || `${baseUrl}/og-image.png`,
      url: data.url,
      publisher: {
        '@type': 'Person',
        name: 'albatro33',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url,
      },
      inLanguage: 'ko-KR',
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    );
  }

  return null;
}

