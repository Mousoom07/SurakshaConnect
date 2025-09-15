import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, MapPin, AlertTriangle, Users, Zap, Filter, Layers } from "lucide-react"

export default function MapPage() {
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
                <h2 className="text-3xl font-bold tracking-tight">Emergency Map</h2>
                <p className="text-muted-foreground">आपातकालीन मानचित्र - Real-time emergency incidents across India</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Layers className="h-4 w-4 mr-2" />
                  Layers
                </Button>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Badge variant="destructive" className="animate-pulse">
                  Live
                </Badge>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">15</div>
                  <p className="text-xs text-muted-foreground">Across India</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Teams</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">89</div>
                  <p className="text-xs text-muted-foreground">Deployed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
                  <MapPin className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">500+</div>
                  <p className="text-xs text-muted-foreground">Indian Cities</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                  <Zap className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">2.1min</div>
                  <p className="text-xs text-muted-foreground">Response Time</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="live" className="space-y-6">
              <TabsList>
                <TabsTrigger value="live">Live Map / लाइव मैप</TabsTrigger>
                <TabsTrigger value="incidents">Incidents / घटनाएं</TabsTrigger>
                <TabsTrigger value="teams">Teams / टीमें</TabsTrigger>
                <TabsTrigger value="analytics">Analytics / विश्लेषण</TabsTrigger>
              </TabsList>

              <TabsContent value="live" className="space-y-6">
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="h-5 w-5 text-primary" />
                      Live Emergency Map
                      <Badge variant="destructive" className="animate-pulse ml-2">
                        Live
                      </Badge>
                    </CardTitle>
                    <CardDescription>Real-time emergency incidents and response teams across India</CardDescription>
                  </CardHeader>
                  <CardContent className="h-full">
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center space-y-4">
                        <Map className="h-16 w-16 text-muted-foreground mx-auto" />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Interactive Emergency Map</h3>
                          <p className="text-muted-foreground mb-4 max-w-md">
                            Real-time visualization of emergency incidents, response teams, and resources across Indian
                            cities
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            <Badge variant="outline" className="bg-red-500/10 text-red-700">
                              🔴 Critical Incidents
                            </Badge>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-700">
                              🚓 Police Units
                            </Badge>
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-700">
                              🚒 Fire Stations
                            </Badge>
                            <Badge variant="outline" className="bg-green-500/10 text-green-700">
                              🏥 Medical Teams
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="incidents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Incidents</CardTitle>
                    <CardDescription>Latest emergency incidents plotted on the map</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "INC-001",
                          type: "Fire Emergency",
                          location: "Andheri West, Mumbai",
                          coordinates: "19.1334, 72.8267",
                          time: "5 minutes ago",
                          severity: "Critical",
                          status: "Responding",
                        },
                        {
                          id: "INC-002",
                          type: "Medical Emergency",
                          location: "Connaught Place, Delhi",
                          coordinates: "28.6315, 77.2167",
                          time: "12 minutes ago",
                          severity: "High",
                          status: "Dispatched",
                        },
                        {
                          id: "INC-003",
                          type: "Traffic Accident",
                          location: "Electronic City, Bangalore",
                          coordinates: "12.8456, 77.6603",
                          time: "18 minutes ago",
                          severity: "Medium",
                          status: "En Route",
                        },
                      ].map((incident) => (
                        <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  incident.severity === "Critical"
                                    ? "bg-red-500 animate-pulse"
                                    : incident.severity === "High"
                                      ? "bg-orange-500"
                                      : "bg-yellow-500"
                                }`}
                              />
                              <span className="font-medium">{incident.type}</span>
                              <Badge variant="outline">{incident.id}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {incident.location}
                              </span>
                              <span>{incident.coordinates}</span>
                              <span>{incident.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                incident.severity === "Critical"
                                  ? "destructive"
                                  : incident.severity === "High"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {incident.severity}
                            </Badge>
                            <Button size="sm" variant="outline">
                              View on Map
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teams" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Response Teams</CardTitle>
                    <CardDescription>Active response teams and their locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Response Team Tracking</h3>
                      <p className="text-muted-foreground mb-4">
                        Real-time locations and status of emergency response teams across India
                      </p>
                      <Button>View Team Locations</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Map Analytics</CardTitle>
                    <CardDescription>Geographic analysis and incident patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Geographic Analytics</h3>
                      <p className="text-muted-foreground mb-4">
                        Analyze incident patterns, response times, and resource distribution
                      </p>
                      <Button>View Analytics</Button>
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
