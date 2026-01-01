"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, Download } from "lucide-react"

interface RewardAdModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReward: () => void
  appName: string
}

export function RewardAdModal({ open, onOpenChange, onReward, appName }: RewardAdModalProps) {
  const [progress, setProgress] = React.useState(0)
  const [isWatching, setIsWatching] = React.useState(false)
  const [isRewarded, setIsRewarded] = React.useState(false)

  const startAd = () => {
    setIsWatching(true)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRewarded(true)
          setIsWatching(false)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleDownload = () => {
    onReward()
    onOpenChange(false)
    // Reset state for next time
    setTimeout(() => {
      setProgress(0)
      setIsRewarded(false)
      setIsWatching(false)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#1a2635] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Watch Ad to Download</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          {!isWatching && !isRewarded ? (
            <>
              <div className="w-20 h-20 rounded-full bg-[#00d084]/20 flex items-center justify-center text-[#00d084]">
                <PlayCircle size={48} />
              </div>
              <p className="text-center text-gray-300">
                Watch a short video to unlock the direct download link for{" "}
                <span className="text-white font-bold">{appName}</span>.
              </p>
              <Button
                onClick={startAd}
                className="w-full bg-[#00d084] text-[#151f2b] hover:bg-[#00b874] font-bold py-6 rounded-xl"
              >
                Watch Ad
              </Button>
            </>
          ) : isWatching ? (
            <>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Watching Reward Ad...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3 bg-white/10" />
              </div>
              <div className="aspect-video w-full bg-black/40 rounded-xl flex items-center justify-center border border-white/5 italic text-gray-500">
                [ Ad Content Placeholder ]
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <Download size={48} />
              </div>
              <p className="text-center text-gray-300 font-medium">Reward Unlocked! You can now download your file.</p>
              <Button
                onClick={handleDownload}
                className="w-full bg-[#00d084] text-[#151f2b] hover:bg-[#00b874] font-bold py-6 rounded-xl"
              >
                Download Now
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
