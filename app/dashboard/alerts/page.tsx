import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Clock, MapPin, User, Filter, Search, Bell } from "lucide-react"

export default function AlertsPage() {
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
                <h2 className="text-3xl font-bold tracking-tight">Active Alerts</h2>
                <p className="text-muted-foreground">सक्रिय अलर्ट - Monitor and manage active emergency alerts</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">3</div>
                  <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                  <Bell className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">7</div>
                  <p className="text-xs text-muted-foreground">High priority incidents</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Active</CardTitle>
                  <Clock className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">15</div>
                  <p className="text-xs text-muted-foreground">All active alerts</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active">Active Alerts / सक्रिय अलर्ट</TabsTrigger>
                <TabsTrigger value="critical">Critical / गंभीर</TabsTrigger>
                <TabsTrigger value="resolved">Resolved / हल किया गया</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      id: "ALT-001",
                      type: "Fire Emergency",
                      location: "Andheri West, Mumbai",
                      reporter: "Arjun Sharma",
                      time: "5 minutes ago",
                      priority: "Critical",
                      status: "Responding",
                      description: "Building fire reported at residential complex",
                    },
                    {
                      id: "ALT-002",
                      type: "Medical Emergency",
                      location: "Connaught Place, Delhi",
                      reporter: "Priya Kapoor",
                      time: "12 minutes ago",
                      priority: "High",
                      status: "Dispatched",
                      description: "Heart attack patient needs immediate medical attention",
                    },
                    {
                      id: "ALT-003",
                      type: "Traffic Accident",
                      location: "Electronic City, Bangalore",
                      reporter: "Rajesh Nair",
                      time: "18 minutes ago",
                      priority: "Medium",
                      status: "En Route",
                      description: "Multi-vehicle collision on main highway",
                    },
                    {
                      id: "ALT-004",
                      type: "Gas Leak",
                      location: "T. Nagar, Chennai",
                      reporter: "Lakshmi Iyer",
                      time: "25 minutes ago",
                      priority: "High",
                      status: "Investigating",
                      description: "Gas leak reported in residential area",
                    },
                    {
                      id: "ALT-005",
                      type: "Flood Warning",
                      location: "Hitech City, Hyderabad",
                      reporter: "System Alert",
                      time: "32 minutes ago",
                      priority: "Medium",
                      status: "Monitoring",
                      description: "Heavy rainfall causing waterlogging in low-lying areas",
                    },
                  ].map((alert) => (
                    <Card key={alert.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  alert.priority === "Critical"
                                    ? "bg-red-500 animate-pulse"
                                    : alert.priority === "High"
                                      ? "bg-orange-500"
                                      : "bg-yellow-500"
                                }`}
                              />
                              <div>
                                <h3 className="font-semibold text-lg">{alert.type}</h3>
                                <p className="text-sm text-muted-foreground">Alert ID: {alert.id}</p>
                              </div>
                            </div>

                            <p className="text-muted-foreground">{alert.description}</p>

                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{alert.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{alert.reporter}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{alert.time}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <div className="flex gap-2">
                              <Badge
                                variant={
                                  alert.priority === "Critical"
                                    ? "destructive"
                                    : alert.priority === "High"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {alert.priority}
                              </Badge>
                              <Badge variant="outline">{alert.status}</Badge>
                            </div>

                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm">Take Action</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="critical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Critical Emergency Alerts
                    </CardTitle>
                    <CardDescription>Alerts requiring immediate emergency response</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Critical Alert Management</h3>
                      <p className="text-muted-foreground mb-4">Monitor and respond to critical emergency situations</p>
                      <Button variant="destructive">View Critical Alerts</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resolved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resolved Alerts</CardTitle>
                    <CardDescription>Previously resolved emergency alerts and incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Alert History</h3>
                      <p className="text-muted-foreground mb-4">Review resolved alerts and response performance</p>
                      <Button>View Alert History</Button>
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
