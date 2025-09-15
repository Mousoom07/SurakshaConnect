import React from "react"
import { Mic } from "lucide-react"

export default function VoiceAssistantButton() {
  return (
    <button
      aria-label="Voice Assistant"
      className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <Mic className="w-6 h-6 text-white" />
    </button>
  )
}
