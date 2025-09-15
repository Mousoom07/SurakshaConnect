import SatelliteDataIntegration from "@/components/satellite-data-integration"

export default function SatellitePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Satellite Data Integration</h1>
          <p className="text-muted-foreground">
            AI-powered analysis of satellite imagery and drone footage to detect crisis hotspots and verify victim
            reports
          </p>
        </div>

        <SatelliteDataIntegration />
      </div>
    </div>
  )
}
