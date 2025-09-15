import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Clock, User, AlertTriangle, CheckCircle, XCircle, Filter } from "lucide-react"

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/50">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Activity Log</h2>
                <p className="text-muted-foreground">गतिविधि लॉग - Track all system activities and user actions</p>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Activity / सभी गतिविधि</TabsTrigger>
                <TabsTrigger value="emergencies">Emergencies / आपातकाल</TabsTrigger>
                <TabsTrigger value="users">Users / उपयोगकर्ता</TabsTrigger>
                <TabsTrigger value="system">System / सिस्टम</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest system activities and user actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "ACT-001",
                          type: "emergency",
                          action: "Emergency reported via voice",
                          user: "Arjun Sharma",
                          location: "Mumbai, Maharashtra",
                          time: "2 minutes ago",
                          status: "success",
                          icon: AlertTriangle,
                        },
                        {
                          id: "ACT-002",
                          type: "user",
                          action: "User logged in to dashboard",
                          user: "Priya Kapoor",
                          location: "Delhi NCR",
                          time: "5 minutes ago",
                          status: "success",
                          icon: User,
                        },
                        {
                          id: "ACT-003",
                          type: "emergency",
                          action: "Response team dispatched",
                          user: "System",
                          location: "Bangalore, Karnataka",
                          time: "8 minutes ago",
                          status: "success",
                          icon: CheckCircle,
                        },
                        {
                          id: "ACT-004",
                          type: "system",
                          action: "Database backup completed",
                          user: "System",
                          location: "Cloud Server",
                          time: "15 minutes ago",
                          status: "success",
                          icon: Activity,
                        },
                        {
                          id: "ACT-005",
                          type: "emergency",
                          action: "Emergency alert resolved",
                          user: "Rajesh Nair",
                          location: "Chennai, Tamil Nadu",
                          time: "22 minutes ago",
                          status: "success",
                          icon: CheckCircle,
                        },
                        {
                          id: "ACT-006",
                          type: "user",
                          action: "Failed login attempt",
                          user: "Unknown",
                          location: "Unknown",
                          time: "35 minutes ago",
                          status: "error",
                          icon: XCircle,
                        },
                      ].map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                activity.status === "success"
                                  ? "bg-green-500/10 text-green-700"
                                  : activity.status === "error"
                                    ? "bg-red-500/10 text-red-700"
                                    : "bg-blue-500/10 text-blue-700"
                              }`}
                            >
                              <activity.icon className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{activity.action}</span>
                                <Badge variant="outline" className="capitalize">
                                  {activity.type}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>By: {activity.user}</span>
                                <span>Location: {activity.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{activity.time}</span>
                            </div>
                            <Badge variant={activity.status === "success" ? "default" : "destructive"} className="mt-1">
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emergencies" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Activities</CardTitle>
                    <CardDescription>All emergency-related activities and responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Emergency Activity Log</h3>
                      <p className="text-muted-foreground mb-4">
                        Track all emergency reports, responses, and resolutions
                      </p>
                      <Button>View Emergency Activities</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Activities</CardTitle>
                    <CardDescription>User login, logout, and system interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">User Activity Tracking</h3>
                      <p className="text-muted-foreground mb-4">Monitor user sessions and system interactions</p>
                      <Button>View User Activities</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Activities</CardTitle>
                    <CardDescription>System maintenance, backups, and automated processes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">System Activity Monitor</h3>
                      <p className="text-muted-foreground mb-4">
                        Track system health, maintenance, and automated processes
                      </p>
                      <Button>View System Activities</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
