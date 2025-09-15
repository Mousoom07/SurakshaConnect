import ARSurvivalGuide from "@/components/ar-survival-guide"

export default function ARGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AR Survival Guide</h1>
          <p className="text-muted-foreground">
            Use your camera to get real-time augmented reality survival instructions overlaid on your surroundings
          </p>
        </div>

        <ARSurvivalGuide />
      </div>
    </div>
  )
}
