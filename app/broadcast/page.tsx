import { EmergencyBroadcastSystem } from "@/components/emergency-broadcast-system"

export default function BroadcastPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Emergency Broadcast System</h1>
          <p className="text-muted-foreground text-lg">
            Send mass alerts to affected areas with evacuation routes, safety instructions, and critical updates.
          </p>
        </div>

        <EmergencyBroadcastSystem />
      </div>
    </div>
  )
}
