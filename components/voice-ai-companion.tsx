"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, Volume2, Heart, Brain, Clock, Headphones, MessageCircle, Wind, Activity } from "lucide-react"

interface ConversationEntry {
  id: string
  speaker: "user" | "ai"
  message: string
  timestamp: Date
  emotion?: "calm" | "anxious" | "scared" | "hopeful" | "sad"
  technique?: string
}

interface EmotionalState {
  stress: number
  anxiety: number
  hope: number
  calmness: number
  overall: "critical" | "high-stress" | "moderate" | "stable" | "calm"
}

interface BreathingExercise {
  name: string
  description: string
  inhale: number
  hold: number
  exhale: number
  cycles: number
}

export default function VoiceAICompanion() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isCompanionActive, setIsCompanionActive] = useState(false)
  const [conversation, setConversation] = useState<ConversationEntry[]>([])
  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    stress: 75,
    anxiety: 68,
    hope: 45,
    calmness: 32,
    overall: "high-stress",
  })
  const [selectedVoice, setSelectedVoice] = useState("compassionate")
  const [currentExercise, setCurrentExercise] = useState<BreathingExercise | null>(null)
  const [exerciseProgress, setExerciseProgress] = useState(0)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [totalSessions, setTotalSessions] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const exerciseTimerRef = useRef<NodeJS.Timeout | null>(null)

  const breathingExercises: BreathingExercise[] = [
    {
      name: "4-7-8 Calming",
      description: "Reduces anxiety and promotes relaxation",
      inhale: 4,
      hold: 7,
      exhale: 8,
      cycles: 4,
    },
    {
      name: "Box Breathing",
      description: "Used by military for stress control",
      inhale: 4,
      hold: 4,
      exhale: 4,
      cycles: 6,
    },
    {
      name: "Quick Calm",
      description: "Fast relief for panic situations",
      inhale: 3,
      hold: 3,
      exhale: 6,
      cycles: 8,
    },
  ]

  const aiResponses = {
    greeting: [
      "Hello, I'm here with you. You're not alone in this difficult time. How are you feeling right now?",
      "I'm your AI companion, and I'm here to help you stay calm and safe. Take a deep breath with me.",
      "You've reached out for support, and that shows incredible strength. I'm here to listen and help.",
    ],
    anxiety: [
      "I can hear the worry in your voice. Let's focus on your breathing together. You are safe in this moment.",
      "Anxiety is your mind trying to protect you, but right now, let's bring you back to the present. Feel your feet on the ground.",
      "You're experiencing something very human and understandable. Let's work through this together, one breath at a time.",
    ],
    fear: [
      "Fear is natural in crisis situations. You're being incredibly brave by reaching out. Let's focus on what you can control right now.",
      "I know this feels overwhelming, but you've survived difficult moments before. You have strength within you.",
      "Your fear shows you care about your safety, which is wise. Let's channel that into positive action.",
    ],
    hope: [
      "I can hear more strength in your voice now. You're doing so well by taking care of yourself.",
      "Every moment you stay calm and focused is a victory. You're building resilience right now.",
      "Help is coming, and you're handling this crisis with remarkable courage. Keep going.",
    ],
    breathing: [
      "Let's breathe together. Inhale slowly through your nose... hold it... now exhale through your mouth.",
      "Focus only on your breath. Nothing else matters right now except this moment of calm.",
      "Feel your chest rise and fall. This is your anchor to the present moment.",
    ],
  }

  const startCompanion = async () => {
    setIsCompanionActive(true)
    setTotalSessions((prev) => prev + 1)

    // Start session timer
    sessionTimerRef.current = setInterval(() => {
      setSessionDuration((prev) => prev + 1)
    }, 1000)

    // Initial greeting
    const greeting = aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)]
    addConversationEntry("ai", greeting)
    speakMessage(greeting)
  }

  const stopCompanion = () => {
    setIsCompanionActive(false)
    setIsListening(false)
    setIsSpeaking(false)
    setSessionDuration(0)

    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current)
    }
    if (exerciseTimerRef.current) {
      clearInterval(exerciseTimerRef.current)
    }
  }

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.start()
      setIsListening(true)

      // Simulate voice recognition and emotional analysis
      setTimeout(() => {
        stopListening()
        analyzeUserInput("I'm feeling really scared and don't know what to do")
      }, 3000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop()
      setIsListening(false)
    }
  }

  const analyzeUserInput = (input: string) => {
    addConversationEntry("user", input)

    // Simulate emotional analysis
    const emotions = {
      scared: input.toLowerCase().includes("scared") || input.toLowerCase().includes("afraid"),
      anxious: input.toLowerCase().includes("anxious") || input.toLowerCase().includes("worried"),
      hopeful: input.toLowerCase().includes("better") || input.toLowerCase().includes("hope"),
      sad: input.toLowerCase().includes("sad") || input.toLowerCase().includes("cry"),
    }

    // Update emotional state
    setEmotionalState((prev) => ({
      stress: emotions.scared ? Math.min(100, prev.stress + 10) : Math.max(0, prev.stress - 5),
      anxiety: emotions.anxious ? Math.min(100, prev.anxiety + 15) : Math.max(0, prev.anxiety - 8),
      hope: emotions.hopeful ? Math.min(100, prev.hope + 20) : Math.max(0, prev.hope - 2),
      calmness:
        emotions.scared || emotions.anxious ? Math.max(0, prev.calmness - 10) : Math.min(100, prev.calmness + 10),
      overall:
        prev.stress > 80
          ? "critical"
          : prev.stress > 60
            ? "high-stress"
            : prev.stress > 40
              ? "moderate"
              : prev.stress > 20
                ? "stable"
                : "calm",
    }))

    // Generate appropriate response
    let responseCategory = "anxiety"
    if (emotions.scared) responseCategory = "fear"
    else if (emotions.hopeful) responseCategory = "hope"
    else if (emotions.anxious) responseCategory = "anxiety"

    const response =
      aiResponses[responseCategory as keyof typeof aiResponses][
        Math.floor(Math.random() * aiResponses[responseCategory as keyof typeof aiResponses].length)
      ]

    setTimeout(() => {
      addConversationEntry("ai", response, responseCategory as any)
      speakMessage(response)
    }, 1000)
  }

  const speakMessage = (message: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(message)

      // Voice settings based on selection
      utterance.rate = selectedVoice === "energetic" ? 1.1 : 0.8
      utterance.pitch = selectedVoice === "warm" ? 1.2 : selectedVoice === "professional" ? 0.9 : 1.0
      utterance.volume = 0.8

      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const addConversationEntry = (speaker: "user" | "ai", message: string, emotion?: string, technique?: string) => {
    const entry: ConversationEntry = {
      id: Date.now().toString(),
      speaker,
      message,
      timestamp: new Date(),
      emotion: emotion as any,
      technique,
    }
    setConversation((prev) => [...prev, entry])
  }

  const startBreathingExercise = (exercise: BreathingExercise) => {
    setCurrentExercise(exercise)
    setExerciseProgress(0)

    let currentCycle = 0
    let phase = "inhale" // inhale, hold, exhale
    let phaseTime = 0

    const guidance = {
      inhale: `Breathe in slowly for ${exercise.inhale} seconds`,
      hold: `Hold your breath for ${exercise.hold} seconds`,
      exhale: `Exhale slowly for ${exercise.exhale} seconds`,
    }

    speakMessage(`Let's start the ${exercise.name} breathing exercise. ${guidance.inhale}`)

    exerciseTimerRef.current = setInterval(() => {
      phaseTime++

      if (phase === "inhale" && phaseTime >= exercise.inhale) {
        phase = "hold"
        phaseTime = 0
        speakMessage(guidance.hold)
      } else if (phase === "hold" && phaseTime >= exercise.hold) {
        phase = "exhale"
        phaseTime = 0
        speakMessage(guidance.exhale)
      } else if (phase === "exhale" && phaseTime >= exercise.exhale) {
        currentCycle++
        phase = "inhale"
        phaseTime = 0

        if (currentCycle >= exercise.cycles) {
          setCurrentExercise(null)
          setExerciseProgress(100)
          speakMessage("Excellent work. You've completed the breathing exercise. How do you feel now?")
          addConversationEntry("ai", "Breathing exercise completed successfully", "calm", exercise.name)

          // Improve emotional state after exercise
          setEmotionalState((prev) => ({
            stress: Math.max(0, prev.stress - 20),
            anxiety: Math.max(0, prev.anxiety - 25),
            hope: Math.min(100, prev.hope + 15),
            calmness: Math.min(100, prev.calmness + 30),
            overall: "stable",
          }))

          if (exerciseTimerRef.current) {
            clearInterval(exerciseTimerRef.current)
          }
        } else {
          speakMessage(guidance.inhale)
        }
      }

      const totalPhaseTime = exercise.inhale + exercise.hold + exercise.exhale
      const cycleProgress = ((currentCycle * totalPhaseTime + phaseTime) / (exercise.cycles * totalPhaseTime)) * 100
      setExerciseProgress(cycleProgress)
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getEmotionalColor = (level: number) => {
    if (level > 70) return "text-red-500"
    if (level > 40) return "text-orange-500"
    return "text-green-500"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Voice AI Companion
            <Badge variant={isCompanionActive ? "default" : "secondary"} className="ml-auto">
              {isCompanionActive ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
          <CardDescription>AI-powered emotional support and calming guidance during crisis situations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Companion Control */}
          <div className="flex items-center justify-center gap-4">
            {!isCompanionActive ? (
              <Button onClick={startCompanion} size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Headphones className="h-5 w-5 mr-2" />
                Start AI Companion
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                >
                  {isListening ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
                  {isListening ? "Stop Talking" : "Talk to AI"}
                </Button>
                <Button onClick={stopCompanion} variant="outline" size="lg">
                  End Session
                </Button>
              </div>
            )}
          </div>

          {/* Voice Settings */}
          {isCompanionActive && (
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Voice Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label>AI Voice Style</Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compassionate">Compassionate & Gentle</SelectItem>
                      <SelectItem value="warm">Warm & Nurturing</SelectItem>
                      <SelectItem value="professional">Professional & Calm</SelectItem>
                      <SelectItem value="energetic">Uplifting & Energetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Session: {formatTime(sessionDuration)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Total Sessions: {totalSessions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emotional State Monitor */}
          {isCompanionActive && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Emotional State Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Stress Level</span>
                      <span className={getEmotionalColor(emotionalState.stress)}>{emotionalState.stress}%</span>
                    </div>
                    <Progress value={emotionalState.stress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Anxiety</span>
                      <span className={getEmotionalColor(emotionalState.anxiety)}>{emotionalState.anxiety}%</span>
                    </div>
                    <Progress value={emotionalState.anxiety} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hope</span>
                      <span className="text-blue-500">{emotionalState.hope}%</span>
                    </div>
                    <Progress value={emotionalState.hope} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Calmness</span>
                      <span className="text-green-500">{emotionalState.calmness}%</span>
                    </div>
                    <Progress value={emotionalState.calmness} className="h-2" />
                  </div>
                </div>

                <div className="text-center">
                  <Badge
                    variant={
                      emotionalState.overall === "critical"
                        ? "destructive"
                        : emotionalState.overall === "high-stress"
                          ? "destructive"
                          : emotionalState.overall === "moderate"
                            ? "secondary"
                            : "default"
                    }
                    className="text-sm"
                  >
                    Overall State: {emotionalState.overall.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Breathing Exercises */}
          {isCompanionActive && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wind className="h-5 w-5" />
                  Guided Breathing Exercises
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentExercise ? (
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{currentExercise.name}</h3>
                      <p className="text-gray-600">{currentExercise.description}</p>
                    </div>
                    <div className="space-y-2">
                      <Progress value={exerciseProgress} className="h-4" />
                      <p className="text-sm text-gray-500">{Math.round(exerciseProgress)}% Complete</p>
                    </div>
                    <div className="animate-pulse">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Wind className="h-12 w-12 text-blue-500" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {breathingExercises.map((exercise, idx) => (
                      <Card
                        key={idx}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => startBreathingExercise(exercise)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{exercise.name}</h4>
                              <p className="text-sm text-gray-600">{exercise.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {exercise.inhale}s inhale • {exercise.hold}s hold • {exercise.exhale}s exhale •{" "}
                                {exercise.cycles} cycles
                              </p>
                            </div>
                            <Button size="sm">
                              <Wind className="h-4 w-4 mr-2" />
                              Start
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Conversation History */}
          {isCompanionActive && conversation.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conversation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto space-y-3 p-3 border rounded bg-gray-50">
                  {conversation.map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex ${entry.speaker === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          entry.speaker === "user" ? "bg-blue-500 text-white" : "bg-white border"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {entry.speaker === "ai" && <Brain className="h-3 w-3" />}
                          <span className="text-xs font-medium">{entry.speaker === "ai" ? "AI Companion" : "You"}</span>
                          {entry.emotion && (
                            <Badge variant="outline" className="text-xs">
                              {entry.emotion}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{entry.message}</p>
                        {entry.technique && <p className="text-xs mt-1 opacity-75">Technique: {entry.technique}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Indicators */}
          {isCompanionActive && (
            <div className="flex justify-center gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                  isListening ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Mic className="h-4 w-4" />
                <span className="text-sm">{isListening ? "Listening..." : "Not Listening"}</span>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                  isSpeaking ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Volume2 className="h-4 w-4" />
                <span className="text-sm">{isSpeaking ? "Speaking..." : "Silent"}</span>
              </div>
            </div>
          )}

          {/* Help Notice */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Heart className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Mental Health Support</h4>
                  <p className="text-sm text-green-700">
                    This AI companion provides emotional support and calming techniques. For severe mental health
                    crises, please contact professional mental health services or emergency services immediately.
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
