"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationControl({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`join-item btn ${
            currentPage === i + 1 ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      )).slice(0, 5)}

      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </>
  );
}
