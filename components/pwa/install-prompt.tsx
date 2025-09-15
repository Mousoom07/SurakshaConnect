"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

// PWA install prompt (Add to Home Screen)
export default function InstallPrompt({ className = "" }: { className?: string }) {
  const [deferred, setDeferred] = useState<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferred(e)
      setVisible(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const onInstall = async () => {
    if (!deferred) return
    deferred.prompt()
    const { outcome } = await deferred.userChoice
    setVisible(false)
    if (outcome !== "accepted") setDeferred(null)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-24 right-4 z-[96] glass-card p-3 rounded-xl shadow-lg">
      <div className="text-sm mb-2">Install as App for faster access?</div>
      <div className="flex gap-2">
        <Button size="sm" onClick={onInstall}>
          Install
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setVisible(false)}>
          Later
        </Button>
      </div>
    </div>
  )
}