"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Radio, Send, MapPin, Clock, Users, AlertTriangle, CheckCircle, Smartphone, Tv } from "lucide-react"
import { cn } from "@/lib/utils"

interface Broadcast {
  id: string
  title: string
  message: string
  severity: "info" | "warning" | "critical" | "extreme"
  type: "evacuation" | "shelter" | "weather" | "medical" | "general"
  targetArea: string
  radius: number
  channels: string[]
  timestamp: Date
  status: "draft" | "sending" | "sent" | "failed"
  recipientCount: number
  deliveryStats: {
    sent: number
    delivered: number
    failed: number
  }
  evacuationRoutes?: string[]
  shelterLocations?: string[]
}

interface BroadcastTemplate {
  id: string
  name: string
  type: string
  severity: string
  template: string
}

export function EmergencyBroadcastSystem() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [templates, setTemplates] = useState<BroadcastTemplate[]>([])
  const [newBroadcast, setNewBroadcast] = useState({
    title: "",
    message: "",
    severity: "warning" as const,
    type: "general" as const,
    targetArea: "",
    radius: 5,
    channels: [] as string[],
  })
  const [selectedBroadcast, setSelectedBroadcast] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "extreme":
        return "bg-red-600 text-white"
      case "critical":
        return "bg-red-500 text-white"
      case "warning":
        return "bg-orange-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500 text-white"
      case "sending":
        return "bg-blue-500 text-white"
      case "failed":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const sendBroadcast = async (broadcastId?: string) => {
    if (broadcastId) {
      // Send existing broadcast
      setBroadcasts((prev) => prev.map((bc) => (bc.id === broadcastId ? { ...bc, status: "sending" as const } : bc)))

      // Simulate sending process
      setTimeout(() => {
        setBroadcasts((prev) =>
          prev.map((bc) =>
            bc.id === broadcastId
              ? {
                  ...bc,
                  status: "sent" as const,
                  deliveryStats: {
                    sent: bc.recipientCount,
                    delivered: Math.floor(bc.recipientCount * 0.95),
                    failed: Math.floor(bc.recipientCount * 0.05),
                  },
                }
              : bc,
          ),
        )
      }, 3000)
    } else {
      // Create and send new broadcast
      if (!newBroadcast.title || !newBroadcast.message || !newBroadcast.targetArea) return

      setIsCreating(true)
      const broadcast: Broadcast = {
        id: `bc-${Date.now()}`,
        ...newBroadcast,
        timestamp: new Date(),
        status: "sending",
        recipientCount: Math.floor(Math.random() * 20000) + 5000,
        deliveryStats: { sent: 0, delivered: 0, failed: 0 },
      }

      setBroadcasts((prev) => [broadcast, ...prev])

      // Simulate sending
      setTimeout(() => {
        setBroadcasts((prev) =>
          prev.map((bc) =>
            bc.id === broadcast.id
              ? {
                  ...bc,
                  status: "sent" as const,
                  deliveryStats: {
                    sent: bc.recipientCount,
                    delivered: Math.floor(bc.recipientCount * 0.95),
                    failed: Math.floor(bc.recipientCount * 0.05),
                  },
                }
              : bc,
          ),
        )
        setIsCreating(false)
        setNewBroadcast({
          title: "",
          message: "",
          severity: "warning",
          type: "general",
          targetArea: "",
          radius: 5,
          channels: [],
        })
      }, 3000)
    }
  }

  const toggleChannel = (channel: string) => {
    setNewBroadcast((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }))
  }

  useEffect(() => {
    // Mock data for demonstration
    const mockBroadcasts: Broadcast[] = [
      {
        id: "bc-001",
        title: "Flash Flood Warning - Immediate Evacuation",
        message:
          "URGENT: Flash flood warning in effect for downtown area. Water levels rising rapidly. Evacuate immediately to higher ground. Use Route 15 North or Highway 42 East. Avoid low-lying areas and underpasses.",
        severity: "extreme",
        type: "evacuation",
        targetArea: "Downtown District",
        radius: 3,
        channels: ["SMS", "Push", "Radio", "TV"],
        timestamp: new Date(Date.now() - 300000),
        status: "sent",
        recipientCount: 15420,
        deliveryStats: {
          sent: 15420,
          delivered: 14890,
          failed: 530,
        },
        evacuationRoutes: ["Route 15 North", "Highway 42 East", "Main Street Bridge"],
        shelterLocations: ["Community Center", "High School Gymnasium", "City Hall"],
      },
      {
        id: "bc-002",
        title: "Shelter-in-Place Order - Chemical Spill",
        message:
          "Chemical spill reported at Industrial Complex. Shelter-in-place order for 2-mile radius. Close all windows and doors. Turn off ventilation systems. Monitor local news for updates.",
        severity: "critical",
        type: "shelter",
        targetArea: "Industrial District",
        radius: 2,
        channels: ["SMS", "Push", "Radio"],
        timestamp: new Date(Date.now() - 180000),
        status: "sending",
        recipientCount: 8750,
        deliveryStats: {
          sent: 6200,
          delivered: 5890,
          failed: 310,
        },
      },
      {
        id: "bc-003",
        title: "Severe Weather Alert",
        message:
          "Severe thunderstorm warning with possible tornadoes. Seek shelter in interior rooms on lowest floor. Avoid windows. Stay tuned for updates.",
        severity: "warning",
        type: "weather",
        targetArea: "County-wide",
        radius: 25,
        channels: ["Push", "Radio", "TV"],
        timestamp: new Date(Date.now() - 60000),
        status: "draft",
        recipientCount: 0,
        deliveryStats: {
          sent: 0,
          delivered: 0,
          failed: 0,
        },
      },
    ]

    const mockTemplates: BroadcastTemplate[] = [
      {
        id: "tpl-001",
        name: "Evacuation Order",
        type: "evacuation",
        severity: "extreme",
        template:
          "URGENT EVACUATION ORDER: {disaster_type} in {area}. Evacuate immediately via {routes}. Proceed to {shelters}. Do not delay.",
      },
      {
        id: "tpl-002",
        name: "Shelter-in-Place",
        type: "shelter",
        severity: "critical",
        template:
          "SHELTER-IN-PLACE ORDER: {threat} reported in {area}. Stay indoors. Close windows and doors. Turn off ventilation. Monitor updates.",
      },
      {
        id: "tpl-003",
        name: "Weather Warning",
        type: "weather",
        severity: "warning",
        template: "WEATHER ALERT: {weather_type} expected in {area}. {safety_instructions}. Stay informed.",
      },
      {
        id: "tpl-004",
        name: "Medical Emergency",
        type: "medical",
        severity: "critical",
        template:
          "MEDICAL EMERGENCY: {medical_situation} in {area}. {medical_instructions}. Seek immediate medical attention if affected.",
      },
    ]

    setBroadcasts(mockBroadcasts)
    setTemplates(mockTemplates)
  }, [])

  const useTemplate = (template: BroadcastTemplate) => {
    setNewBroadcast((prev) => ({
      ...prev,
      title: template.name,
      message: template.template,
      severity: template.severity as any,
      type: template.type as any,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Active Broadcasts</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {broadcasts.filter((b) => b.status === "sending" || b.status === "sent").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">People Reached</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {broadcasts.reduce((sum, b) => sum + b.deliveryStats.delivered, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">Delivery Rate</span>
            </div>
            <div className="text-2xl font-bold text-foreground">96.2%</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Avg Send Time</span>
            </div>
            <div className="text-2xl font-bold text-foreground">2.3s</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Broadcast</TabsTrigger>
          <TabsTrigger value="active">Active Broadcasts</TabsTrigger>
          <TabsTrigger value="history">Broadcast History</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          {/* Templates */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>Pre-configured emergency broadcast templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="border-border cursor-pointer hover:shadow-md transition-all"
                    onClick={() => {
                      setNewBroadcast((prev) => ({
                        ...prev,
                        title: template.name,
                        message: template.template,
                        severity: template.severity as any,
                        type: template.type as any,
                      }))
                    }}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">{template.type}</p>
                        </div>
                        <Badge className={getSeverityColor(template.severity)}>{template.severity}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create New Broadcast */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Create Emergency Broadcast</CardTitle>
              <CardDescription>Send mass alerts to affected areas with safety instructions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Broadcast Title</label>
                  <Input
                    placeholder="Emergency Alert Title"
                    value={newBroadcast.title}
                    onChange={(e) => setNewBroadcast((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Target Area</label>
                  <Input
                    placeholder="Downtown District, County-wide, etc."
                    value={newBroadcast.targetArea}
                    onChange={(e) => setNewBroadcast((prev) => ({ ...prev, targetArea: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Severity Level</label>
                  <select
                    value={newBroadcast.severity}
                    onChange={(e) => setNewBroadcast((prev) => ({ ...prev, severity: e.target.value as any }))}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                    <option value="extreme">Extreme</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Emergency Type</label>
                  <select
                    value={newBroadcast.type}
                    onChange={(e) => setNewBroadcast((prev) => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="general">General</option>
                    <option value="evacuation">Evacuation</option>
                    <option value="shelter">Shelter</option>
                    <option value="weather">Weather</option>
                    <option value="medical">Medical</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Radius (km)</label>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={newBroadcast.radius}
                    onChange={(e) => setNewBroadcast((prev) => ({ ...prev, radius: Number.parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Broadcast Message</label>
                <Textarea
                  placeholder="Enter emergency message with clear instructions..."
                  value={newBroadcast.message}
                  onChange={(e) => setNewBroadcast((prev) => ({ ...prev, message: e.target.value }))}
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Broadcast Channels</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["SMS", "Push", "Radio", "TV"].map((channel) => (
                    <Button
                      key={channel}
                      variant={newBroadcast.channels.includes(channel) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleChannel(channel)}
                      className="justify-start"
                    >
                      {channel === "SMS" && <Smartphone className="w-4 h-4 mr-2" />}
                      {channel === "Push" && <Smartphone className="w-4 h-4 mr-2" />}
                      {channel === "Radio" && <Radio className="w-4 h-4 mr-2" />}
                      {channel === "TV" && <Tv className="w-4 h-4 mr-2" />}
                      {channel}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => sendBroadcast()}
                disabled={
                  !newBroadcast.title ||
                  !newBroadcast.message ||
                  !newBroadcast.targetArea ||
                  newBroadcast.channels.length === 0 ||
                  isCreating
                }
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isCreating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Sending Broadcast...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Emergency Broadcast
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Active Emergency Broadcasts</CardTitle>
              <CardDescription>Currently active or recently sent emergency alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {broadcasts
                .filter((b) => b.status === "sending" || b.status === "sent")
                .map((broadcast) => (
                  <Card
                    key={broadcast.id}
                    className={cn(
                      "border-border cursor-pointer transition-all hover:shadow-md",
                      selectedBroadcast === broadcast.id && "ring-2 ring-primary",
                    )}
                    onClick={() => setSelectedBroadcast(selectedBroadcast === broadcast.id ? null : broadcast.id)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(broadcast.severity)}>
                              {broadcast.severity.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(broadcast.status)}>{broadcast.status.toUpperCase()}</Badge>
                            <Badge variant="outline">{broadcast.type.toUpperCase()}</Badge>
                          </div>
                          <h4 className="font-medium text-foreground">{broadcast.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {broadcast.targetArea} ({broadcast.radius}km radius)
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {broadcast.timestamp.toLocaleTimeString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {broadcast.recipientCount.toLocaleString()} recipients
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedBroadcast === broadcast.id && (
                        <div className="space-y-4 pt-3 border-t border-border">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Message</label>
                            <p className="text-sm text-foreground mt-1">{broadcast.message}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Broadcast Channels</label>
                            <div className="flex gap-1 mt-1">
                              {broadcast.channels.map((channel) => (
                                <Badge key={channel} variant="outline" className="text-xs">
                                  {channel}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {broadcast.status === "sending" && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Sending Progress</label>
                              <Progress
                                value={(broadcast.deliveryStats.sent / broadcast.recipientCount) * 100}
                                className="mt-1"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                {broadcast.deliveryStats.sent.toLocaleString()} of{" "}
                                {broadcast.recipientCount.toLocaleString()} sent
                              </p>
                            </div>
                          )}

                          {broadcast.status === "sent" && (
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <label className="font-medium text-muted-foreground">Sent</label>
                                <p className="text-foreground">{broadcast.deliveryStats.sent.toLocaleString()}</p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">Delivered</label>
                                <p className="text-green-600">{broadcast.deliveryStats.delivered.toLocaleString()}</p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">Failed</label>
                                <p className="text-red-600">{broadcast.deliveryStats.failed.toLocaleString()}</p>
                              </div>
                            </div>
                          )}

                          {broadcast.evacuationRoutes && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Evacuation Routes</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {broadcast.evacuationRoutes.map((route) => (
                                  <Badge key={route} variant="secondary" className="text-xs">
                                    {route}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {broadcast.shelterLocations && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Shelter Locations</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {broadcast.shelterLocations.map((shelter) => (
                                  <Badge key={shelter} variant="secondary" className="text-xs">
                                    {shelter}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Broadcast History</CardTitle>
              <CardDescription>Complete history of all emergency broadcasts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {broadcasts.map((broadcast) => (
                <Card key={broadcast.id} className="border-border">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(broadcast.severity)}>
                            {broadcast.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(broadcast.status)}>{broadcast.status.toUpperCase()}</Badge>
                        </div>
                        <h4 className="font-medium text-foreground">{broadcast.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{broadcast.timestamp.toLocaleString()}</span>
                          <span>{broadcast.targetArea}</span>
                          <span>{broadcast.deliveryStats.delivered.toLocaleString()} delivered</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Emergency Alert */}
      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="w-4 h-4 text-red-600" />
        <AlertDescription className="text-red-800">
          Emergency Broadcast System is active and monitoring for critical situations requiring mass alerts.
        </AlertDescription>
      </Alert>
    </div>
  )
}
