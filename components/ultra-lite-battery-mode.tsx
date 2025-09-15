"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Battery, Mic, MapPin, AlertTriangle, Zap, Clock, Signal, Smartphone } from "lucide-react"

interface BatteryStatus {
  level: number
  isCharging: boolean
  timeRemaining: string
  mode: "normal" | "power_saver" | "ultra_lite"
}

interface EmergencyMessage {
  id: string
  timestamp: string
  location: { lat: number; lng: number; accuracy: number }
  message: string
  priority: "critical" | "high" | "medium"
  batteryLevel: number
  compressed: boolean
  size: string
}

export default function UltraLiteBatteryMode() {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    level: 23,
    isCharging: false,
    timeRemaining: "2h 15m",
    mode: "normal",
  })

  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [emergencyMessages, setEmergencyMessages] = useState<EmergencyMessage[]>([
    {
      id: "msg-001",
      timestamp: "2024-01-15 19:45:00",
      location: { lat: 40.7128, lng: -74.006, accuracy: 5 },
      message: "Trapped in building collapse, 3rd floor, need immediate rescue",
      priority: "critical",
      batteryLevel: 8,
      compressed: true,
      size: "2.1 KB",
    },
    {
      id: "msg-002",
      timestamp: "2024-01-15 19:30:00",
      location: { lat: 40.7589, lng: -73.9851, accuracy: 12 },
      message: "Medical emergency, elderly person unconscious, send ambulance",
      priority: "critical",
      batteryLevel: 15,
      compressed: true,
      size: "1.8 KB",
    },
  ])

  const [ultraLiteSettings, setUltraLiteSettings] = useState({
    voiceOnly: true,
    compressMessages: true,
    disableVideo: true,
    reducedUI: true,
    emergencyBeacon: true,
    autoLocationShare: true,
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const activateUltraLiteMode = () => {
    setBatteryStatus((prev) => ({ ...prev, mode: "ultra_lite" }))
    setUltraLiteSettings({
      voiceOnly: true,
      compressMessages: true,
      disableVideo: true,
      reducedUI: true,
      emergencyBeacon: true,
      autoLocationShare: true,
    })
  }

  const deactivateUltraLiteMode = () => {
    setBatteryStatus((prev) => ({ ...prev, mode: "normal" }))
  }

  const startVoiceRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
  }

  const stopVoiceRecording = () => {
    setIsRecording(false)

    // Simulate creating compressed emergency message
    const newMessage: EmergencyMessage = {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      location: { lat: 40.75, lng: -73.985, accuracy: 8 },
      message: `Voice emergency report - ${recordingTime}s recording compressed`,
      priority: "critical",
      batteryLevel: batteryStatus.level,
      compressed: true,
      size: "1.2 KB",
    }

    setEmergencyMessages((prev) => [newMessage, ...prev])
    setRecordingTime(0)
  }

  const getBatteryColor = (level: number) => {
    if (level <= 10) return "text-red-500"
    if (level <= 25) return "text-orange-500"
    if (level <= 50) return "text-yellow-500"
    return "text-green-500"
  }

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "ultra_lite":
        return "bg-red-500"
      case "power_saver":
        return "bg-orange-500"
      default:
        return "bg-green-500"
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (batteryStatus.mode === "ultra_lite") {
    // Ultra-lite minimal UI
    return (
      <div className="min-h-screen bg-black text-white p-4 flex flex-col">
        {/* Minimal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Battery className={`h-6 w-6 ${getBatteryColor(batteryStatus.level)}`} />
            <span className="text-xl font-bold">{batteryStatus.level}%</span>
          </div>
          <Badge className="bg-red-500 text-white">ULTRA-LITE</Badge>
        </div>

        {/* Emergency SOS Button */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="w-48 h-48 bg-red-600 rounded-full flex items-center justify-center mx-auto">
              {isRecording ? (
                <div className="text-center">
                  <div className="w-6 h-6 bg-white rounded-full animate-pulse mx-auto mb-2" />
                  <div className="text-white font-bold text-lg">{formatTime(recordingTime)}</div>
                </div>
              ) : (
                <Mic className="h-16 w-16 text-white" />
              )}
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xl py-6"
                onMouseDown={startVoiceRecording}
                onMouseUp={stopVoiceRecording}
                onTouchStart={startVoiceRecording}
                onTouchEnd={stopVoiceRecording}
              >
                {isRecording ? "RECORDING..." : "HOLD FOR SOS"}
              </Button>

              <p className="text-gray-300 text-sm text-center">Hold button to record voice emergency message</p>
            </div>
          </div>
        </div>

        {/* Minimal Status */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Location: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Signal className="h-4 w-4" />
            <span>Emergency Beacon: ON</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Battery: {batteryStatus.timeRemaining} remaining</span>
          </div>
        </div>

        {/* Exit Ultra-Lite Mode */}
        <Button
          variant="outline"
          size="sm"
          onClick={deactivateUltraLiteMode}
          className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          Exit Ultra-Lite Mode
        </Button>
      </div>
    )
  }

  // Normal UI for configuration
  return (
    <div className="space-y-6">
      {/* Battery Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className={`h-5 w-5 ${getBatteryColor(batteryStatus.level)}`} />
            Battery Status
          </CardTitle>
          <CardDescription>Current power level and optimization settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold">{batteryStatus.level}%</div>
                <div className="text-sm text-muted-foreground">
                  <div>{batteryStatus.timeRemaining} remaining</div>
                  <div className="flex items-center gap-1">
                    {batteryStatus.isCharging ? (
                      <>
                        <Zap className="h-3 w-3" />
                        Charging
                      </>
                    ) : (
                      "Not charging"
                    )}
                  </div>
                </div>
              </div>
              <Badge className={getModeColor(batteryStatus.mode)}>
                {batteryStatus.mode.replace("_", " ").toUpperCase()}
              </Badge>
            </div>

            <Progress value={batteryStatus.level} className="w-full" />

            {batteryStatus.level <= 25 && (
              <Alert className="border-orange-500 bg-orange-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Low Battery Warning</AlertTitle>
                <AlertDescription>
                  Consider activating Ultra-Lite mode to extend battery life for emergency communications.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ultra-Lite Mode Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Ultra-Lite Battery Mode
          </CardTitle>
          <CardDescription>Minimal power consumption mode for emergency situations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Power Saving Features:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Voice-only emergency reports
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Compressed message transmission
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Disabled video and images
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Minimal black UI interface
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Emergency beacon broadcasting
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Battery Extension:</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Normal mode:</span>
                    <span className="font-medium">{batteryStatus.timeRemaining}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ultra-lite mode:</span>
                    <span className="font-medium text-green-600">~8-12 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Power savings:</span>
                    <span className="font-medium text-green-600">Up to 80%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={activateUltraLiteMode} className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
                <Battery className="h-4 w-4" />
                Activate Ultra-Lite Mode
              </Button>

              {batteryStatus.level <= 15 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Recommended
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Messages History */}
      <Card>
        <CardHeader>
          <CardTitle>Compressed Emergency Messages</CardTitle>
          <CardDescription>Ultra-efficient emergency communications sent in low-power mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyMessages.map((message) => (
              <div key={message.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={message.priority === "critical" ? "destructive" : "secondary"}>
                      {message.priority}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Battery className={`h-3 w-3 ${getBatteryColor(message.batteryLevel)}`} />
                    {message.batteryLevel}%
                  </div>
                </div>

                <p className="text-sm mb-3">{message.message}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />±{message.location.accuracy}m accuracy
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {message.size} compressed
                    </span>
                  </div>
                  {message.compressed && (
                    <Badge variant="outline" className="text-xs">
                      Ultra-compressed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
