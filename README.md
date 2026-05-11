# TECH_BLOG

---

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/MDX-1B1F23?style=for-the-badge&logo=mdx&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">

Next.js App Router와 MDX 기반으로 만든 개인 기술 블로그입니다.

## 실행 방법

```bash
npm install
npm run dev
```

운영 환경 기준으로 확인하려면 아래 명령어를 사용할 수 있습니다.

```bash
npm run build
npm run start
```

## 기술 스택

- Next.js 16
- TypeScript
- React 19
- Tailwind CSS 4
- MDX (`@next/mdx`, `@mdx-js/react`)
- `remark-gfm`
- `rehype-pretty-code`

## 구현 기능

- Next.js App Router 기반 개인 기술 블로그 구현
- MDX 기반 게시글 관리 및 정적 페이지 생성
- 카테고리 기반 게시글 필터링 및 카테고리 활성 상태 처리
- `published` 상태 기반 비공개 게시글 제외 처리
- description이 없을 경우 본문 기반 요약 자동 생성
- Route Groups를 활용한 목록/상세 레이아웃 분리
- `rehype-pretty-code` 기반 코드 하이라이팅 적용
- 커스텀 MDX 컴포넌트를 통한 문서 스타일링 구성

## 폴더 구조

```bash
├─app
│  ├─blog
│  │  ├─(list)
│  │  │  ├─category
│  │  │  │  └─[category]
│  │  │  │     └─page.tsx
│  │  │  ├─layout.tsx
│  │  │  └─page.tsx
│  │  └─[slug]
│  │     └─page.tsx
│  ├─globals.css
│  ├─layout.tsx
│  └─page.tsx
├─components
│  ├─blog
│  ├─common
│  └─layout
├─content
│  └─posts
│     └─*.mdx
├─lib
│  └─posts
│     ├─index.ts
│     ├─service.ts
│     ├─types.ts
│     └─utils.ts
├─public
├─mdx-components.tsx
├─next.config.ts
└─package.json
```

## 게시글 작성 방식

- 게시글은 `content/posts/*.mdx`로 관리한다.    
- 각 문서에는 아래와 같은 메타데이터를 사용할 수 있다.

```mdx
export const metadata = {
  title: "게시글 제목",
  description: "게시글 설명",
  date: "2026-05-10",
  category: "Next.js",
  tags: ["nextjs", "mdx"],
  published: true,
};
```

## 배포
- [Vercel](https://kimyongbeom-log.vercel.app)