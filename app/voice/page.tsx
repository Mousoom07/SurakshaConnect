"use client"

import { VoiceRecorder } from "@/components/voice-recorder"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function VoicePage() {
  const handleTranscription = (text: string) => {
    console.log("Transcription received:", text)
  }

  const handleEmergencyDetected = (emergency: any) => {
    console.log("Emergency detected:", emergency)
    // Here you would typically send to triage system
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 brand-tile rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Voice Emergency Request</h1>
                  <p className="text-sm text-muted-foreground">Speak in any language</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <VoiceRecorder onTranscription={handleTranscription} onEmergencyDetected={handleEmergencyDetected} />
      </main>
    </div>
  )
}
