"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Box,
  Mic,
  MapPin,
  Heart,
  Wifi,
  WifiOff,
  Upload,
  Battery,
  Smartphone,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react"

interface BlackBoxEntry {
  id: string
  timestamp: Date
  type: "location" | "voice" | "health" | "emergency" | "status"
  data: any
  synced: boolean
}

interface HealthMetrics {
  heartRate?: number
  steps: number
  batteryLevel: number
  deviceTemp?: number
}

export default function DigitalBlackBox() {
  const [isRecording, setIsRecording] = useState(false)
  const [isOnline, setIsOnline] = useState<boolean>(() => (typeof navigator !== "undefined" ? navigator.onLine : true))
  const [autoRecord, setAutoRecord] = useState(true)
  const [entries, setEntries] = useState<BlackBoxEntry[]>([])
  const [unsyncedCount, setUnsyncedCount] = useState(0)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    batteryLevel: 85,
    heartRate: 72,
    steps: 1247,
  })
  const [voiceNote, setVoiceNote] = useState("")
  const [storageUsed, setStorageUsed] = useState(45) // MB
  const [lastSync, setLastSync] = useState<Date | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordStartRef = useRef<number | null>(null)

  // Simulate location tracking
  useEffect(() => {
    const updateLocation = () => {
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setCurrentLocation(newLocation)

            if (autoRecord) {
              addEntry({
                type: "location",
                data: {
                  ...newLocation,
                  accuracy: position.coords.accuracy,
                  altitude: position.coords.altitude,
                },
              })
            }
          },
          (error) => console.log("Location error:", error),
        )
      }
    }

    updateLocation()
    const locationInterval = setInterval(updateLocation, 30000) // Every 30 seconds

    return () => clearInterval(locationInterval)
  }, [autoRecord])

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      syncToCloud()
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Auto-record health metrics
  useEffect(() => {
    if (!autoRecord) return

    const healthInterval = setInterval(() => {
      const newMetrics = {
        heartRate: Math.floor(Math.random() * 40) + 60,
        steps: healthMetrics.steps + Math.floor(Math.random() * 10),
        batteryLevel: Math.max(0, healthMetrics.batteryLevel - 0.1),
        deviceTemp: Math.round((Math.random() * 10 + 30) * 10) / 10,
      }

      setHealthMetrics(newMetrics)

      addEntry({
        type: "health",
        data: newMetrics,
      })
    }, 60000) // Every minute

    return () => clearInterval(healthInterval)
  }, [autoRecord, healthMetrics.steps])

  const addEntry = (entryData: Omit<BlackBoxEntry, "id" | "timestamp" | "synced">) => {
    const newEntry: BlackBoxEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      synced: false,
      ...entryData,
    }

    setEntries((prev) => [...prev, newEntry])
    setUnsyncedCount((prev) => prev + 1)
    setStorageUsed((prev) => prev + 0.1) // Simulate storage increase
  }

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const duration = recordStartRef.current ? Date.now() - recordStartRef.current : 0
        addEntry({
          type: "voice",
          data: {
            audioBlob,
            duration,
            note: voiceNote,
          },
        })
        setVoiceNote("")
        stream.getTracks().forEach((track) => track.stop())
        recordStartRef.current = null
      }

      mediaRecorder.onstart = () => {
        recordStartRef.current = Date.now()
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const recordEmergency = () => {
    addEntry({
      type: "emergency",
      data: {
        location: currentLocation,
        healthMetrics,
        timestamp: new Date(),
        note: "EMERGENCY SIGNAL ACTIVATED",
      },
    })
  }

  const syncToCloud = async () => {
    if (!isOnline) return

    // Simulate cloud sync
    const unsyncedEntries = entries.filter((entry) => !entry.synced)

    for (const entry of unsyncedEntries) {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 100))

      setEntries((prev) => prev.map((e) => (e.id === entry.id ? { ...e, synced: true } : e)))
    }

    setUnsyncedCount(0)
    setLastSync(new Date())
  }

  const exportData = () => {
    const dataStr = JSON.stringify(entries, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `black-box-data-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const clearOldData = () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    setEntries((prev) => prev.filter((entry) => entry.timestamp > oneDayAgo))
    setStorageUsed((prev) => Math.max(0, prev - 20))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="h-5 w-5 text-gray-700" />
            Digital Black Box
            <Badge variant={isOnline ? "default" : "destructive"} className="ml-auto">
              {isOnline ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Continuously logs your location, voice notes, and health status. Data syncs automatically when network
            returns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">{currentLocation ? "Tracking" : "Searching..."}</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-xs text-gray-500">Heart Rate</p>
                  <p className="text-sm font-medium">{healthMetrics.heartRate} BPM</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-xs text-gray-500">Battery</p>
                  <p className="text-sm font-medium">{Math.round(healthMetrics.batteryLevel)}%</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">Storage</p>
                  <p className="text-sm font-medium">{storageUsed.toFixed(1)} MB</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Auto Recording Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="auto-record" className="font-medium">
                Auto Recording
              </Label>
              <p className="text-sm text-gray-500">Automatically log location and health data</p>
            </div>
            <Switch id="auto-record" checked={autoRecord} onCheckedChange={setAutoRecord} />
          </div>

          {/* Voice Recording */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Voice Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Add context for your voice note..."
                value={voiceNote}
                onChange={(e) => setVoiceNote(e.target.value)}
                className="min-h-16"
              />
              <div className="flex gap-2">
                <Button
                  onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                  variant={isRecording ? "destructive" : "default"}
                  className="flex-1"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  {isRecording ? "Stop Recording" : "Start Voice Note"}
                </Button>
                <Button onClick={recordEmergency} variant="destructive">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Emergency
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sync Status */}
          <Card className={`border-2 ${isOnline ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                  )}
                  <div>
                    <p className="font-medium">{isOnline ? "Cloud Sync Active" : "Offline Mode"}</p>
                    <p className="text-sm text-gray-600">
                      {isOnline
                        ? `Last sync: ${lastSync ? lastSync.toLocaleTimeString() : "Never"}`
                        : `${unsyncedCount} entries waiting to sync`}
                    </p>
                  </div>
                </div>
                {isOnline && unsyncedCount > 0 && (
                  <Button onClick={syncToCloud} size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                Recent Entries
                <Badge variant="outline">{entries.length} total</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {entries
                  .slice(-10)
                  .reverse()
                  .map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-2 border rounded text-sm">
                      <div className="flex items-center gap-2">
                        {entry.type === "location" && <MapPin className="h-3 w-3 text-blue-500" />}
                        {entry.type === "voice" && <Mic className="h-3 w-3 text-green-500" />}
                        {entry.type === "health" && <Heart className="h-3 w-3 text-red-500" />}
                        {entry.type === "emergency" && <AlertCircle className="h-3 w-3 text-red-500" />}
                        <span className="capitalize">{entry.type}</span>
                        <span className="text-gray-500">{entry.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {entry.synced ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <Clock className="h-3 w-3 text-orange-500" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Storage Management */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Storage Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage Used</span>
                  <span>{storageUsed.toFixed(1)} MB / 100 MB</span>
                </div>
                <Progress value={storageUsed} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Button onClick={exportData} variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button onClick={clearOldData} variant="outline" size="sm" className="flex-1 bg-transparent">
                  Clear Old Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Notice */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Emergency Data Recovery</h4>
                  <p className="text-sm text-red-700">
                    This black box data can help rescuers trace your last known location and activities even if your
                    device loses power. Keep auto-recording enabled in dangerous situations.
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
