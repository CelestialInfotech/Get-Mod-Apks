"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { useParams, useRouter } from "next/navigation"
import { Star, Download, ShieldCheck, Share2, Info, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RewardAdModal } from "@/components/reward-ad-modal"
import { useApkDetail, useSimilarApks } from "@/hooks/use-apks"
import { UpdatedListCard } from "@/components/updated-list-card"

export default function DetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [showAdModal, setShowAdModal] = React.useState(false)

  const { data: app, loading, error } = useApkDetail(id as string)
  const { apks: similarApks, loading: similarLoading } = useSimilarApks(id as string)

  const handleDownloadClick = () => {
    setShowAdModal(true)
  }

  const handleReward = () => {
    if (app?.download) {
      window.open(app.download, "_blank")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-card/50 rounded-3xl" />
            <div className="h-64 bg-card/50 rounded-3xl" />
            <div className="h-96 bg-card/50 rounded-3xl" />
          </div>
        </main>
      </div>
    )
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">Failed to load app details</p>
            <Button onClick={() => router.back()} className="mt-4">
              Go Back
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const modFeatures = app.mod_info ? app.mod_info.split(",").map((s) => s.trim()) : ["Mod Features Available"]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row gap-6 bg-card p-6 rounded-3xl border border-border">
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-3xl shadow-2xl">
                <img src={app.logo || "/placeholder.svg"} alt={app.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{app.title}</h1>
                  <p className="text-[#00d084] font-medium mt-1">{app.publisher}</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-foreground">{app.rating || 4.5}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download size={16} />
                    <span>{app.downloads || "1M+"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={16} className="text-blue-400" />
                    <span className="text-blue-400 font-medium">Verified Safe</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-center sm:w-48">
                <Button
                  onClick={handleDownloadClick}
                  className="bg-[#00d084] text-[#151f2b] hover:bg-[#00b874] font-bold h-12 rounded-xl text-lg shadow-lg shadow-[#00d084]/20"
                >
                  <Download className="mr-2 h-5 w-5" /> Download
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-accent text-foreground rounded-xl h-10 bg-transparent"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>

            {/* Screenshots */}
            {app.screenshots && app.screenshots.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Info size={20} className="text-[#00d084]" />
                  Screenshots
                </h3>

                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {app.screenshots.map((img, i) => (
                    <div
                      key={i}
                      className="
            relative
            h-[420px]
            w-[210px]
            sm:h-[480px]
            sm:w-[240px]
            rounded-2xl
            overflow-hidden
            border
            border-border
            bg-black
            shadow-xl
            shrink-0
          "
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Screenshot ${i + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Description */}
            <div className="bg-card p-8 rounded-3xl border border-border space-y-4">
              <h3 className="text-xl font-bold">About this {app.category === "Games" ? "game" : "app"}</h3>
              <div
                className="text-muted-foreground leading-relaxed text-lg prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: app.description }}
              />
            </div>

            {/* Similar Apps Section */}
            {similarApks.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Similar {app.category === "Games" ? "Games" : "Apps"}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarApks.map((similar) => (
                    <UpdatedListCard
                      key={similar.id}
                      app={{
                        id: similar.id,
                        title: similar.title,
                        category: similar.genre,
                        size: similar.size,
                        version: similar.version,
                        status: similar.mod_info,
                        icon: similar.logo,
                        isMod: true,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Mod Info */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-3xl border border-border shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#00d084]">
                <ShieldCheck size={20} /> Mod Features
              </h3>
              <ul className="space-y-3">
                {modFeatures.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-foreground bg-accent/50 p-3 rounded-xl border border-border"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#00d084]" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border shadow-xl">
              <h3 className="text-lg font-bold mb-4">Information</h3>
              <div className="space-y-4">
                {[
                  { label: "Version", value: app.version },
                  { label: "Size", value: app.size },
                  { label: "Category", value: app.category },
                  { label: "Genre", value: app.genre },
                  { label: "Publisher", value: app.publisher },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-muted-foreground text-sm">{item.label}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {app.get_it_on && (
              <a
                href={app.get_it_on}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-card p-4 rounded-2xl border border-border hover:border-[#00d084] transition-colors text-center"
              >
                <p className="text-sm text-muted-foreground mb-2">Also available on</p>
                <p className="font-bold text-[#00d084]">Google Play Store</p>
              </a>
            )}
          </div>
        </div>
      </main>

      <RewardAdModal open={showAdModal} onOpenChange={setShowAdModal} onReward={handleReward} appName={app.title} />
    </div>
  )
}
