# TECH_BLOG

---

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/MDX-1B1F23?style=for-the-badge&logo=mdx&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">

Next.js App Router와 MDX 기반으로 만든 개인 기술 블로그입니다.

## 프로젝트 실행 방법

```bash
npm install
npm run dev
```

운영 환경 기준으로 확인하려면 아래 명령어를 사용할 수 있습니다.

```bash
npm run build
npm run start
```

## 기술 스택 및 사용 라이브러리

- Next.js 16
- TypeScript
- React 19
- Tailwind CSS 4
- MDX (`@next/mdx`, `@mdx-js/react`)
- `remark-gfm`
- `rehype-pretty-code`

## 구현 기능

- Next.js App Router 기반으로 구현한 개인 기술 블로그
- `content/posts`의 MDX를 라우트에 매핑해 정적 페이지로 생성
- `lib/posts.ts`에서 MDX를 읽어 게시글 목록을 생성하고, 발행 여부를 필터링한 뒤 최신순으로 정렬
- description이 없을 경우 본문 일부를 요약해 목록에 표시
- 전체 게시글 목록(`/blog`) 제공
  - `?page=` 쿼리 기반 페이지네이션 적용
  - 페이지당 5개의 게시글 렌더링
- 카테고리별 게시글 목록(`/blog/category/[category]`) 제공
  - 카테고리 slug 생성 및 게시글 수 계산
  - 사이드바에서 현재 선택된 카테고리 하이라이트
- 게시글 상세 페이지
  - slug 기반으로 게시글 조회
  - 존재하지 않는 slug는 `notFound()` 처리
- `/` 접속 시 `/blog`로 리다이렉트
- `mdx-components.tsx`를 통해 제목, 리스트, 표, 인라인 코드, 코드 블록에 스타일 적용
- `rehype-pretty-code`와 `catppuccin-latte` 테마를 사용해 코드 하이라이팅 적용

## 폴더구조

```bash
├─app
│  ├─blog
│  │  ├─category
│  │  │  └─[category]
│  │  │     └─page.tsx
│  │  ├─[slug]
│  │  │  └─page.tsx
│  │  └─page.tsx
│  ├─globals.css
│  ├─layout.tsx
│  └─page.tsx
├─components
│  ├─blog
│  │  ├─Pagination.tsx
│  │  └─PostList.tsx
│  ├─common
│  │  └─Card.tsx
│  └─layout
│     ├─Header.tsx
│     ├─Sidebar.tsx
│     └─SidebarNav.tsx
├─content
│  └─posts
│     └─*.mdx
├─lib
│  └─posts.ts
├─public
├─mdx-components.tsx
├─next.config.ts
└─package.json
```

## 각 페이지별 기능 정의

- **공통(Layout / Header / Sidebar)**

  - `app/layout.tsx`에서 전체 레이아웃을 구성하고 `Header`, `Sidebar`를 공통 레이아웃으로 사용한다.
  - Header 우측에는 이메일과 GitHub 링크가 표시된다.
  - Sidebar는 `getCategorySummaries`를 통해 카테고리 목록과 게시글 수를 동적으로 보여준다.
  - 현재 경로에 따라 활성화된 카테고리 메뉴 스타일이 적용된다.

- **홈** (`/`)

  - 별도의 랜딩 페이지 없이 `/blog`로 즉시 리다이렉트된다.

- **블로그 목록** (`/blog`)

  - `lib/posts.ts`의 `getAllPosts`를 통해 전체 게시글 목록을 가져온다.
  - `parsePageParam`으로 `page` 쿼리 값을 파싱한다.
  - 페이지당 5개의 게시글만 보여준다.
  - 잘못된 페이지 번호이거나 전체 페이지 수를 초과하는 경우 `notFound()` 처리한다.
  - 게시글 목록은 `PostList`, `Card`, `Pagination` 컴포넌트를 통해 표시된다.
  - 게시글이 없을 경우 `No posts found.` 메시지를 보여준다.

- **카테고리별 목록** (`/blog/category/[category]`)

  - `generateStaticParams`를 통해 카테고리 페이지를 정적 생성한다.
  - URL의 카테고리 slug를 실제 카테고리명으로 매핑하여 게시글 목록을 필터링한다.
  - 카테고리에 맞는 메타데이터 제목과 설명을 동적으로 생성한다.
  - 존재하지 않는 카테고리 또는 잘못된 페이지 번호는 `notFound()` 처리한다.
  - 페이지네이션 규칙은 전체 목록 페이지와 동일하게 동작한다.

- **게시글 상세** (`/blog/[slug]`)

  - `generateStaticParams`를 통해 게시글 slug 페이지를 정적 생성한다.
  - `getPostBySlug`를 사용해 게시글 메타데이터와 MDX 컴포넌트를 함께 가져온다.
  - 게시글 제목과 설명을 기반으로 메타데이터를 생성한다.
  - 존재하지 않거나 비공개(`published: false`)인 게시글은 표시하지 않는다.
  - MDX 본문을 커스텀 컴포넌트 스타일로 렌더링한다

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

- `description`이 없으면 본문을 기반으로 요약을 자동 생성
- `published: false`로 설정하면 게시글 목록과 상세 페이지에서 제외

## 배포
- Vercel: https://kimyongbeom-log.vercel.app