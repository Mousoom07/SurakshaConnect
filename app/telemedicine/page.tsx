import AITelemedicineConnect from "@/components/ai-telemedicine-connect"

export default function TelemedicinePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Telemedicine Connect</h1>
          <p className="text-gray-600">
            Connect with volunteer doctors worldwide with AI-powered translation and triage assistance.
          </p>
        </div>
        <AITelemedicineConnect />
      </div>
    </div>
  )
}
