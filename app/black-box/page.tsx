import DigitalBlackBox from "@/components/digital-black-box"

export default function BlackBoxPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Black Box</h1>
          <p className="text-gray-600">
            Continuously logs your location, voice notes, and health status for emergency recovery.
          </p>
        </div>
        <DigitalBlackBox />
      </div>
    </div>
  )
}
