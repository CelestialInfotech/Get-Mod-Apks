"use client"

import { Navbar } from "@/components/navbar"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Calendar, LogOut, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#151f2b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00d084] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#151f2b] text-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto bg-[#1a2635] border-white/10 text-gray-100 shadow-2xl">
          <CardHeader className="flex flex-col items-center gap-4 pb-8 border-b border-white/5">
            <div className="relative">
              <Avatar className="h-28 w-28 border-4 border-[#00d084] shadow-[0_0_25px_rgba(0,208,132,0.4)]">
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                <AvatarFallback className="text-4xl bg-[#00d084] text-[#151f2b] font-bold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-10 w-10 rounded-full bg-[#00d084] flex items-center justify-center shadow-lg">
                <Shield size={20} className="text-[#151f2b]" fill="currentColor" />
              </div>
            </div>
            <div className="text-center">
              <CardTitle className="text-3xl font-bold">{user.displayName || "Anonymous User"}</CardTitle>
              <p className="text-gray-400 mt-2 font-mono text-sm">ID: {user.uid.slice(0, 8).toUpperCase()}</p>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <Mail size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email Address</p>
                <p className="font-medium text-gray-100">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-500/20 text-green-400">
                <Calendar size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Member Since</p>
                <p className="font-medium text-gray-100">
                  {new Date(user.metadata.creationTime || "").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <Button
              onClick={logout}
              variant="destructive"
              className="w-full h-12 rounded-xl font-bold flex items-center justify-center gap-3 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
            >
              <LogOut size={20} /> Logout from Account
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
