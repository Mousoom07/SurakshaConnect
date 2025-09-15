import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ResponseTeam } from "@/components/emergency/response-team"

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/50">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Response Teams</h2>
              <p className="text-muted-foreground">प्रतिक्रिया टीमें - Manage emergency response teams across India</p>
            </div>

            <ResponseTeam />
          </div>
        </main>
      </div>
    </div>
  )
}
