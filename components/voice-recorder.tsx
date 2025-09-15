"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Square, Play, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageSelector } from "./language-selector"

interface VoiceRecorderProps {
  onTranscription?: (text: string) => void
  onEmergencyDetected?: (emergency: EmergencyRequest) => void
}

interface EmergencyRequest {
  location: string
  urgency: "low" | "medium" | "high" | "critical"
  type: "medical" | "shelter" | "food" | "evacuation" | "other"
  description: string
  language: string
}

export function VoiceRecorder({ onTranscription, onEmergencyDetected }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcription, setTranscription] = useState("")
  const [emergencyData, setEmergencyData] = useState<EmergencyRequest | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  })

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioBlob(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const processAudio = async () => {
    if (!audioBlob) return

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("audio", audioBlob, "recording.wav")
      formData.append("language", selectedLanguage.code)

      const response = await fetch("/api/process-voice", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process audio")
      }

      const result = await response.json()
      setTranscription(result.transcription)
      setEmergencyData({ ...result.emergency, language: selectedLanguage.nativeName })

      onTranscription?.(result.transcription)
      if (result.emergency) {
        onEmergencyDetected?.({ ...result.emergency, language: selectedLanguage.nativeName })
      }
    } catch (error) {
      console.error("Error processing audio:", error)
      alert("Failed to process voice recording. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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
      {/* Language Selection */}
      <LanguageSelector onLanguageChange={setSelectedLanguage} showTTS={false} compact={true} />

      {/* Recording Interface */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Voice Emergency Request
          </CardTitle>
          <CardDescription>
            Speak clearly in {selectedLanguage.nativeName}. AI will extract critical information and prioritize your
            request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            {/* Recording Button */}
            <Button
              size="lg"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={cn(
                "w-24 h-24 rounded-full transition-all duration-200",
                isRecording
                  ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground",
              )}
            >
              {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </Button>

            {/* Recording Status */}
            <div className="text-center">
              {isRecording && (
                <div className="space-y-2">
                  <Badge variant="destructive" className="animate-pulse">
                    Recording: {formatTime(recordingTime)}
                  </Badge>
                  <p className="text-sm text-muted-foreground">Tap the square to stop recording</p>
                </div>
              )}

              {audioBlob && !isRecording && !isProcessing && (
                <div className="space-y-2">
                  <Badge variant="secondary">Recording ready</Badge>
                  <Button onClick={processAudio} className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Process Voice Request
                  </Button>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-2">
                  <Badge variant="outline" className="animate-pulse">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </Badge>
                  <p className="text-sm text-muted-foreground">AI is analyzing your request</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcription Results */}
      {transcription && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Voice Transcription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-foreground">{transcription}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Analysis */}
      {emergencyData && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Emergency Analysis</CardTitle>
            <CardDescription>AI has extracted the following critical information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Urgency Level</label>
                <Badge className={cn("mt-1", getUrgencyColor(emergencyData.urgency))}>
                  {emergencyData.urgency.toUpperCase()}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Emergency Type</label>
                <Badge variant="outline" className="mt-1">
                  {emergencyData.type.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Location</label>
              <p className="text-foreground mt-1">{emergencyData.location}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-foreground mt-1">{emergencyData.description}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Detected Language</label>
              <Badge variant="secondary" className="mt-1">
                {emergencyData.language}
              </Badge>
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Submit Emergency Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
