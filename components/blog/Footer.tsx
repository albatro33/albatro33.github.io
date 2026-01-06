export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">albatro33 blog</h3>
            <p className="text-gray-300">
              개발, 기술, 그리고 일상 이야기를 공유하는 블로그입니다.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">링크</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  홈
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  소개
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/albatro33"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">기술 스택</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Next.js 15</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Redux Toolkit</li>
              <li>Zod</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>© {new Date().getFullYear()} albatro33 blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

