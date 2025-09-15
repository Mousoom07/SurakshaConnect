"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Square, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VoiceAssistantWidget() {
  const [recording, setRecording] = useState(false)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    return () => {
      if (mediaRef.current && mediaRef.current.state !== "inactive") {
        mediaRef.current.stop()
      }
    }
  }, [])

  const toggleRecord = async () => {
    if (recording) {
      mediaRef.current?.stop()
      recognitionRef.current?.stop?.()
      setRecording(false)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRef.current = recorder
      recorder.start()

      // Lightweight voice navigation using Web Speech API (if available)
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.lang = "en-IN"
        recognition.continuous = true
        recognition.interimResults = false
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results).map((r: any) => r[0].transcript).join(" ").toLowerCase()
          if (transcript.includes("dashboard")) window.location.href = "/dashboard"
          if (transcript.includes("open sos") || transcript.includes("triage")) window.location.href = "/triage"
          if (transcript.includes("voice")) window.location.href = "/voice"
          if (transcript.includes("map")) window.location.href = "/map"
        }
        recognition.onerror = () => {}
        recognition.start()
        recognitionRef.current = recognition
      }

      setRecording(true)
      recorder.ondataavailable = () => {}
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
      }
    } catch (e) {
      console.error("Mic permission denied", e)
    }
  }

  return (
    <div className="fixed bottom-6 right-4 z-[98] flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <Button
          className={`rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover-lift shadow-lg text-white ${recording ? "animate-pulse-soft" : ""}`}
          size="icon"
          onClick={toggleRecord}
          aria-label="Voice Assistant"
        >
          {recording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  )
}