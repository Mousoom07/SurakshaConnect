"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Map, MapPin, AlertTriangle, Users, Navigation, Layers } from "lucide-react"

interface MapMarker {
  id: string
  type: "emergency" | "police" | "hospital" | "user"
  title: string
  coordinates: { lat: number; lng: number }
  status?: string
  description?: string
}

const mockMarkers: MapMarker[] = [
  {
    id: "user",
    type: "user",
    title: "Your Location",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "emergency1",
    type: "emergency",
    title: "Medical Emergency",
    coordinates: { lat: 40.715, lng: -74.008 },
    status: "active",
    description: "Cardiac arrest reported",
  },
  {
    id: "police1",
    type: "police",
    title: "Central Police Station",
    coordinates: { lat: 40.71, lng: -74.004 },
    status: "available",
  },
  {
    id: "hospital1",
    type: "hospital",
    title: "City General Hospital",
    coordinates: { lat: 40.72, lng: -74.01 },
    status: "available",
  },
]

export function EmergencyMap() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null)
  const [mapView, setMapView] = useState<"satellite" | "street">("street")

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "police":
        return <Users className="h-4 w-4 text-primary" />
      case "hospital":
        return <MapPin className="h-4 w-4 text-secondary" />
      case "user":
        return <Navigation className="h-4 w-4 text-accent" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "destructive"
      case "police":
        return "outline"
      case "hospital":
        return "secondary"
      case "user":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          Emergency Response Map
        </CardTitle>
        <CardDescription>Real-time view of emergencies, response teams, and nearby services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={mapView === "street" ? "default" : "outline"}
              onClick={() => setMapView("street")}
            >
              Street View
            </Button>
            <Button
              size="sm"
              variant={mapView === "satellite" ? "default" : "outline"}
              onClick={() => setMapView("satellite")}
            >
              <Layers className="h-4 w-4 mr-2" />
              Satellite
            </Button>
          </div>
          <Badge variant="outline">Live Updates</Badge>
        </div>

        {/* Simulated Map Area */}
        <div className="relative bg-muted rounded-lg h-96 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Street lines */}
                <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="2" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="2" />
                <line x1="100" y1="0" x2="100" y2="300" stroke="currentColor" strokeWidth="2" />
                <line x1="200" y1="0" x2="200" y2="300" stroke="currentColor" strokeWidth="2" />
                <line x1="300" y1="0" x2="300" y2="300" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Map Markers */}
          {mockMarkers.map((marker, index) => (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${25 + index * 20}%`,
                top: `${30 + index * 15}%`,
              }}
              onClick={() => setSelectedMarker(marker)}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  {getMarkerIcon(marker.type)}
                </div>
                {marker.status === "active" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Marker Info */}
        {selectedMarker && (
          <Card className="border-primary">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getMarkerIcon(selectedMarker.type)}
                    <h4 className="font-medium">{selectedMarker.title}</h4>
                    {selectedMarker.status && (
                      <Badge variant={getMarkerColor(selectedMarker.type)}>{selectedMarker.status}</Badge>
                    )}
                  </div>
                  {selectedMarker.description && (
                    <p className="text-sm text-muted-foreground">{selectedMarker.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Coordinates: {selectedMarker.coordinates.lat.toFixed(4)},{" "}
                    {selectedMarker.coordinates.lng.toFixed(4)}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Map Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
              <AlertTriangle className="h-2 w-2 text-white" />
            </div>
            <span>Emergency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <Users className="h-2 w-2 text-white" />
            </div>
            <span>Police</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
              <MapPin className="h-2 w-2 text-white" />
            </div>
            <span>Hospital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <Navigation className="h-2 w-2 text-white" />
            </div>
            <span>Your Location</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
