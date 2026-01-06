import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// GET - 포스트 원본 데이터 가져오기 (수정용)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: '포스트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return NextResponse.json({
      slug,
      metadata: data,
      content,
    });
  } catch (error) {
    console.error('포스트 조회 오류:', error);
    return NextResponse.json(
      { error: '포스트를 가져올 수 없습니다.' },
      { status: 500 }
    );
  }
}

// PUT - 포스트 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { title, content, metadata, newSlug } = await request.json();

    const oldFilePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(oldFilePath)) {
      return NextResponse.json(
        { error: '포스트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 슬러그가 변경되었는지 확인
    const finalSlug = newSlug || slug;
    const newFilePath = path.join(postsDirectory, `${finalSlug}.md`);

    // 슬러그가 변경되고 새 파일이 이미 존재하는 경우
    if (finalSlug !== slug && fs.existsSync(newFilePath)) {
      return NextResponse.json(
        { error: '같은 이름의 포스트가 이미 존재합니다.' },
        { status: 400 }
      );
    }

    // 기존 메타데이터 읽기
    const oldFileContents = fs.readFileSync(oldFilePath, 'utf8');
    const { data: oldMetadata } = matter(oldFileContents);

    // Front Matter 생성 (최초 발행일 유지, 수정일 추가)
    const frontMatter = {
      ...metadata,
      date: oldMetadata.date, // 최초 발행일 유지
      updatedAt: new Date().toISOString().split('T')[0], // 수정일 추가
      title,
    };

    // Markdown 파일 생성
    const fileContent = matter.stringify(content, frontMatter);

    // 파일 저장
    fs.writeFileSync(newFilePath, fileContent, 'utf8');

    // 슬러그가 변경된 경우 기존 파일 삭제
    if (finalSlug !== slug) {
      fs.unlinkSync(oldFilePath);
    }

    return NextResponse.json({
      success: true,
      slug: finalSlug,
      message: '포스트가 수정되었습니다.',
    });
  } catch (error) {
    console.error('포스트 수정 오류:', error);
    return NextResponse.json(
      { error: '포스트 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE - 포스트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: '포스트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 파일 삭제
    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: '포스트가 삭제되었습니다.',
    });
  } catch (error) {
    console.error('포스트 삭제 오류:', error);
    return NextResponse.json(
      { error: '포스트 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}

