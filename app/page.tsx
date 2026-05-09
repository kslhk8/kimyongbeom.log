"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/common/Card";

type Post = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const samplePosts: Post[] = [
  {
    id: 1,
    title: "Next.js App Router로 블로그 구조 잡기",
    description:
      "공통 레이아웃, 카테고리 네비게이션, 콘텐츠 영역의 책임을 나누면서 기술 블로그의 기본 뼈대를 정리한 과정입니다.",
    date: "2026.05.09",
  },
  {
    id: 2,
    title: "React 상태 관리에서 복잡도를 낮추는 기준",
    description:
      "전역 상태와 지역 상태를 어떻게 나눌지, 그리고 컴포넌트 경계를 어떤 기준으로 설계하면 유지보수가 쉬워지는지 정리했습니다.",
    date: "2026.05.07",
  },
  {
    id: 3,
    title: "성능 이슈를 만났을 때 먼저 확인하는 포인트",
    description:
      "렌더링 비용, 네트워크 병목, 이미지 최적화, 캐싱 전략까지 실제 프로젝트에서 우선순위를 두고 보는 항목들을 모았습니다.",
    date: "2026.05.03",
  },
  {
    id: 4,
    title: "TypeScript에서 안전한 타입 설계를 하는 방법",
    description:
      "유니온 타입, 제네릭, 타입 가드를 활용해 협업 시 실수를 줄이고 유지보수하기 쉬운 타입 구조를 만드는 기준을 정리했습니다.",
    date: "2026.04.29",
  },
  {
    id: 5,
    title: "CSS 레이아웃에서 자주 마주치는 정렬 문제 해결",
    description:
      "Flexbox와 Grid를 사용할 때 자주 부딪히는 높이, 간격, 정렬 문제를 실제 예시 중심으로 풀어봤습니다.",
    date: "2026.04.25",
  },
  {
    id: 6,
    title: "React Query로 서버 상태를 다루는 이유",
    description:
      "서버 상태와 클라이언트 상태를 분리했을 때 코드가 얼마나 단순해지는지, 그리고 캐싱 전략을 어떻게 가져갈지 정리했습니다.",
    date: "2026.04.22",
  },
  {
    id: 7,
    title: "Next.js에서 SEO 메타데이터 설계하기",
    description:
      "App Router 환경에서 페이지별 메타데이터를 어떻게 구성하면 검색 노출과 공유 경험을 함께 개선할 수 있는지 다룹니다.",
    date: "2026.04.18",
  },
  {
    id: 8,
    title: "프론트엔드 트러블슈팅 기록을 남기는 기준",
    description:
      "문제 상황, 원인 분석, 해결 과정, 재발 방지 포인트를 어떤 템플릿으로 기록하면 나중에 다시 보기 좋은지 정리했습니다.",
    date: "2026.04.15",
  },
  {
    id: 9,
    title: "컴포넌트 분리를 너무 일찍 하면 생기는 문제",
    description:
      "재사용성을 높이려다 오히려 책임이 흐려지는 상황을 피하기 위해, 컴포넌트 분리 시점과 기준을 정리했습니다.",
    date: "2026.04.12",
  },
  {
    id: 10,
    title: "웹 접근성을 고려한 UI 설계 체크리스트",
    description:
      "대비, 포커스, 시맨틱 마크업, 키보드 탐색 등 기본적이지만 빠지기 쉬운 접근성 항목들을 정리했습니다.",
    date: "2026.04.08",
  },
  {
    id: 11,
    title: "프로젝트 구조를 단순하게 유지하는 방법",
    description:
      "폴더를 지나치게 세분화하지 않고도 확장 가능한 구조를 유지하기 위해 실제 프로젝트에서 적용한 규칙을 공유합니다.",
    date: "2026.04.04",
  },
  {
    id: 12,
    title: "렌더링 최적화 전에 먼저 확인해야 할 것들",
    description:
      "메모이제이션을 적용하기 전에 데이터 흐름과 불필요한 상태 업데이트부터 점검해야 하는 이유를 사례와 함께 설명합니다.",
    date: "2026.04.01",
  },
];

const POSTS_PER_PAGE = 5;

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(samplePosts.length / POSTS_PER_PAGE);

  const visiblePosts = useMemo<Post[]>(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return samplePosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [currentPage]);

  const pageStart = Math.floor((currentPage - 1) / 10) * 10 + 1;
  const pageEnd = Math.min(pageStart + 9, totalPages);
  const pageNumbers = Array.from(
    { length: pageEnd - pageStart + 1 },
    (_, index) => pageStart + index,
  );

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-default bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="divide-y divide-default">
          {visiblePosts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-default bg-card text-muted transition hover:border-zinc-300 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setCurrentPage(pageNumber)}
              className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm transition ${
                currentPage === pageNumber
                  ? "bg-active text-primary font-bold"
                  : "text-muted hover:bg-hover/60 hover:text-primary"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-default bg-card text-muted transition hover:border-zinc-300 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
