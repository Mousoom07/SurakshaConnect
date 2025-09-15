"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Eye, Navigation, AlertTriangle, CheckCircle, MapPin, ArrowRight, Zap, Shield } from "lucide-react"

interface ARInstruction {
  id: string
  type: "navigation" | "safety" | "hazard" | "resource"
  title: string
  description: string
  direction: string
  distance: string
  confidence: number
  priority: "critical" | "high" | "medium" | "low"
  icon: string
}

interface ARSession {
  id: string
  timestamp: string
  location: string
  scenario: string
  instructions: ARInstruction[]
  status: "active" | "completed" | "paused"
}

export default function ARSurvivalGuide() {
  const [isARActive, setIsARActive] = useState(false)
  const [currentSession, setCurrentSession] = useState<ARSession | null>(null)
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "pending">("pending")
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [detectedHazards, setDetectedHazards] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  const [sessions] = useState<ARSession[]>([
    {
      id: "ar-001",
      timestamp: "2024-01-15 16:20:00",
      location: "Downtown Building",
      scenario: "Earthquake Evacuation",
      instructions: [
        {
          id: "nav-001",
          type: "navigation",
          title: "Exit Through East Door",
          description: "Structural analysis shows east exit is safest",
          direction: "Northeast",
          distance: "15 meters",
          confidence: 94,
          priority: "critical",
          icon: "🚪",
        },
        {
          id: "safety-001",
          type: "safety",
          title: "Avoid Glass Windows",
          description: "High risk of aftershock damage",
          direction: "West wall",
          distance: "5 meters",
          confidence: 89,
          priority: "high",
          icon: "⚠️",
        },
        {
          id: "nav-002",
          type: "navigation",
          title: "Safe Zone Ahead",
          description: "Open courtyard with emergency services",
          direction: "North",
          distance: "50 meters",
          confidence: 96,
          priority: "medium",
          icon: "🏥",
        },
      ],
      status: "completed",
    },
  ])

  const startARSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setCameraPermission("granted")
      setIsARActive(true)

      // Simulate AI analysis
      setAnalysisProgress(0)
      const progressInterval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            generateARInstructions()
            return 100
          }
          return prev + 15
        })
      }, 300)
    } catch (error) {
      setCameraPermission("denied")
      console.error("Camera access denied:", error)
    }
  }

  const generateARInstructions = () => {
    const newSession: ARSession = {
      id: `ar-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      location: "Current Location",
      scenario: "Flood Emergency",
      instructions: [
        {
          id: "nav-003",
          type: "navigation",
          title: "Climb to Higher Ground",
          description: "Water level rising - move to 2nd floor",
          direction: "Staircase behind you",
          distance: "8 meters",
          confidence: 92,
          priority: "critical",
          icon: "⬆️",
        },
        {
          id: "hazard-001",
          type: "hazard",
          title: "Electrical Hazard Detected",
          description: "Power lines in water - avoid this area",
          direction: "Left side",
          distance: "12 meters",
          confidence: 88,
          priority: "critical",
          icon: "⚡",
        },
        {
          id: "resource-001",
          type: "resource",
          title: "Emergency Kit Available",
          description: "First aid supplies and flashlight",
          direction: "Right wall cabinet",
          distance: "3 meters",
          confidence: 85,
          priority: "medium",
          icon: "🎒",
        },
      ],
      status: "active",
    }

    setCurrentSession(newSession)
    setDetectedHazards(["Electrical wires in water", "Unstable flooring", "Blocked main exit"])
  }

  const stopARSession = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    setIsARActive(false)
    setCurrentSession(null)
    setAnalysisProgress(0)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "navigation":
        return <Navigation className="h-4 w-4" />
      case "safety":
        return <Shield className="h-4 w-4" />
      case "hazard":
        return <AlertTriangle className="h-4 w-4" />
      case "resource":
        return <MapPin className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AR Camera View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Augmented Reality Survival Guide
          </CardTitle>
          <CardDescription>Point your camera at your surroundings for AI-powered survival guidance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isARActive ? (
              <div className="text-center space-y-4">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Camera view will appear here</p>
                  </div>
                </div>

                <Button
                  onClick={startARSession}
                  className="flex items-center gap-2"
                  disabled={cameraPermission === "denied"}
                >
                  <Camera className="h-4 w-4" />
                  Start AR Survival Mode
                </Button>

                {cameraPermission === "denied" && (
                  <p className="text-sm text-red-500">Camera permission required for AR guidance</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

                  {/* AR Overlay */}
                  {currentSession && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Simulated AR instructions overlay */}
                      <div className="absolute top-4 left-4 bg-red-500/90 text-white px-3 py-2 rounded-lg text-sm font-medium">
                        ⬆️ Climb to Higher Ground - 8m
                      </div>
                      <div className="absolute top-20 right-4 bg-orange-500/90 text-white px-3 py-2 rounded-lg text-sm font-medium">
                        ⚡ Electrical Hazard - Avoid Left
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-500/90 text-white px-3 py-2 rounded-lg text-sm font-medium">
                        🎒 Emergency Kit - Right Wall
                      </div>
                    </div>
                  )}
                </div>

                {analysisProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="h-4 w-4 animate-pulse" />
                      AI analyzing surroundings for hazards and safe paths...
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={stopARSession} variant="outline">
                    Stop AR Session
                  </Button>
                  {currentSession && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {currentSession.instructions.length} instructions active
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current AR Instructions */}
      {currentSession && (
        <Card>
          <CardHeader>
            <CardTitle>Live AR Instructions</CardTitle>
            <CardDescription>Real-time survival guidance for {currentSession.scenario}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentSession.instructions.map((instruction) => (
                <div key={instruction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${getPriorityColor(instruction.priority)}`}
                    >
                      {getTypeIcon(instruction.type)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{instruction.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {instruction.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{instruction.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        {instruction.direction}
                      </span>
                      <span>{instruction.distance}</span>
                      <span>{instruction.confidence}% confidence</span>
                    </div>
                  </div>

                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detected Hazards */}
      {detectedHazards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Detected Hazards
            </CardTitle>
            <CardDescription>AI has identified potential dangers in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {detectedHazards.map((hazard, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-red-700">{hazard}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Previous AR Sessions</CardTitle>
          <CardDescription>History of your AR survival guidance sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{session.scenario}</h4>
                    <p className="text-sm text-muted-foreground">
                      {session.location} • {session.timestamp}
                    </p>
                  </div>
                  <Badge variant={session.status === "completed" ? "default" : "secondary"}>{session.status}</Badge>
                </div>

                <div className="text-sm text-muted-foreground">{session.instructions.length} instructions provided</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
