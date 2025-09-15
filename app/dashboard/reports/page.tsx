import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Calendar, TrendingUp, AlertTriangle, Users, MapPin, Clock } from "lucide-react"

export default function ReportsPage() {
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
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Emergency Reports</h2>
              <p className="text-muted-foreground">आपातकालीन रिपोर्ट - Comprehensive incident reporting and analytics</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview / अवलोकन</TabsTrigger>
                <TabsTrigger value="incidents">Incidents / घटनाएं</TabsTrigger>
                <TabsTrigger value="analytics">Analytics / विश्लेषण</TabsTrigger>
                <TabsTrigger value="export">Export / निर्यात</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="dashboard-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,247</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Response Teams</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">89</div>
                      <p className="text-xs text-muted-foreground">Active across India</p>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.1min</div>
                      <p className="text-xs text-muted-foreground">-15% improvement</p>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">500+</div>
                      <p className="text-xs text-muted-foreground">Across India</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Recent Incident Reports</CardTitle>
                    <CardDescription>Latest emergency incidents across Indian cities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "INC-001",
                          type: "Fire",
                          location: "Mumbai, Maharashtra",
                          time: "2 hours ago",
                          status: "Resolved",
                        },
                        {
                          id: "INC-002",
                          type: "Medical",
                          location: "Delhi NCR",
                          time: "4 hours ago",
                          status: "In Progress",
                        },
                        {
                          id: "INC-003",
                          type: "Accident",
                          location: "Bangalore, Karnataka",
                          time: "6 hours ago",
                          status: "Resolved",
                        },
                        {
                          id: "INC-004",
                          type: "Flood",
                          location: "Chennai, Tamil Nadu",
                          time: "8 hours ago",
                          status: "Monitoring",
                        },
                      ].map((incident) => (
                        <div
                          key={incident.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-muted/20 text-foreground"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{incident.id}</span>
                              <Badge variant="outline">{incident.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{incident.location}</p>
                            <p className="text-xs text-muted-foreground">{incident.time}</p>
                          </div>
                          <Badge
                            variant={
                              incident.status === "Resolved"
                                ? "default"
                                : incident.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {incident.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="incidents" className="space-y-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle>Incident Management</CardTitle>
                    <CardDescription>Manage and track all emergency incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Incident Tracking System</h3>
                      <p className="text-muted-foreground mb-4">
                        Comprehensive incident management with real-time updates and status tracking
                      </p>
                      <Button>View All Incidents</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>Performance metrics and trend analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                      <p className="text-muted-foreground mb-4">
                        Detailed performance metrics and predictive analytics for emergency response
                      </p>
                      <Button>View Analytics</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Export Reports</CardTitle>
                    <CardDescription>Download comprehensive reports in various formats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Button
                          variant="outline"
                          className="h-20 flex-col bg-muted/20 hover:bg-muted/40 text-foreground"
                        >
                          <Download className="h-6 w-6 mb-2" />
                          <span>Monthly Report</span>
                          <span className="text-xs text-muted-foreground">PDF Format</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-20 flex-col bg-muted/20 hover:bg-muted/40 text-foreground"
                        >
                          <Download className="h-6 w-6 mb-2" />
                          <span>Incident Data</span>
                          <span className="text-xs text-muted-foreground">CSV Format</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-20 flex-col bg-muted/20 hover:bg-muted/40 text-foreground"
                        >
                          <Calendar className="h-6 w-6 mb-2" />
                          <span>Custom Range</span>
                          <span className="text-xs text-muted-foreground">Select Dates</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-20 flex-col bg-muted/20 hover:bg-muted/40 text-foreground"
                        >
                          <TrendingUp className="h-6 w-6 mb-2" />
                          <span>Analytics Report</span>
                          <span className="text-xs text-muted-foreground">Excel Format</span>
                        </Button>
                      </div>
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
