import classNames from "classnames";
import Link from "next/link";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  getLink?: (page: number) => string;
  pageTotal: number;
  className?: string;
}

function Pagination({
  page,
  setPage,
  pageTotal,
  getLink,
  className,
}: PaginationProps) {
  const Wrapper = getLink ? Link : "span";
  if (pageTotal < 1) return null;
  return (
    <nav
      aria-label="Page navigation example"
      className={classNames("mx-auto", className)}
    >
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <Wrapper
            href={getLink?.(page - 1) as string}
            onClick={() => setPage(Math.max(page - 1, 1))}
            role={getLink ? undefined : "button"}
            className="block px-3 py-2 ml-0 leading-tight rounded-l-lg bg-white text-green-500 hover:bg-green-500 hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Wrapper>
        </li>
        {Array.from(Array(pageTotal), (e, i) => {
          return (
            <li key={i}>
              <Wrapper
                href={getLink?.(i + 1) as string}
                onClick={() => setPage(i + 1)}
                role={getLink ? undefined : "button"}
                className={`px-3 py-2 leading-tight hover:bg-green-500 hover:text-white rounded ${
                  i + 1 === page
                    ? "bg-green-500 text-white"
                    : "bg-white text-green-500"
                }`}
              >
                {i + 1}
              </Wrapper>
            </li>
          );
        })}
        <li onClick={() => setPage(Math.min(page + 1, pageTotal))}>
          <Wrapper
            href={getLink?.(page + 1) as string}
            onClick={() => setPage(Math.min(page + 1, pageTotal))}
            role={getLink ? undefined : "button"}
            className="block px-3 py-2 leading-tight rounded-r-lg bg-white text-green-500 hover:bg-green-500 hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Wrapper>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
