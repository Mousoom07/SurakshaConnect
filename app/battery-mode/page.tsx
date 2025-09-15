import UltraLiteBatteryMode from "@/components/ultra-lite-battery-mode"

export default function BatteryModePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ultra-Lite Battery Mode</h1>
          <p className="text-muted-foreground">
            Emergency power-saving mode for critical situations when battery life is essential
          </p>
        </div>

        <UltraLiteBatteryMode />
      </div>
    </div>
  )
}
