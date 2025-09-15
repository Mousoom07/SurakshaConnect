import { OfflineMode } from "@/components/offline-mode"

export default function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Offline Emergency Mode</h1>
          <p className="text-muted-foreground text-lg">
            Access essential survival guides and save emergency requests when network connectivity is limited.
          </p>
        </div>

        <OfflineMode />
      </div>
    </div>
  )
}
