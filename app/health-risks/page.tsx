import HealthRiskPrediction from "@/components/health-risk-prediction"

export default function HealthRisksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Health Risk Prediction</h1>
          <p className="text-muted-foreground">
            AI-powered prediction of secondary health risks including disease outbreaks, contamination, and aftershocks
          </p>
        </div>

        <HealthRiskPrediction />
      </div>
    </div>
  )
}
