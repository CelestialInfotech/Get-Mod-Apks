"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = []

  // Simple logic for page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push("...")
    }
  }

  // Remove duplicate dots
  const uniquePages = pages.filter((v, i, a) => v !== "..." || a[i - 1] !== "...")

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-gray-300"
      >
        <ChevronLeft size={20} />
      </Button>

      <div className="flex items-center gap-2">
        {uniquePages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              page === currentPage
                ? "bg-[#00d084] text-[#151f2b]"
                : page === "..."
                  ? "text-gray-500 cursor-default"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            {page === "..." ? <MoreHorizontal size={16} /> : page}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-gray-300"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  )
}
