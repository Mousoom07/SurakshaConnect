"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function OneTapLocation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shareLocation = () => {
    setError(null)
    if (!navigator.geolocation) {
      setError("Geolocation not supported")
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const url = `/map?lat=${latitude.toFixed(5)}&lng=${longitude.toFixed(5)}`
        window.location.href = url
      },
      (err) => {
        setLoading(false)
        setError(err.message || "Unable to get location")
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button onClick={shareLocation} disabled={loading} className="brand-gradient hover-lift" size="lg">
        <MapPin className="w-5 h-5 mr-2" />
        {loading ? "Detecting..." : "One-Tap Location Share"}
      </Button>
      {error ? <span className="text-xs text-muted-foreground">{error}</span> : null}
    </div>
  )
}