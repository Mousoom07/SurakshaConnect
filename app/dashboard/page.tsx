import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, Phone, Shield, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/50">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Welcome back, John</h2>
              <p className="text-muted-foreground">Here's what's happening in your emergency response area today.</p>
            </div>

            {/* Stats Overview */}
            <DashboardStats />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Recent Alerts */}
              <div className="md:col-span-2">
                <RecentAlerts />
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used emergency response tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Map className="h-4 w-4" />
                    View Emergency Map
                  </Button>
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Phone className="h-4 w-4" />
                    Contact Emergency Services
                  </Button>
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Users className="h-4 w-4" />
                    Deploy Response Team
                  </Button>
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Shield className="h-4 w-4" />
                    Safety Resources
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Dashboard Content */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Response Performance</CardTitle>
                  <CardDescription>Your team's emergency response metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Response Time</span>
                      <span className="text-2xl font-bold text-primary">4.2min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-2xl font-bold text-secondary">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cases Resolved Today</span>
                      <span className="text-2xl font-bold text-accent">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Status</CardTitle>
                  <CardDescription>Current availability of response teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Available Teams</span>
                      <span className="text-2xl font-bold text-green-600">6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Deployed Teams</span>
                      <span className="text-2xl font-bold text-yellow-600">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Off Duty</span>
                      <span className="text-2xl font-bold text-muted-foreground">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
