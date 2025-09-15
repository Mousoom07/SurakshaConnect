"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  AlertTriangle,
  Heart,
  Shield,
  Users,
  Search,
  RefreshCw,
  Layers,
  ZoomIn,
  ZoomOut,
  Navigation,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MapLocation {
  id: string
  type: "emergency" | "resource" | "responder"
  lat: number
  lng: number
  title: string
  description: string
  urgency?: "low" | "medium" | "high" | "critical"
  status?: "pending" | "assigned" | "in-progress" | "resolved"
  category?: "medical" | "shelter" | "food" | "evacuation" | "other"
  timestamp: Date
  assignedTeam?: string
  capacity?: number
  available?: number
}

const mockLocations: MapLocation[] = [
  {
    id: "em-001",
    type: "emergency",
    lat: 40.7128,
    lng: -74.006,
    title: "Building Collapse - Main Street",
    description: "Person trapped with possible broken leg",
    urgency: "critical",
    status: "pending",
    category: "medical",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "em-002",
    type: "emergency",
    lat: 40.7589,
    lng: -73.9851,
    title: "Flood Evacuation - Riverside",
    description: "Family of 4 needs immediate shelter",
    urgency: "high",
    status: "assigned",
    category: "shelter",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    assignedTeam: "Team Alpha",
  },
  {
    id: "res-001",
    type: "resource",
    lat: 40.7505,
    lng: -73.9934,
    title: "Emergency Shelter - Community Center",
    description: "Temporary housing and basic supplies",
    capacity: 100,
    available: 45,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "res-002",
    type: "resource",
    lat: 40.7282,
    lng: -73.7949,
    title: "Medical Station - Hospital Parking",
    description: "Field medical treatment and triage",
    capacity: 50,
    available: 12,
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "resp-001",
    type: "responder",
    lat: 40.7614,
    lng: -73.9776,
    title: "Rescue Team Alpha",
    description: "Search and rescue operations",
    status: "in-progress",
    assignedTeam: "Team Alpha",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: "resp-002",
    type: "responder",
    lat: 40.7831,
    lng: -73.9712,
    title: "Medical Response Unit",
    description: "Emergency medical services",
    status: "pending",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
]

export function CrisisMap() {
  const [locations, setLocations] = useState<MapLocation[]>(mockLocations)
  const [filteredLocations, setFilteredLocations] = useState<MapLocation[]>(mockLocations)
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all")
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 })
  const [zoomLevel, setZoomLevel] = useState(12)
  const [showLayers, setShowLayers] = useState({
    emergencies: true,
    resources: true,
    responders: true,
  })

  useEffect(() => {
    let filtered = locations

    if (searchTerm) {
      filtered = filtered.filter(
        (loc) =>
          loc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((loc) => loc.type === typeFilter)
    }

    if (urgencyFilter !== "all") {
      filtered = filtered.filter((loc) => loc.urgency === urgencyFilter)
    }

    // Apply layer visibility
    filtered = filtered.filter((loc) => {
      if (loc.type === "emergency") return showLayers.emergencies
      if (loc.type === "resource") return showLayers.resources
      if (loc.type === "responder") return showLayers.responders
      return true
    })

    setFilteredLocations(filtered)
  }, [locations, searchTerm, typeFilter, urgencyFilter, showLayers])

  const getLocationIcon = (location: MapLocation) => {
    switch (location.type) {
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />
      case "resource":
        return location.title.includes("Medical") ? <Heart className="w-4 h-4" /> : <Shield className="w-4 h-4" />
      case "responder":
        return <Users className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const getLocationColor = (location: MapLocation) => {
    if (location.type === "emergency") {
      switch (location.urgency) {
        case "critical":
          return "bg-destructive text-destructive-foreground"
        case "high":
          return "bg-accent text-accent-foreground"
        case "medium":
          return "bg-secondary text-secondary-foreground"
        default:
          return "bg-muted text-muted-foreground"
      }
    }
    if (location.type === "resource") {
      return "bg-primary text-primary-foreground"
    }
    if (location.type === "responder") {
      return "bg-green-500 text-white"
    }
    return "bg-muted text-muted-foreground"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-accent text-accent-foreground"
      case "assigned":
        return "bg-secondary text-secondary-foreground"
      case "in-progress":
        return "bg-primary text-primary-foreground"
      case "resolved":
        return "bg-green-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60))
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ${minutes % 60}m ago`
  }

  const centerOnLocation = (location: MapLocation) => {
    setMapCenter({ lat: location.lat, lng: location.lng })
    setSelectedLocation(location)
  }

  const stats = {
    emergencies: locations.filter((l) => l.type === "emergency").length,
    resources: locations.filter((l) => l.type === "resource").length,
    responders: locations.filter((l) => l.type === "responder").length,
    critical: locations.filter((l) => l.urgency === "critical").length,
  }

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Live Crisis Map
              </CardTitle>
              <CardDescription>Real-time visualization of emergency requests and response resources</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm" variant="outline">
                <Navigation className="w-4 h-4 mr-2" />
                My Location
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="emergency">Emergencies</SelectItem>
                <SelectItem value="resource">Resources</SelectItem>
                <SelectItem value="responder">Responders</SelectItem>
              </SelectContent>
            </Select>

            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map Container */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      {/* Mock street grid */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                </div>

                {/* Map Markers */}
                {filteredLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className={cn(
                      "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110",
                      selectedLocation?.id === location.id && "scale-125 z-10",
                    )}
                    style={{
                      left: `${20 + (index % 5) * 15}%`,
                      top: `${20 + Math.floor(index / 5) * 20}%`,
                    }}
                    onClick={() => centerOnLocation(location)}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white",
                        getLocationColor(location),
                      )}
                    >
                      {getLocationIcon(location)}
                    </div>
                    {selectedLocation?.id === location.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-2 shadow-lg min-w-48 z-20">
                        <h4 className="font-medium text-sm">{location.title}</h4>
                        <p className="text-xs text-muted-foreground">{location.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {location.urgency && (
                            <Badge className={cn("text-xs", getLocationColor(location))}>
                              {location.urgency.toUpperCase()}
                            </Badge>
                          )}
                          {location.status && (
                            <Badge variant="outline" className={cn("text-xs", getStatusColor(location.status))}>
                              {location.status.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button size="sm" variant="secondary" onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setZoomLevel(Math.max(8, zoomLevel - 1))}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowLayers((prev) => ({ ...prev, emergencies: !prev.emergencies }))}
                    className={cn(!showLayers.emergencies && "opacity-50")}
                  >
                    <Layers className="w-4 h-4" />
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
                  <h4 className="font-medium text-sm mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-2 h-2 text-destructive-foreground" />
                      </div>
                      <span>Critical Emergency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <Shield className="w-2 h-2 text-primary-foreground" />
                      </div>
                      <span>Resource Center</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Users className="w-2 h-2 text-white" />
                      </div>
                      <span>Response Team</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Layer Controls */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Map Layers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="emergencies"
                    checked={showLayers.emergencies}
                    onChange={(e) => setShowLayers((prev) => ({ ...prev, emergencies: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="emergencies" className="text-sm font-medium">
                    Emergencies ({stats.emergencies})
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="resources"
                    checked={showLayers.resources}
                    onChange={(e) => setShowLayers((prev) => ({ ...prev, resources: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="resources" className="text-sm font-medium">
                    Resources ({stats.resources})
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="responders"
                    checked={showLayers.responders}
                    onChange={(e) => setShowLayers((prev) => ({ ...prev, responders: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="responders" className="text-sm font-medium">
                    Responders ({stats.responders})
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location List */}
        <div className="space-y-4">
          {/* Stats */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Live Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">{stats.critical}</p>
                  <p className="text-sm text-muted-foreground">Critical</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{stats.emergencies}</p>
                  <p className="text-sm text-muted-foreground">Emergencies</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{stats.resources}</p>
                  <p className="text-sm text-muted-foreground">Resources</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{stats.responders}</p>
                  <p className="text-sm text-muted-foreground">Teams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location List */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Locations ({filteredLocations.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={cn(
                    "p-3 border border-border rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                    selectedLocation?.id === location.id && "bg-muted",
                  )}
                  onClick={() => centerOnLocation(location)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          getLocationColor(location),
                        )}
                      >
                        {getLocationIcon(location)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{location.title}</h4>
                        <p className="text-xs text-muted-foreground">{location.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {location.urgency && (
                            <Badge className={cn("text-xs", getLocationColor(location))}>
                              {location.urgency.toUpperCase()}
                            </Badge>
                          )}
                          {location.status && (
                            <Badge variant="outline" className={cn("text-xs", getStatusColor(location.status))}>
                              {location.status.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                        {location.capacity && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Capacity: {location.available}/{location.capacity}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTimeAgo(location.timestamp)}</span>
                  </div>
                </div>
              ))}

              {filteredLocations.length === 0 && (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No locations found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
