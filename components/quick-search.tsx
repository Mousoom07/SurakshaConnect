"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const services = [
  { key: "police", label: "Police", href: "/emergency?service=police" },
  { key: "ambulance", label: "Ambulance", href: "/emergency?service=ambulance" },
  { key: "fire", label: "Fire", href: "/emergency?service=fire" },
  { key: "disaster", label: "Disaster Response", href: "/emergency?service=ndrf" },
]

export default function QuickSearch() {
  const [q, setQ] = useState("")
  const [suggestions, setSuggestions] = useState<typeof services>([])

  useEffect(() => {
    const query = q.trim().toLowerCase()
    if (!query) return setSuggestions([])
    setSuggestions(services.filter(s => s.key.includes(query) || s.label.toLowerCase().includes(query)))
  }, [q])

  const go = (href: string) => {
    window.location.href = href
  }

  const match = useMemo(() => {
    const query = q.trim().toLowerCase()
    return services.find(s => s.key === query)
  }, [q])

  return (
    <div className="w-full max-w-xl mx-auto glass-card rounded-xl p-2 flex items-center gap-2">
      <Search className="w-5 h-5 opacity-80 ml-2" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search: Police / Ambulance / Fire"
        className="bg-transparent border-0 focus-visible:ring-0 text-base"
      />
      <Button onClick={() => go((match || suggestions[0] || services[0]).href)} className="brand-gradient">
        Connect
      </Button>
    </div>
  )
}