import VoiceAICompanion from "@/components/voice-ai-companion"

export default function VoiceCompanionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice AI Companion</h1>
          <p className="text-gray-600">AI-powered emotional support and calming guidance during crisis situations.</p>
        </div>
        <VoiceAICompanion />
      </div>
    </div>
  )
}
