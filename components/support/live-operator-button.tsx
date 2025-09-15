"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

// Live operator CTA; wire to your chat/handoff flow later
export default function LiveOperatorButton({ className = "" }: { className?: string }) {
  const [connecting, setConnecting] = useState(false)

  const onConnect = async () => {
    setConnecting(true)
    try {
      // TODO: integrate AI triage → human handoff here
      await new Promise((r) => setTimeout(r, 800))
      // For now, open the team chat route
      window.location.href = "/communication"
    } finally {
      setConnecting(false)
    }
  }

  return (
    <Button onClick={onConnect} disabled={connecting} className={className + " brand-gradient hover-lift"}>
      <Phone className="w-4 h-4 mr-2" />
      {connecting ? "Connecting..." : "Connect with Live Operator Now"}
    </Button>
  )
}