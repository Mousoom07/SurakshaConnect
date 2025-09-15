import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { LocationTracker } from "@/components/location/location-tracker"
import { PoliceStations } from "@/components/location/police-stations"
import { EmergencyMap } from "@/components/location/emergency-map"
import { ShelterLocations } from "@/components/location/shelter-locations"

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-background dashboard-page">
      <DashboardHeader />

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/50">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">स्थान सेवाएं / Location Services</h2>
              <p className="text-muted-foreground">
                वास्तविक समय स्थान ट्रैकिंग और आपातकालीन सेवा एकीकरण / Real-time location tracking and emergency service
                integration
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <LocationTracker />
              <PoliceStations />
            </div>

            <ShelterLocations />

            <EmergencyMap />
          </div>
        </main>
      </div>
    </div>
  )
}
