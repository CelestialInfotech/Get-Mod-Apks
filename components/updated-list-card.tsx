"use client"
import { RotateCw } from "lucide-react"
import { initAnalytics } from "@/lib/firebase"
import { logEvent } from "firebase/analytics"
import { useRouter } from "next/navigation"

interface UpdatedApp {
  id: string
  title: string
  category: string
  size: string
  version: string
  status: string
  icon: string
  isMod?: boolean
}

export function UpdatedListCard({ app }: { app: UpdatedApp }) {
  const router = useRouter()

  const handleItemClick = async () => {
    const analytics = await initAnalytics()
    if (analytics) {
      logEvent(analytics, "app_view", {
        app_id: app.id,
        app_name: app.title,
        category: app.category,
        is_mod: app.isMod || false,
      })
    }
    router.push(`/details/${app.id}`)
  }

  return (
    <div
      onClick={handleItemClick}
      className="relative cursor-pointer flex items-center gap-4 rounded-xl bg-[#1e2a3b] p-4 transition-all hover:bg-[#253347] border border-white/5 active:scale-[0.98]"
    >
      <div className="relative h-16 w-16 shrink-0">
        <img src={app.icon || "/no-logo.webp"} alt={app.title} className="h-full w-full rounded-2xl object-cover" />
        {app.isMod && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-md bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
            MOD
          </div>
        )}
        <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 border-2 border-[#1e2a3b]">
          <RotateCw size={12} className="text-white" />
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <h4 className="truncate font-bold text-white">{app.title}</h4>
          <span className="shrink-0 rounded bg-[#00d084]/20 px-2 py-0.5 text-[10px] font-bold text-[#00d084]">
            UPDATED
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
          <span>Version:{app.version}</span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <span>Size:{app.size}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="text-gray-500">{app.category}</span>
          <span className="flex items-center gap-1 text-[#00d084]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d084]" />
            {app.status}
          </span>
        </div>
      </div>
    </div>
  )
}
