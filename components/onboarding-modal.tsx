"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function OnboardingModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const seen = localStorage.getItem("onboarding_seen") // ✅ fix
      if (!seen) setOpen(true)
    } catch {}
  }, [])

  const close = () => {
    try {
      localStorage.setItem("onboarding_seen", "1")
    } catch {}
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="glass-card rounded-xl max-w-lg w-[92%] p-6 animate-in fade-in-50 slide-in-from-bottom-2 border border-white/20 shadow-lg">
        <h3 className="text-2xl font-bold mb-2 text-foreground">Welcome to SurakshaConnect</h3>
        <p className="text-sm text-foreground mb-4">
          Quick walkthrough: Use the Quick Search to connect with Police, Ambulance or Fire. Share your
          location in one tap. Explore the dashboard for live updates and tools.
        </p>
        <ul className="list-disc list-inside text-sm text-foreground space-y-1 mb-5">
          <li>Voice SOS and Team Chat are available 24/7</li>
          <li>Your location is only shared during emergencies</li>
          <li>Hindi and English support</li>
        </ul>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={close}>Skip</Button>
          <Button className="brand-gradient" onClick={close}>Start</Button>
        </div>
      </div>
    </div>
  )
}
