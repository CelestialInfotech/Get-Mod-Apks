"use client"

import { Navbar } from "@/components/navbar"
import { UpdatedListCard } from "@/components/updated-list-card"
import { Gamepad2 } from "lucide-react"
import { Pagination } from "@/components/pagination"
import { useState } from "react"
import { useApksByCategory, useApksByFilter } from "@/hooks/use-apks"

export default function GamesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 20
  const { apks: games, loading, error, data } = useApksByFilter("games", currentPage, limit)

  const totalPages = data?.pagination?.total_pages || 1

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
            <Gamepad2 size={24} />
          </div>
          <h2 className="text-3xl font-bold">Games</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-32 bg-card/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>Failed to load games. Please try again later.</p>
          </div>
        ) : games.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <UpdatedListCard
                  key={game.id}
                  app={{
                    id: game.id,
                    title: game.title,
                    category: game.category,
                    size: game.size,
                    version: game.version,
                    status: game.mod_info,
                    icon: game.logo,
                    isMod: true,
                  }}
                />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No games available</div>
        )}
      </main>
    </div>
  )
}
