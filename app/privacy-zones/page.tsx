import PrivacySafeZones from "@/components/privacy-safe-zones"

export default function PrivacyZonesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy & Safe Zones</h1>
          <p className="text-gray-600">
            Protect your identity in conflict zones while accessing verified safe locations.
          </p>
        </div>
        <PrivacySafeZones />
      </div>
    </div>
  )
}
