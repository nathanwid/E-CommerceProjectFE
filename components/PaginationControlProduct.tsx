// components/PaginationControl.tsx (Improved Version)
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationControl({
  currentPage,
  totalPages,
  maxVisiblePages = 5, // How many page numbers to show at once
}: {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    // Use replace to avoid adding to browser history for pagination
    replace(`${pathname}?${params.toString()}`);
  };

  // --- Calculate page numbers to display ---
  const getPageNumbers = () => {
    const pages = [];
    const halfWindow = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);

    // Adjust window if it's near the start or end
    if (currentPage - halfWindow < 1) {
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    }
    if (currentPage + halfWindow > totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  // --- End of page number calculation ---


  if (totalPages <= 1) {
     return null; // Don't show pagination if there's only one page or less
  }


  return (
    // Keep the daisyUI .join structure if you like it,
    // or remove it if you only want the buttons themselves
    <>
      {/* Previous Button */}
      <button
        className="join-item btn btn-sm md:btn-md" // Added sizing classes
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        «
      </button>

      {/* Optional: First Page Button */}
      {pageNumbers[0] > 1 && (
          <>
           <button
             className="join-item btn btn-sm md:btn-md"
             onClick={() => handlePageChange(1)}
             aria-label="Go to first page"
           >
             1
           </button>
           {pageNumbers[0] > 2 && <button className="join-item btn btn-sm md:btn-md btn-disabled">...</button>}
         </>
       )}


      {/* Page Number Buttons */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`join-item btn btn-sm md:btn-md ${
            currentPage === page ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined} // Accessibility
        >
          {page}
        </button>
      ))}


     {/* Optional: Last Page Button */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages -1 && <button className="join-item btn btn-sm md:btn-md btn-disabled">...</button>}
          <button
            className="join-item btn btn-sm md:btn-md"
            onClick={() => handlePageChange(totalPages)}
            aria-label="Go to last page"
           >
             {totalPages}
          </button>
         </>
       )}

      {/* Next Button */}
      <button
        className="join-item btn btn-sm md:btn-md"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        »
      </button>
    </>
  );
}