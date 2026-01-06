import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, PostMetadata, PostMetadataSchema } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'posts');

// 모든 포스트 슬러그 가져오기
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('포스트 디렉터리를 읽을 수 없습니다:', error);
    return [];
  }
}

// 포스트 메타데이터만 가져오기
export function getPostMetadata(slug: string): (PostMetadata & { slug: string }) | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // Zod로 유효성 검사
    const validatedData = PostMetadataSchema.parse(data);

    return {
      ...validatedData,
      slug,
    };
  } catch (error) {
    console.error(`포스트 ${slug}를 읽을 수 없습니다:`, error);
    return null;
  }
}

// 전체 포스트 데이터 가져오기
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Zod로 메타데이터 유효성 검사
    const validatedData = PostMetadataSchema.parse(data);

    // Markdown을 HTML로 변환
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // excerpt 생성 (첫 150자)
    const excerpt = content.slice(0, 150).replace(/\n/g, ' ') + '...';

    return {
      ...validatedData,
      slug,
      content: contentHtml,
      excerpt,
    };
  } catch (error) {
    console.error(`포스트 ${slug}를 읽을 수 없습니다:`, error);
    return null;
  }
}

// 모든 포스트 메타데이터 가져오기 (정렬됨)
export function getAllPosts(): (PostMetadata & { slug: string })[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostMetadata(slug))
    .filter((post): post is PostMetadata & { slug: string } => post !== null)
    .filter((post) => post.published)
    .sort((a, b) => {
      // 날짜 기준 내림차순 정렬
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

// 태그별 포스트 필터링
export function getPostsByTag(tag: string): (PostMetadata & { slug: string })[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

// 카테고리별 포스트 필터링
export function getPostsByCategory(category: string): (PostMetadata & { slug: string })[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

// 모든 태그 가져오기
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagsSet = new Set<string>();
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

// 모든 카테고리 가져오기
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categoriesSet = new Set<string>();
  
  allPosts.forEach((post) => {
    if (post.category) {
      categoriesSet.add(post.category);
    }
  });

  return Array.from(categoriesSet).sort();
}

