"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export function CustomPagination({
  totalPages,
  currentPage,
  pageSize,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    params.set("size", pageSize.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1
                ? createPageURL(currentPage - 1)
                : undefined
            }
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={createPageURL(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? createPageURL(currentPage + 1)
                : undefined
            }
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}