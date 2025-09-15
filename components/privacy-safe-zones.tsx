"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Eye,
  EyeOff,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Lock,
  Home,
  Building,
  Cross,
  Zap,
  Clock,
  Star,
  Heart,
} from "lucide-react"

interface SafeZone {
  id: string
  name: string
  type: "embassy" | "hospital" | "police" | "shelter" | "ngo" | "religious"
  location: { lat: number; lng: number }
  address: string
  distance: number
  trustScore: number
  verified: boolean
  capacity: number
  currentOccupancy: number
  services: string[]
  contactInfo: string
  lastUpdated: Date
  isOpen24h: boolean
}

interface PrivacySettings {
  anonymousMode: boolean
  maskLocation: boolean
  hidePersonalInfo: boolean
  useCodenames: boolean
  encryptMessages: boolean
  trustLevel: "low" | "medium" | "high"
}

export default function PrivacySafeZones() {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    anonymousMode: false,
    maskLocation: false,
    hidePersonalInfo: false,
    useCodenames: false,
    encryptMessages: true,
    trustLevel: "medium",
  })

  const [safeZones, setSafeZones] = useState<SafeZone[]>([])
  const [selectedZone, setSelectedZone] = useState<SafeZone | null>(null)
  const [emergencyMessage, setEmergencyMessage] = useState("")
  const [codename, setCodename] = useState("")
  const [conflictType, setConflictType] = useState<"war" | "riot" | "persecution" | "natural">("war")
  const [isInDanger, setIsInDanger] = useState(false)

  const mockSafeZones: SafeZone[] = [
    {
      id: "1",
      name: "International Red Cross Center",
      type: "ngo",
      location: { lat: 40.7589, lng: -73.9851 },
      address: "123 Relief Avenue, Safe District",
      distance: 0.8,
      trustScore: 98,
      verified: true,
      capacity: 500,
      currentOccupancy: 234,
      services: ["Medical Care", "Food", "Shelter", "Legal Aid"],
      contactInfo: "Emergency: +1-800-RED-CROSS",
      lastUpdated: new Date(),
      isOpen24h: true,
    },
    {
      id: "2",
      name: "US Embassy Safe Room",
      type: "embassy",
      location: { lat: 40.7614, lng: -73.9776 },
      address: "456 Diplomatic Row",
      distance: 1.2,
      trustScore: 95,
      verified: true,
      capacity: 100,
      currentOccupancy: 45,
      services: ["Consular Services", "Evacuation", "Communication"],
      contactInfo: "Emergency: +1-800-US-EMBASSY",
      lastUpdated: new Date(),
      isOpen24h: true,
    },
    {
      id: "3",
      name: "Sacred Heart Sanctuary",
      type: "religious",
      location: { lat: 40.7505, lng: -73.9934 },
      address: "789 Faith Street",
      distance: 2.1,
      trustScore: 87,
      verified: true,
      capacity: 200,
      currentOccupancy: 89,
      services: ["Sanctuary", "Food", "Counseling"],
      contactInfo: "Father Martinez: +1-555-SANCTUARY",
      lastUpdated: new Date(),
      isOpen24h: false,
    },
    {
      id: "4",
      name: "Central Hospital Safe Ward",
      type: "hospital",
      location: { lat: 40.7282, lng: -73.9942 },
      address: "321 Medical Plaza",
      distance: 3.5,
      trustScore: 92,
      verified: true,
      capacity: 150,
      currentOccupancy: 67,
      services: ["Medical Care", "Trauma Treatment", "Safe Rooms"],
      contactInfo: "Emergency: +1-555-HOSPITAL",
      lastUpdated: new Date(),
      isOpen24h: true,
    },
  ]

  useEffect(() => {
    setSafeZones(mockSafeZones)
    if (!codename && privacySettings.useCodenames) {
      setCodename(`Survivor${Math.floor(Math.random() * 1000)}`)
    }
  }, [privacySettings.useCodenames])

  const updatePrivacySetting = (key: keyof PrivacySettings, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const sendAnonymousAlert = () => {
    const maskedLocation = privacySettings.maskLocation
      ? { lat: Math.round(40.7589 * 100) / 100, lng: Math.round(-73.9851 * 100) / 100 }
      : { lat: 40.7589, lng: -73.9851 }

    const alertData = {
      sender: privacySettings.useCodenames ? codename : "Anonymous",
      message: emergencyMessage || "Emergency assistance needed in conflict zone",
      location: maskedLocation,
      conflictType,
      trustLevel: privacySettings.trustLevel,
      encrypted: privacySettings.encryptMessages,
      timestamp: new Date(),
    }

    console.log("[v0] Anonymous alert sent:", alertData)
    setIsInDanger(true)

    // Simulate response
    setTimeout(() => {
      setIsInDanger(false)
    }, 10000)
  }

  const requestSafePassage = (zone: SafeZone) => {
    setSelectedZone(zone)
    const request = {
      destination: zone.name,
      requester: privacySettings.useCodenames ? codename : "Anonymous",
      urgency: "high",
      needsEscort: true,
      estimatedArrival: new Date(Date.now() + zone.distance * 20 * 60000), // 20 min per km
    }

    console.log("[v0] Safe passage requested:", request)
  }

  const getZoneIcon = (type: SafeZone["type"]) => {
    switch (type) {
      case "embassy":
        return <Building className="h-5 w-5" />
      case "hospital":
        return <Cross className="h-5 w-5" />
      case "police":
        return <Shield className="h-5 w-5" />
      case "shelter":
        return <Home className="h-5 w-5" />
      case "ngo":
        return <Heart className="h-5 w-5" />
      case "religious":
        return <Star className="h-5 w-5" />
      default:
        return <MapPin className="h-5 w-5" />
    }
  }

  const getZoneColor = (type: SafeZone["type"]) => {
    switch (type) {
      case "embassy":
        return "text-blue-600 bg-blue-100"
      case "hospital":
        return "text-red-600 bg-red-100"
      case "police":
        return "text-indigo-600 bg-indigo-100"
      case "shelter":
        return "text-green-600 bg-green-100"
      case "ngo":
        return "text-orange-600 bg-orange-100"
      case "religious":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Privacy & Safe Zones
            <Badge variant={privacySettings.anonymousMode ? "default" : "secondary"} className="ml-auto">
              {privacySettings.anonymousMode ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
              {privacySettings.anonymousMode ? "Anonymous" : "Standard"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Protect your identity in conflict zones while accessing verified safe locations and emergency services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Privacy Settings */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-800">Privacy Protection Settings</CardTitle>
              <CardDescription className="text-blue-600">
                Configure how your information is shared during emergencies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                  <div>
                    <Label className="font-medium">Anonymous Mode</Label>
                    <p className="text-sm text-gray-500">Hide all personal information</p>
                  </div>
                  <Switch
                    checked={privacySettings.anonymousMode}
                    onCheckedChange={(value) => updatePrivacySetting("anonymousMode", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                  <div>
                    <Label className="font-medium">Mask Location</Label>
                    <p className="text-sm text-gray-500">Share approximate area only</p>
                  </div>
                  <Switch
                    checked={privacySettings.maskLocation}
                    onCheckedChange={(value) => updatePrivacySetting("maskLocation", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                  <div>
                    <Label className="font-medium">Use Codenames</Label>
                    <p className="text-sm text-gray-500">Communicate with aliases</p>
                  </div>
                  <Switch
                    checked={privacySettings.useCodenames}
                    onCheckedChange={(value) => updatePrivacySetting("useCodenames", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                  <div>
                    <Label className="font-medium">Encrypt Messages</Label>
                    <p className="text-sm text-gray-500">End-to-end encryption</p>
                  </div>
                  <Switch
                    checked={privacySettings.encryptMessages}
                    onCheckedChange={(value) => updatePrivacySetting("encryptMessages", value)}
                  />
                </div>
              </div>

              {privacySettings.useCodenames && (
                <div className="space-y-2">
                  <Label>Your Codename</Label>
                  <Input
                    value={codename}
                    onChange={(e) => setCodename(e.target.value)}
                    placeholder="Enter a codename..."
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Trust Level</Label>
                <Select
                  value={privacySettings.trustLevel}
                  onValueChange={(value: any) => updatePrivacySetting("trustLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Maximum Privacy</SelectItem>
                    <SelectItem value="medium">Medium - Balanced</SelectItem>
                    <SelectItem value="high">High - Share for Better Help</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Conflict Type Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Situation Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={conflictType} onValueChange={(value: any) => setConflictType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="war">War Zone</SelectItem>
                  <SelectItem value="riot">Civil Unrest / Riots</SelectItem>
                  <SelectItem value="persecution">Political Persecution</SelectItem>
                  <SelectItem value="natural">Natural Disaster</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Anonymous Emergency Alert */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Anonymous Emergency Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your situation (optional - will be anonymized)"
                value={emergencyMessage}
                onChange={(e) => setEmergencyMessage(e.target.value)}
                className="min-h-20"
              />

              <div className="flex items-center gap-4">
                <Button
                  onClick={sendAnonymousAlert}
                  className="bg-red-600 hover:bg-red-700 flex-1"
                  disabled={isInDanger}
                >
                  {isInDanger ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Alert Sent - Help Coming
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Send Anonymous Alert
                    </>
                  )}
                </Button>
              </div>

              {isInDanger && (
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-800">Anonymous alert sent successfully</p>
                      <p className="text-sm text-green-700">
                        Your identity is protected. Help has been notified of urgent need in your area.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Safe Zones Map */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                Verified Safe Zones
                <Badge variant="outline">{safeZones.length} locations</Badge>
              </CardTitle>
              <CardDescription>Trusted locations verified by international organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {safeZones.map((zone) => (
                  <Card key={zone.id} className="hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-full ${getZoneColor(zone.type)}`}>{getZoneIcon(zone.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{zone.name}</h4>
                              {zone.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                              <Badge variant="outline" className="text-xs">
                                {zone.type.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{zone.address}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                              <span>{zone.distance} km away</span>
                              <span>Trust: {zone.trustScore}%</span>
                              <span>
                                Capacity: {zone.currentOccupancy}/{zone.capacity}
                              </span>
                              {zone.isOpen24h && (
                                <Badge variant="secondary" className="text-xs">
                                  24/7
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {zone.services.map((service, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">{zone.contactInfo}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            onClick={() => requestSafePassage(zone)}
                            size="sm"
                            variant="outline"
                            disabled={zone.currentOccupancy >= zone.capacity}
                          >
                            Request Safe Passage
                          </Button>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{zone.trustScore}%</div>
                            <div className="text-xs text-gray-500">Trust Score</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Zone Details */}
          {selectedZone && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">Safe Passage Requested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Destination: {selectedZone.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>Estimated arrival: {Math.round(selectedZone.distance * 20)} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Escort will be arranged for safe passage</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your request has been sent anonymously. A trusted escort will contact you using your codename:{" "}
                    <strong>{codename}</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Notice */}
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Lock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Privacy Protection Active</h4>
                  <p className="text-sm text-gray-600">
                    Your personal information is{" "}
                    {privacySettings.anonymousMode ? "completely hidden" : "partially protected"}. Messages are{" "}
                    {privacySettings.encryptMessages ? "encrypted" : "not encrypted"}. Location is{" "}
                    {privacySettings.maskLocation ? "masked to general area" : "shared precisely"}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
