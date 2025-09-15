import ChildElderlyMode from "@/components/child-elderly-mode"

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessibility Modes</h1>
          <p className="text-gray-600">Child-friendly and elderly-friendly interfaces for emergency situations.</p>
        </div>
        <ChildElderlyMode />
      </div>
    </div>
  )
}
