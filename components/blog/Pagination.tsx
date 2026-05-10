import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pathname: string;
};

function getPageHref(pathname: string, page: number) {
  return page === 1 ? pathname : `${pathname}?page=${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  pathname,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const maxPagesToShow = 10;
  const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={getPageHref(pathname, currentPage - 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-default bg-white text-secondary transition hover:bg-hover/60 hover:text-primary"
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
      ) : (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-default bg-white text-subtle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </span>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <Link
              key={page}
              href={getPageHref(pathname, page)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition ${
                isActive
                  ? "border-[#FBEECC] bg-active text-primary"
                  : "border-default bg-white text-secondary hover:bg-hover/60 hover:text-primary"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={getPageHref(pathname, currentPage + 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-default bg-white text-secondary transition hover:bg-hover/60 hover:text-primary"
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      ) : (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-default bg-white text-subtle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      )}
    </nav>
  );
}
