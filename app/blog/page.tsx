"use client"

import { Navbar } from "@/components/navbar"
import { Newspaper, Calendar, User } from "lucide-react"

const POSTS = [
  {
    id: "1",
    title: "What is XAPK and How to Install XAPK?",
    date: "Apr 10, 2025",
    author: "Admin",
    excerpt: "Think of XAPK as a supercharged APK file. It's not just the app but also all the extra stuff like game levels, graphics, and sounds, all wrapped up in one neat package. This means you get everything in one shot, avoiding the need to download more stuff after you've installed the app.",
    image: "/how-to-install-xapk.jpg",
  },
  {
    id: "2",
    title: "How to install Mod Apk with OBB?",
    date: "Apr 10, 2025",
    author: "Security Team",
    excerpt:
      "Here, in this article, we will let you know how to install the Mod Apk?; what are OBB files? Why do we need them? And after all, how to install Mod Apk with OBB with files?. so be on while discovering their explanation.",
    image: "/how-to-install-apks.webp",
  },
  {
    id: "3",
    title: "Vidmate PRO APK",
    date: "Apr 10, 2025",
    author: "App Team",
    excerpt:
      "Network connectivity won't allow us to watch or enjoy any content online at some places and times. So it's better, maybe while traveling, to have the content stored in the device for offline usage, so there is no disturbance due to connectivity.",
    image: "/vidmate-mod-apk.webp",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#151f2b] text-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
            <Newspaper size={24} />
          </div>
          <h2 className="text-3xl font-bold">Blog</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-[#1e2a3b] rounded-3xl overflow-hidden border border-white/5 group hover:border-[#00d084]/30 transition-all cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} /> {post.author}
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-[#00d084] transition-colors">{post.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
