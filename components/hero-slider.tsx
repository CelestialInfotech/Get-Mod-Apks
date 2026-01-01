"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLatestApks } from "@/hooks/use-apks"
import { FeaturedCard } from "./featured-card"


export function HeroSlider() {
  const { apks: latestApks, loading: latestLoading } = useLatestApks()

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="mb-12 overflow-hidden">
      <div className="relative">
        <div ref={emblaRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
          <div className="flex gap-4">
            {latestApks.map((slide) => (
              <div key={slide.id}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_32%]">

                <FeaturedCard
                  key={slide.id}
                  app={{
                    id: slide.id,
                    title: slide.title,
                    rating: slide.rating || 4.5,
                    description: slide.description.substring(0, 100) + "...",
                    version: slide.version,
                    size: slide.size,
                    icon: slide.logo,
                    color: "bg-grey-100",
                  }}
                />
              </div>
            ))}


          </div>
        </div>

        {/* <CHANGE> Updated navigation buttons positioning and styling */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-800/60 p-2.5 text-white backdrop-blur-sm hover:bg-slate-800/80 transition-all shadow-lg z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-800/60 p-2.5 text-white backdrop-blur-sm hover:bg-slate-800/80 transition-all shadow-lg z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* <CHANGE> Enhanced pagination dots styling */}
        <div className="mt-6 flex justify-center gap-2">
          {latestApks.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${index === selectedIndex ? "bg-blue-500 w-6" : "bg-gray-500 w-2"
                }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* <CHANGE> Added Featured section header with glow effect */}
      <div className="mt-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00d084] text-[#151f2b] shadow-[0_0_20px_rgba(0,208,132,0.5)]">
          <Zap size={22} fill="currentColor" />
        </div>
        <h2 className="text-2xl font-bold text-white">Featured</h2>
      </div>
    </section>
  )
}
