"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
     setTheme("dark")
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-8 w-14 items-center rounded-full bg-slate-700/50 p-1">
        <div className="h-6 w-6 rounded-full bg-slate-400" />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <div
        className="relative flex h-8 w-14 items-center rounded-full bg-slate-700 p-1 cursor-pointer transition-colors"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div
          className={`h-6 w-6 rounded-full bg-slate-400 transition-transform duration-200 ${theme === "dark" ? "translate-x-0" : "translate-x-6"}`}
        />
        {theme === "dark" ? (
          <Moon size={14} className="absolute right-2 text-blue-400" />
        ) : (
          <Sun size={14} className="absolute left-2 text-yellow-400" />
        )}
      </div>
    </div>
  )
}
