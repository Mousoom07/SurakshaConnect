import FamilyReunificationAI from "@/components/family-reunification-ai"

export default function FamilyReunificationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Family Reunification AI</h1>
          <p className="text-muted-foreground">
            AI-powered system to help families find separated members using photo recognition, voice analysis, and
            description matching
          </p>
        </div>

        <FamilyReunificationAI />
      </div>
    </div>
  )
}
