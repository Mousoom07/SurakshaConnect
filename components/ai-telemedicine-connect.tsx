"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Video,
  MessageSquare,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Stethoscope,
  AlertTriangle,
  Clock,
  Globe,
} from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialty: string
  languages: string[]
  availability: "available" | "busy" | "offline"
  rating: number
  responseTime: string
}

interface TriageData {
  severity: "critical" | "urgent" | "moderate" | "low"
  symptoms: string[]
  vitals: {
    heartRate?: number
    bloodPressure?: string
    temperature?: number
    oxygenSat?: number
  }
  aiAssessment: string
}

export default function AITelemedicineConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [symptoms, setSymptoms] = useState("")
  const [language, setLanguage] = useState("en")
  const [triageData, setTriageData] = useState<TriageData | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [translatedText, setTranslatedText] = useState("")
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: "user" | "doctor" | "ai"; message: string; timestamp: Date }>
  >([])

  const videoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const availableDoctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      specialty: "Emergency Medicine",
      languages: ["English", "Mandarin", "Spanish"],
      availability: "available",
      rating: 4.9,
      responseTime: "< 2 min",
    },
    {
      id: "2",
      name: "Dr. Ahmed Hassan",
      specialty: "Trauma Surgery",
      languages: ["English", "Arabic", "French"],
      availability: "available",
      rating: 4.8,
      responseTime: "< 3 min",
    },
    {
      id: "3",
      name: "Dr. Maria Rodriguez",
      specialty: "Pediatrics",
      languages: ["Spanish", "English", "Portuguese"],
      availability: "busy",
      rating: 4.9,
      responseTime: "< 5 min",
    },
  ]

  const performAITriage = async () => {
    if (!symptoms.trim()) return

    // Simulate AI triage analysis
    const mockTriage: TriageData = {
      severity:
        symptoms.toLowerCase().includes("chest pain") || symptoms.toLowerCase().includes("bleeding")
          ? "critical"
          : symptoms.toLowerCase().includes("fever") || symptoms.toLowerCase().includes("pain")
            ? "urgent"
            : "moderate",
      symptoms: symptoms.split(",").map((s) => s.trim()),
      vitals: {
        heartRate: Math.floor(Math.random() * 40) + 60,
        bloodPressure: `${Math.floor(Math.random() * 40) + 110}/${Math.floor(Math.random() * 20) + 70}`,
        temperature: Math.round((Math.random() * 4 + 97) * 10) / 10,
        oxygenSat: Math.floor(Math.random() * 10) + 90,
      },
      aiAssessment: `Based on reported symptoms, this appears to be a ${symptoms.toLowerCase().includes("chest pain") ? "cardiac emergency requiring immediate attention" : "medical situation requiring professional evaluation"}. Recommended priority: ${symptoms.toLowerCase().includes("bleeding") ? "CRITICAL - immediate intervention needed" : "URGENT - medical consultation advised"}.`,
    }

    setTriageData(mockTriage)
  }

  const connectToDoctor = async (doctor: Doctor) => {
    setIsConnecting(true)
    setSelectedDoctor(doctor)

    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsConnecting(false)
    setIsConnected(true)

    // Add initial AI message
    setChatMessages([
      {
        id: "1",
        sender: "ai",
        message: `Connected to ${doctor.name}. AI Translation active for ${language}. Triage data has been shared with the doctor.`,
        timestamp: new Date(),
      },
    ])
  }

  const translateMessage = async (message: string, targetLang: string) => {
    // Simulate AI translation
    const translations: Record<string, string> = {
      en: message,
      es: `[ES] ${message}`,
      fr: `[FR] ${message}`,
      ar: `[AR] ${message}`,
      zh: `[ZH] ${message}`,
    }
    return translations[targetLang] || message
  }

  const sendMessage = async (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "user" as const,
      message,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, newMessage])

    // Simulate AI translation and doctor response
    setTimeout(async () => {
      const translated = await translateMessage(message, "en")
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: "ai" as const,
        message: `[AI Translation] Patient says: "${translated}"`,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, aiResponse])

      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse = {
          id: (Date.now() + 2).toString(),
          sender: "doctor" as const,
          message: `Thank you for that information. Based on your symptoms and the AI triage, I recommend...`,
          timestamp: new Date(),
        }
        setChatMessages((prev) => [...prev, doctorResponse])
      }, 1500)
    }, 1000)
  }

  useEffect(() => {
    if (symptoms) {
      performAITriage()
    }
  }, [symptoms])

  if (isConnected && selectedDoctor) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-green-500" />
              Connected to {selectedDoctor.name}
              <Badge variant="outline" className="ml-auto">
                <Globe className="h-3 w-3 mr-1" />
                AI Translation: {language.toUpperCase()}
              </Badge>
            </CardTitle>
            <CardDescription>{selectedDoctor.specialty} • AI Triage Assistant Active</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video Call Interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative bg-gray-900 rounded-lg aspect-video">
                <video ref={remoteVideoRef} className="w-full h-full object-cover rounded-lg" autoPlay playsInline />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  Dr. {selectedDoctor.name}
                </div>
              </div>
              <div className="relative bg-gray-800 rounded-lg aspect-video">
                <video ref={videoRef} className="w-full h-full object-cover rounded-lg" autoPlay playsInline muted />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">You</div>
              </div>
            </div>

            {/* Call Controls */}
            <div className="flex justify-center gap-2">
              <Button variant={isMuted ? "destructive" : "outline"} size="sm" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                variant={isVideoOff ? "destructive" : "outline"}
                size="sm"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setIsConnected(false)}>
                End Call
              </Button>
            </div>

            {/* AI Triage Summary */}
            {triageData && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    AI Triage Summary (Shared with Doctor)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Severity</Label>
                      <Badge variant={triageData.severity === "critical" ? "destructive" : "secondary"}>
                        {triageData.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <Label>Heart Rate</Label>
                      <p>{triageData.vitals.heartRate} BPM</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Label>AI Assessment</Label>
                    <p className="text-sm text-gray-600">{triageData.aiAssessment}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Chat Interface */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Real-time Chat with AI Translation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 overflow-y-auto space-y-2 mb-4 p-2 border rounded">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white"
                            : msg.sender === "ai"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {msg.sender !== "user" && (
                          <div className="font-semibold text-xs mb-1">
                            {msg.sender === "ai" ? "AI Assistant" : selectedDoctor.name}
                          </div>
                        )}
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        sendMessage(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-blue-500" />
            AI Telemedicine Connect
          </CardTitle>
          <CardDescription>
            Connect with volunteer doctors worldwide. AI provides translation and triage assistance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Symptom Input */}
          <div className="space-y-2">
            <Label htmlFor="symptoms">Describe your symptoms</Label>
            <Textarea
              id="symptoms"
              placeholder="e.g., chest pain, difficulty breathing, fever..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-20"
            />
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <Label>Your preferred language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* AI Triage Results */}
          {triageData && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  AI Triage Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center gap-4">
                  <Badge variant={triageData.severity === "critical" ? "destructive" : "secondary"}>
                    {triageData.severity.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-600">Priority Level</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>Heart Rate</Label>
                    <p>{triageData.vitals.heartRate} BPM</p>
                  </div>
                  <div>
                    <Label>Blood Pressure</Label>
                    <p>{triageData.vitals.bloodPressure}</p>
                  </div>
                </div>
                <div>
                  <Label>AI Assessment</Label>
                  <p className="text-sm text-gray-600">{triageData.aiAssessment}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Doctors */}
          <div className="space-y-3">
            <Label>Available Doctors</Label>
            {availableDoctors.map((doctor) => (
              <Card key={doctor.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{doctor.name}</h4>
                        <Badge variant={doctor.availability === "available" ? "default" : "secondary"}>
                          {doctor.availability}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {doctor.responseTime}
                        <span>•</span>
                        <span>★ {doctor.rating}</span>
                        <span>•</span>
                        <span>{doctor.languages.join(", ")}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => connectToDoctor(doctor)}
                      disabled={doctor.availability !== "available" || isConnecting}
                      size="sm"
                    >
                      {isConnecting ? "Connecting..." : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Notice */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Emergency Notice</h4>
                  <p className="text-sm text-red-700">
                    If this is a life-threatening emergency, call local emergency services immediately. Telemedicine is
                    for consultation and guidance only.
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
