import MisinformationFilter from "@/components/misinformation-filter"

export default function MisinformationFilterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Misinformation Filter</h1>
          <p className="text-muted-foreground">
            AI-powered system to detect, filter, and block false information during crisis situations
          </p>
        </div>

        <MisinformationFilter />
      </div>
    </div>
  )
}
