"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ExitIntent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem("exit-intent-shown")) return

    const onMouseOut = (e: MouseEvent) => {
      // Top edge or leaving window
      if ((e.clientY <= 0 || e.relatedTarget === null) && !open) {
        setOpen(true)
        sessionStorage.setItem("exit-intent-shown", "1")
      }
    }

    document.addEventListener("mouseout", onMouseOut)
    return () => document.removeEventListener("mouseout", onMouseOut)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Emergency help is just one click away 🚨</DialogTitle>
          <DialogDescription>
            Need assistance now? Our AI triage and live operators are available 24x7.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
          <Link href="/dashboard">
            <Button className="brand-gradient button-press">Access Dashboard</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}