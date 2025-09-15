import { AIVerificationDashboard } from "@/components/ai-verification-dashboard"

export default function VerificationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">AI Verification System</h1>
          <p className="text-muted-foreground text-lg">
            Automated detection of duplicate requests, urgency scoring, and spam filtering for emergency responses.
          </p>
        </div>

        <AIVerificationDashboard />
      </div>
    </div>
  )
}
