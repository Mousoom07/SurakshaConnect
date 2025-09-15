import { MultiModalInput } from "@/components/multi-modal-input"

export default function EmergencyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Emergency Reporting</h1>
          <p className="text-muted-foreground text-lg">
            Report emergencies using voice, text, or images. AI will analyze and prioritize your request.
          </p>
        </div>

        <MultiModalInput />
      </div>
    </div>
  )
}
