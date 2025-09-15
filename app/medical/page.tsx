import { MedicalFirstAidCompanion } from "@/components/medical-first-aid-companion"

export default function MedicalPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Medical First-Aid Companion</h1>
          <p className="text-muted-foreground text-lg">
            AI-powered medical emergency assistant providing step-by-step first aid instructions with visual guides.
          </p>
        </div>

        <MedicalFirstAidCompanion />
      </div>
    </div>
  )
}
