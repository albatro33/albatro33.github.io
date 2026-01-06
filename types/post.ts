import { z } from 'zod';

// 블로그 포스트 메타데이터 스키마
export const PostMetadataSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  date: z.string(), // 최초 발행일
  updatedAt: z.string().optional(), // 최종 수정일
  description: z.string().min(1, '설명은 필수입니다'),
  author: z.string().default('작성자'),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().default(true),
});

// 블로그 포스트 전체 스키마
export const PostSchema = PostMetadataSchema.extend({
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
});

// TypeScript 타입 추론
export type PostMetadata = z.infer<typeof PostMetadataSchema>;
export type Post = z.infer<typeof PostSchema>;

