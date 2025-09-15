"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, MapPin, Users, Phone, Navigation, RefreshCw } from "lucide-react"

interface ActiveEmergency {
  id: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  location: string
  description: string
  reportedAt: string
  status: "dispatched" | "responding" | "on-scene" | "resolved"
  responders: number
  estimatedResponse: string
  distance: number
}

const mockEmergencies: ActiveEmergency[] = [
  {
    id: "EM-2024-001",
    type: "Medical Emergency",
    severity: "critical",
    location: "123 Main St, Downtown",
    description: "Cardiac arrest reported, CPR in progress",
    reportedAt: "2 minutes ago",
    status: "responding",
    responders: 3,
    estimatedResponse: "1-2 min",
    distance: 0.8,
  },
  {
    id: "EM-2024-002",
    type: "Fire",
    severity: "high",
    location: "456 Oak Ave, Residential",
    description: "Kitchen fire, residents evacuated",
    reportedAt: "8 minutes ago",
    status: "on-scene",
    responders: 6,
    estimatedResponse: "On scene",
    distance: 2.1,
  },
  {
    id: "EM-2024-003",
    type: "Accident",
    severity: "medium",
    location: "789 Highway 101, Mile 15",
    description: "Multi-vehicle collision, minor injuries",
    reportedAt: "15 minutes ago",
    status: "dispatched",
    responders: 4,
    estimatedResponse: "5-8 min",
    distance: 3.5,
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "destructive"
    case "high":
      return "secondary"
    case "medium":
      return "outline"
    case "low":
      return "outline"
    default:
      return "outline"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "dispatched":
      return "outline"
    case "responding":
      return "secondary"
    case "on-scene":
      return "default"
    case "resolved":
      return "outline"
    default:
      return "outline"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "dispatched":
      return "Dispatched"
    case "responding":
      return "Responding"
    case "on-scene":
      return "On Scene"
    case "resolved":
      return "Resolved"
    default:
      return status
  }
}

export function ActiveEmergencies() {
  const [emergencies, setEmergencies] = useState<ActiveEmergency[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate loading emergencies
    setTimeout(() => {
      setEmergencies(mockEmergencies)
      setIsLoading(false)
    }, 1000)

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setLastUpdate(new Date())
    }, 1000)
  }

  const handleViewDetails = (emergency: ActiveEmergency) => {
    // Navigate to emergency details
    console.log("Viewing details for:", emergency.id)
  }

  const handleGetDirections = (emergency: ActiveEmergency) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(emergency.location)}`
    window.open(url, "_blank")
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Active Emergencies
          </CardTitle>
          <CardDescription>Loading active emergency situations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Active Emergencies
            </CardTitle>
            <CardDescription>Real-time emergency situations in your area</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Updated: {lastUpdate.toLocaleTimeString()}</span>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {emergencies.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Active Emergencies</h3>
            <p className="text-muted-foreground">
              All clear in your area. Stay vigilant and report any emergencies immediately.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {emergencies.map((emergency) => (
              <div key={emergency.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{emergency.type}</h4>
                      <Badge variant={getSeverityColor(emergency.severity)}>{emergency.severity.toUpperCase()}</Badge>
                      <Badge variant={getStatusColor(emergency.status)}>{getStatusText(emergency.status)}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {emergency.distance}km away
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {emergency.reportedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {emergency.responders} responders
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{emergency.location}</p>
                    <p className="text-sm">{emergency.description}</p>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">ETA:</span>
                      <span className="font-medium">{emergency.estimatedResponse}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(emergency)}>
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleGetDirections(emergency)}>
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                  {emergency.severity === "critical" && (
                    <Button size="sm" variant="destructive">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 911
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
