import { PredictiveAnalyticsDashboard } from "@/components/predictive-analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Predictive Analytics Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            AI-powered forecasting of disaster patterns, resource needs, and emergency trends for proactive response
            planning.
          </p>
        </div>

        <PredictiveAnalyticsDashboard />
      </div>
    </div>
  )
}
