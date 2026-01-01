"use client"
import { Star, RotateCw } from "lucide-react"
import { initAnalytics } from "@/lib/firebase"
import { logEvent } from "firebase/analytics"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AppData {
  id: string
  title: string
  rating: number
  description: string
  version: string
  size: string
  icon: string
  color: string
}

export function FeaturedCard({ app }: { app: AppData }) {
  const router = useRouter()

  const handleDownload = async () => {
    const analytics = await initAnalytics()
    if (analytics) {
      logEvent(analytics, "app_view", {
        app_id: app.id,
        app_name: app.title,
        version: app.version,
        size: app.size,
      })
    }
    router.push(`/details/${app.id}`)
  }

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#1e2a3b] p-5 transition-all hover:bg-[#253347] hover:shadow-xl border border-white/5">
      <Link href={`/details/${app.id}`} className="flex gap-4 cursor-pointer">
        <div className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ${app.color}`}>
          <img src={app.icon || "/placeholder.svg"} alt={app.title} className="h-full w-full object-cover" />
          <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-[#1e2a3b] bg-green-500" />
        </div>
        <div className="flex flex-col">
          <h3 className="line-clamp-1 font-bold text-white group-hover:text-[#00d084] transition-colors">
            {app.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="font-medium">{app.rating}</span>
          </div>
        </div>
      </Link>

      <Link href={`/details/${app.id}`}>
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-400 cursor-pointer">
          Introduction {app.description}
        </p>
      </Link>

      <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <RotateCw size={14} />
            {app.version}
          </div>
          <div className="flex items-center gap-1">
            <span>💾</span>
            {app.size}
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-full bg-[#00d084] px-4 py-2 text-sm font-bold text-[#151f2b] transition-transform hover:bg-[#00b874] active:scale-95"
        >
          Download
        </button>
      </div>
    </div>
  )
}
