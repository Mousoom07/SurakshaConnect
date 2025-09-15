"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Satellite, Camera, MapPin, AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react"

interface SatelliteAnalysis {
  id: string
  timestamp: string
  location: string
  coordinates: [number, number]
  imageType: "satellite" | "drone"
  analysis: {
    floodZones: Array<{ severity: string; area: string; confidence: number }>
    collapsedBuildings: Array<{ location: string; severity: string; confidence: number }>
    fireSpread: Array<{ direction: string; speed: string; risk: string }>
    safeZones: Array<{ location: string; capacity: number; accessibility: string }>
  }
  verificationStatus: "pending" | "verified" | "disputed"
  crossReferencedReports: number
}

export default function SatelliteDataIntegration() {
  const [analyses, setAnalyses] = useState<SatelliteAnalysis[]>([
    {
      id: "sat-001",
      timestamp: "2024-01-15 14:30:00",
      location: "Downtown District",
      coordinates: [40.7128, -74.006],
      imageType: "satellite",
      analysis: {
        floodZones: [
          { severity: "Critical", area: "2.3 km²", confidence: 94 },
          { severity: "Moderate", area: "1.8 km²", confidence: 87 },
        ],
        collapsedBuildings: [
          { location: "Main St & 5th Ave", severity: "Complete", confidence: 96 },
          { location: "City Hall Complex", severity: "Partial", confidence: 82 },
        ],
        fireSpread: [],
        safeZones: [
          { location: "Central Park North", capacity: 500, accessibility: "Vehicle Access" },
          { location: "Stadium Parking", capacity: 1200, accessibility: "Helicopter Landing" },
        ],
      },
      verificationStatus: "verified",
      crossReferencedReports: 23,
    },
    {
      id: "drone-002",
      timestamp: "2024-01-15 15:45:00",
      location: "Industrial Zone",
      coordinates: [40.7589, -73.9851],
      imageType: "drone",
      analysis: {
        floodZones: [],
        collapsedBuildings: [],
        fireSpread: [
          { direction: "Northeast", speed: "15 m/min", risk: "High" },
          { direction: "Southeast", speed: "8 m/min", risk: "Moderate" },
        ],
        safeZones: [{ location: "River Access Point", capacity: 200, accessibility: "Boat Evacuation" }],
      },
      verificationStatus: "pending",
      crossReferencedReports: 7,
    },
  ])

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsAnalyzing(true)
    setUploadProgress(0)

    // Simulate upload and analysis progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate AI analysis
    setTimeout(() => {
      const newAnalysis: SatelliteAnalysis = {
        id: `img-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        location: "Uploaded Image Analysis",
        coordinates: [40.75, -73.985],
        imageType: "satellite",
        analysis: {
          floodZones: [{ severity: "Moderate", area: "0.8 km²", confidence: 89 }],
          collapsedBuildings: [{ location: "Residential Block A", severity: "Partial", confidence: 78 }],
          fireSpread: [],
          safeZones: [{ location: "School Grounds", capacity: 300, accessibility: "Ground Access" }],
        },
        verificationStatus: "pending",
        crossReferencedReports: 0,
      }

      setAnalyses((prev) => [newAnalysis, ...prev])
      setIsAnalyzing(false)
      setUploadProgress(0)
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "moderate":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "disputed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-5 w-5" />
            Satellite & Drone Data Analysis
          </CardTitle>
          <CardDescription>Upload satellite imagery or drone footage for AI-powered crisis analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Upload Image"}
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 animate-pulse" />
                  GPT Vision analyzing image...
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Analyses</h3>

        {analyses.map((analysis) => (
          <Card key={analysis.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={analysis.imageType === "satellite" ? "default" : "secondary"}>
                    {analysis.imageType === "satellite" ? "Satellite" : "Drone"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{analysis.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(analysis.verificationStatus)}
                  <span className="text-sm capitalize">{analysis.verificationStatus}</span>
                </div>
              </div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {analysis.location}
              </CardTitle>
              <CardDescription>Cross-referenced with {analysis.crossReferencedReports} victim reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="flood" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="flood">Flood Zones</TabsTrigger>
                  <TabsTrigger value="buildings">Buildings</TabsTrigger>
                  <TabsTrigger value="fire">Fire Spread</TabsTrigger>
                  <TabsTrigger value="safe">Safe Zones</TabsTrigger>
                </TabsList>

                <TabsContent value="flood" className="space-y-2">
                  {analysis.analysis.floodZones.length > 0 ? (
                    analysis.analysis.floodZones.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <Badge className={getSeverityColor(zone.severity)}>{zone.severity}</Badge>
                          <span className="ml-2 font-medium">Area: {zone.area}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{zone.confidence}% confidence</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No flood zones detected</p>
                  )}
                </TabsContent>

                <TabsContent value="buildings" className="space-y-2">
                  {analysis.analysis.collapsedBuildings.length > 0 ? (
                    analysis.analysis.collapsedBuildings.map((building, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <Badge className={getSeverityColor(building.severity)}>{building.severity}</Badge>
                          <span className="ml-2 font-medium">{building.location}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{building.confidence}% confidence</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No collapsed buildings detected</p>
                  )}
                </TabsContent>

                <TabsContent value="fire" className="space-y-2">
                  {analysis.analysis.fireSpread.length > 0 ? (
                    analysis.analysis.fireSpread.map((fire, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <Badge className={getSeverityColor(fire.risk)}>{fire.risk} Risk</Badge>
                          <span className="ml-2 font-medium">
                            {fire.direction} at {fire.speed}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No fire spread detected</p>
                  )}
                </TabsContent>

                <TabsContent value="safe" className="space-y-2">
                  {analysis.analysis.safeZones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <Badge className="bg-green-500">Safe Zone</Badge>
                        <span className="ml-2 font-medium">{zone.location}</span>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>Capacity: {zone.capacity}</div>
                        <div>{zone.accessibility}</div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
