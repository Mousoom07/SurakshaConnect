"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Camera, Type, Upload, X, Loader2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { VoiceRecorder } from "./voice-recorder"

interface MultiModalInputProps {
  onEmergencyDetected?: (emergency: EmergencyRequest) => void
}

interface EmergencyRequest {
  location: string
  urgency: "low" | "medium" | "high" | "critical"
  type: "medical" | "shelter" | "food" | "evacuation" | "other"
  description: string
  language: string
  imageAnalysis?: string
  confidence?: number
}

export function MultiModalInput({ onEmergencyDetected }: MultiModalInputProps) {
  const [textInput, setTextInput] = useState("")
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<EmergencyRequest | null>(null)
  const [activeTab, setActiveTab] = useState("voice")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || [])
      const imageFiles = files.filter((file) => file.type.startsWith("image/"))

      if (imageFiles.length + selectedImages.length > 3) {
        alert("Maximum 3 images allowed")
        return
      }

      setSelectedImages((prev) => [...prev, ...imageFiles])
    },
    [selectedImages.length],
  )

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const processMultiModalInput = async () => {
    if (!textInput.trim() && selectedImages.length === 0) {
      alert("Please provide text description or upload images")
      return
    }

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("text", textInput)

      selectedImages.forEach((image, index) => {
        formData.append(`image_${index}`, image)
      })

      const response = await fetch("/api/process-multimodal", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process input")
      }

      const result = await response.json()
      setAnalysisResult(result.emergency)
      onEmergencyDetected?.(result.emergency)
    } catch (error) {
      console.error("Error processing input:", error)
      alert("Failed to process input. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            Multi-Modal Emergency Input
          </CardTitle>
          <CardDescription>
            Report emergencies using voice, text, or images. AI will analyze all inputs to understand the situation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voice
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Images
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voice" className="space-y-4">
              <VoiceRecorder onEmergencyDetected={onEmergencyDetected} />
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Describe your emergency situation
                  </label>
                  <Textarea
                    placeholder="Example: Building collapsed on Main Street, people trapped inside, need immediate rescue..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <Button
                  onClick={processMultiModalInput}
                  disabled={!textInput.trim() || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Text Emergency"
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Upload images of the emergency situation
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mb-2">
                      <Upload className="w-4 h-4 mr-2" />
                      Select Images
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Upload photos of damage, injuries, or hazards (max 3 images)
                    </p>
                  </div>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Emergency image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-border"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Additional description (optional)
                  </label>
                  <Textarea
                    placeholder="Provide additional context about what's shown in the images..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </div>

                <Button
                  onClick={processMultiModalInput}
                  disabled={selectedImages.length === 0 || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Images...
                    </>
                  ) : (
                    "Analyze Images with AI Vision"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>AI Analysis Results</CardTitle>
            <CardDescription>GPT-5 Vision has analyzed your input and extracted critical information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Urgency Level</label>
                <Badge className={cn("mt-1", getUrgencyColor(analysisResult.urgency))}>
                  {analysisResult.urgency.toUpperCase()}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Emergency Type</label>
                <Badge variant="outline" className="mt-1">
                  {analysisResult.type.toUpperCase()}
                </Badge>
              </div>
            </div>

            {analysisResult.confidence && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">AI Confidence</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${analysisResult.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{analysisResult.confidence}%</span>
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground">Location</label>
              <p className="text-foreground mt-1">{analysisResult.location}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-foreground mt-1">{analysisResult.description}</p>
            </div>

            {analysisResult.imageAnalysis && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Image Analysis</label>
                <div className="bg-muted p-3 rounded-lg mt-1">
                  <p className="text-foreground text-sm">{analysisResult.imageAnalysis}</p>
                </div>
              </div>
            )}

            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Submit Emergency Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
