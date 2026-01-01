"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Home, Gamepad2, LayoutGrid, Newspaper, Search, User, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthDialog } from "@/components/auth-dialog"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSearchApks } from "@/hooks/use-apks"

export function Navbar() {
  const { user, logout } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const { results: searchResults, loading: searchLoading } = useSearchApks(searchQuery)

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00d084]">
            <LayoutGrid className="h-6 w-6 text-[#151f2b]" />
          </div> */}
          <img src="/logo.png" alt="" className="h-10 w-10 items-center justify-center rounded-full"/>
          <div>
            <span className="text-xl font-bold text-foreground">Getmodsapk</span>
            <p className="text-[10px] text-muted-foreground">download & enjoy</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive("/") && pathname === "/"
                ? "bg-[#00d084]/20 text-[#00d084]"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span className={isActive("/") && pathname === "/" ? "text-[#00d084]" : "text-muted-foreground"}>
              <Home size={18} />
            </span>
            Home
          </Link>
          <Link
            href="/games"
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive("/games")
                ? "bg-[#00d084]/20 text-[#00d084]"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span className={isActive("/games") ? "text-[#00d084]" : "text-muted-foreground"}>
              <Gamepad2 size={18} />
            </span>
            Games
          </Link>
          <Link
            href="/apps"
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive("/apps")
                ? "bg-[#00d084]/20 text-[#00d084]"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span className={isActive("/apps") ? "text-[#00d084]" : "text-muted-foreground"}>
              <LayoutGrid size={18} />
            </span>
            Apps
          </Link>
          <Link
            href="/blog"
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive("/blog")
                ? "bg-[#00d084]/20 text-[#00d084]"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span className={isActive("/blog") ? "text-[#00d084]" : "text-muted-foreground"}>
              <Newspaper size={18} />
            </span>
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* <ThemeToggle /> */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search size={22} />
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border-2 border-[#00d084]/50 hover:border-[#00d084] transition-colors">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                  <AvatarFallback className="bg-[#00d084] text-[#151f2b] font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                <div className="px-2 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{user.displayName || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Link href="/profile">
                  <DropdownMenuItem className="focus:bg-accent cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> My Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={logout} className="focus:bg-red-500/10 text-red-400 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setShowAuthDialog(true)}
              className="bg-[#00d084] text-[#151f2b] hover:bg-[#00b874] font-bold rounded-full h-9 px-5 shadow-lg shadow-[#00d084]/20"
            >
              Login
            </Button>
          )}
        </div>
      </div>
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20"
          onClick={() => {
            setShowSearch(false)
            setSearchQuery("")
          }}
        >
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <Search className="text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search games, apps..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => {
                  setShowSearch(false)
                  setSearchQuery("")
                }}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                ESC
              </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {searchLoading ? (
                <div className="text-muted-foreground text-center py-8">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/details/${result.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setShowSearch(false)}
                  >
                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-accent">
                      <img
                        src={result.logo || "/placeholder.svg"}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-foreground">{result.title}</span>
                      <p className="text-xs text-muted-foreground">{result.genre}</p>
                    </div>
                  </Link>
                ))
              ) : searchQuery.length > 2 ? (
                <div className="text-muted-foreground text-center py-8">No results found for "{searchQuery}"</div>
              ) : (
                <div className="text-muted-foreground text-sm">Start typing to search...</div>
              )}
            </div>
          </div>
        </div>
      )}
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </header>
  )
}
