"use client"

import { Navbar } from "@/components/navbar"
import { FeaturedCard } from "@/components/featured-card"
import { UpdatedListCard } from "@/components/updated-list-card"
import { Gamepad2, LayoutGrid, ChevronRight } from "lucide-react"
import { HeroSlider } from "@/components/hero-slider"
import { useLatestApks, useHomeApks } from "@/hooks/use-apks"

export default function Home() {
  const { apks: latestApks, loading: latestLoading } = useLatestApks()
  const { loading, games, apps } = useHomeApks()
  
  // Get the data arrays you want
  const featuredApps = latestApks.slice(0, 6)
  const updatedGames = games.trending   // trending games
  const updatedApps = apps.trending     // trending apps

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <HeroSlider />

        {/* Featured Section - show loading state or data */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-card/50 rounded-2xl animate-pulse" />
            ))
          ) : featuredApps.length > 0 ? (
            featuredApps.map((app) => (
              <FeaturedCard
                key={app.id}
                app={{
                  id: app.id,
                  title: app.title,
                  rating: app.rating || 4.5,
                  description: app.description.substring(0, 100) + "...",
                  version: app.version,
                  size: app.size,
                  icon: app.logo,
                  color: "bg-blue-500/10",
                }}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-muted-foreground">No featured apps available</div>
          )}
        </section>

        {/* Updated Games Section */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                <Gamepad2 size={24} />
              </div>
              <h2 className="text-2xl font-bold">Trending Games</h2>
            </div>
            <a
              href="/games"
              className="flex items-center gap-2 rounded-full bg-[#00d084] px-5 py-2 text-sm font-bold text-[#151f2b] hover:bg-[#00b874] transition-colors"
            >
              View All <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 bg-card/50 rounded-xl animate-pulse" />
              ))
            ) : updatedGames.length > 0 ? (
              updatedGames.map((game) => (
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
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-muted-foreground">No games available</div>
            )}
          </div>
        </section>

         {/* Updated Games Section */}
         <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                <Gamepad2 size={24} />
              </div>
              <h2 className="text-2xl font-bold">Trending Apps</h2>
            </div>
            <a
              href="/apps"
              className="flex items-center gap-2 rounded-full bg-[#00d084] px-5 py-2 text-sm font-bold text-[#151f2b] hover:bg-[#00b874] transition-colors"
            >
              View All <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 bg-card/50 rounded-xl animate-pulse" />
              ))
            ) : updatedApps.length > 0 ? (
              updatedApps.map((game) => (
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
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-muted-foreground">No games available</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
