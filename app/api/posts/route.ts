import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllPostSlugs } from '@/lib/blog/markdown';

const postsDirectory = path.join(process.cwd(), 'posts');

// GET - 모든 포스트 슬러그 목록 (Admin용)
export async function GET() {
  try {
    const slugs = getAllPostSlugs();
    return NextResponse.json({ slugs });
  } catch (error) {
    console.error('포스트 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '포스트 목록을 가져올 수 없습니다.' },
      { status: 500 }
    );
  }
}

// POST - 새 포스트 작성
export async function POST(request: NextRequest) {
  try {
    const { title, slug, content, metadata } = await request.json();

    // 슬러그 생성 (제목에서 자동 생성 또는 수동 입력)
    const finalSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // 파일 경로
    const filePath = path.join(postsDirectory, `${finalSlug}.md`);

    // 이미 존재하는 파일인지 확인
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: '같은 이름의 포스트가 이미 존재합니다.' },
        { status: 400 }
      );
    }

    // Front Matter 생성
    const frontMatter = {
      title,
      date: new Date().toISOString().split('T')[0],
      ...metadata,
    };

    // Markdown 파일 생성
    const fileContent = matter.stringify(content, frontMatter);
    
    // 디렉터리가 없으면 생성
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // 파일 저장
    fs.writeFileSync(filePath, fileContent, 'utf8');

    return NextResponse.json({
      success: true,
      slug: finalSlug,
      message: '포스트가 생성되었습니다.',
    });
  } catch (error) {
    console.error('포스트 생성 오류:', error);
    return NextResponse.json(
      { error: '포스트 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}

