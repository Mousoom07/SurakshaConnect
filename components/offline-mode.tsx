"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WifiOff, Wifi, Download, Upload, AlertTriangle, Heart, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface OfflineRequest {
  id: string
  type: "medical" | "shelter" | "food" | "evacuation" | "other"
  description: string
  location: string
  timestamp: Date
  synced: boolean
}

export function OfflineMode() {
  const [isOnline, setIsOnline] = useState(true)
  const [offlineRequests, setOfflineRequests] = useState<OfflineRequest[]>([])
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load offline requests from localStorage
    const saved = localStorage.getItem("crisisconnect-offline-requests")
    if (saved) {
      setOfflineRequests(JSON.parse(saved))
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    // Auto-sync when coming back online
    if (isOnline && offlineRequests.some((req) => !req.synced)) {
      syncOfflineRequests()
    }
  }, [isOnline])

  const saveOfflineRequest = (request: Omit<OfflineRequest, "id" | "timestamp" | "synced">) => {
    const newRequest: OfflineRequest = {
      ...request,
      id: Date.now().toString(),
      timestamp: new Date(),
      synced: false,
    }

    const updated = [...offlineRequests, newRequest]
    setOfflineRequests(updated)
    localStorage.setItem("crisisconnect-offline-requests", JSON.stringify(updated))
  }

  const syncOfflineRequests = async () => {
    const unsyncedRequests = offlineRequests.filter((req) => !req.synced)

    for (const request of unsyncedRequests) {
      try {
        // Mock API call - in production, sync with server
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mark as synced
        const updated = offlineRequests.map((req) => (req.id === request.id ? { ...req, synced: true } : req))
        setOfflineRequests(updated)
        localStorage.setItem("crisisconnect-offline-requests", JSON.stringify(updated))
      } catch (error) {
        console.error("Failed to sync request:", request.id)
      }
    }
  }

  const offlineGuides = {
    earthquake: {
      title: "Earthquake Safety",
      steps: [
        "Drop to hands and knees immediately",
        "Take cover under a sturdy desk or table",
        "Hold on to your shelter and protect your head",
        "Stay away from windows and heavy objects",
        "If outdoors, move away from buildings and power lines",
        "After shaking stops, check for injuries and hazards",
      ],
    },
    fire: {
      title: "Fire Emergency",
      steps: [
        "Get low and crawl under smoke",
        "Feel doors before opening - if hot, find another way",
        "Close doors behind you to slow fire spread",
        "Call for help once you're safely outside",
        "Never use elevators during a fire",
        "Meet at your designated meeting point",
      ],
    },
    flood: {
      title: "Flood Safety",
      steps: [
        "Move to higher ground immediately",
        "Avoid walking in moving water",
        "Stay away from downed power lines",
        "Do not drive through flooded roads",
        "Listen to emergency broadcasts for updates",
        "Have emergency supplies ready",
      ],
    },
    medical: {
      title: "Basic First Aid",
      steps: [
        "Check if person is conscious and breathing",
        "Call for emergency help if possible",
        "Control bleeding with direct pressure",
        "Keep injured person warm and still",
        "Do not move someone with potential spinal injury",
        "Monitor breathing and pulse regularly",
      ],
    },
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Alert className={cn("border-2", isOnline ? "border-green-500 bg-green-50" : "border-amber-500 bg-amber-50")}>
        <div className="flex items-center gap-2">
          {isOnline ? <Wifi className="w-4 h-4 text-green-600" /> : <WifiOff className="w-4 h-4 text-amber-600" />}
          <AlertDescription className={isOnline ? "text-green-800" : "text-amber-800"}>
            {isOnline ? "Online - Full features available" : "Offline Mode - Basic survival guidance available"}
          </AlertDescription>
        </div>
      </Alert>

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guides">Offline Guides</TabsTrigger>
          <TabsTrigger value="requests">Saved Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Emergency Survival Guides
              </CardTitle>
              <CardDescription>
                Essential safety instructions available offline when network connectivity is poor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(offlineGuides).map(([key, guide]) => (
                  <Card
                    key={key}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md border-border",
                      selectedGuide === key && "ring-2 ring-primary",
                    )}
                    onClick={() => setSelectedGuide(selectedGuide === key ? null : key)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        {key === "earthquake" && <AlertTriangle className="w-5 h-5 text-accent" />}
                        {key === "fire" && <AlertTriangle className="w-5 h-5 text-destructive" />}
                        {key === "flood" && <Shield className="w-5 h-5 text-primary" />}
                        {key === "medical" && <Heart className="w-5 h-5 text-secondary" />}
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                      </div>
                    </CardHeader>
                    {selectedGuide === key && (
                      <CardContent className="pt-0">
                        <ol className="space-y-2">
                          {guide.steps.map((step, index) => (
                            <li key={index} className="flex gap-3">
                              <Badge
                                variant="outline"
                                className="min-w-[24px] h-6 flex items-center justify-center text-xs"
                              >
                                {index + 1}
                              </Badge>
                              <span className="text-sm text-foreground">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Emergency Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Save Emergency Request</CardTitle>
              <CardDescription>
                Record your emergency details offline - will sync automatically when connection is restored
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  saveOfflineRequest({
                    type: formData.get("type") as any,
                    description: formData.get("description") as string,
                    location: formData.get("location") as string,
                  })
                  e.currentTarget.reset()
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Emergency Type</label>
                    <select name="type" required className="w-full p-2 border border-border rounded-md bg-background">
                      <option value="medical">Medical</option>
                      <option value="shelter">Shelter</option>
                      <option value="food">Food & Water</option>
                      <option value="evacuation">Evacuation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                    <input
                      name="location"
                      type="text"
                      placeholder="Your location"
                      required
                      className="w-full p-2 border border-border rounded-md bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                  <textarea
                    name="description"
                    placeholder="Describe your emergency situation..."
                    required
                    className="w-full p-2 border border-border rounded-md bg-background min-h-[80px] resize-none"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Save Request Offline
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Offline Requests ({offlineRequests.length})
              </CardTitle>
              <CardDescription>
                Emergency requests saved offline - will sync when connection is restored
              </CardDescription>
            </CardHeader>
            <CardContent>
              {offlineRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No offline requests saved</div>
              ) : (
                <div className="space-y-4">
                  {offlineRequests.map((request) => (
                    <Card key={request.id} className="border-border">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={request.synced ? "default" : "secondary"}>
                              {request.type.toUpperCase()}
                            </Badge>
                            {request.synced ? (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Synced
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-amber-600 border-amber-600">
                                Pending
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{request.timestamp.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-foreground mb-1">{request.description}</p>
                        <p className="text-xs text-muted-foreground">Location: {request.location}</p>
                      </CardContent>
                    </Card>
                  ))}

                  {isOnline && offlineRequests.some((req) => !req.synced) && (
                    <Button onClick={syncOfflineRequests} className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Sync All Requests
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
