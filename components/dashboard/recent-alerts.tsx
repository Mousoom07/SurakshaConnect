import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, Clock, ExternalLink } from "lucide-react"

const recentAlerts = [
  {
    id: "1",
    type: "Medical Emergency",
    location: "Downtown Plaza, 5th Street",
    time: "2 minutes ago",
    severity: "high",
    status: "active",
  },
  {
    id: "2",
    type: "Fire Incident",
    location: "Residential Area, Oak Avenue",
    time: "15 minutes ago",
    severity: "critical",
    status: "responding",
  },
  {
    id: "3",
    type: "Traffic Accident",
    location: "Highway 101, Mile Marker 45",
    time: "32 minutes ago",
    severity: "medium",
    status: "resolved",
  },
  {
    id: "4",
    type: "Flood Warning",
    location: "River District",
    time: "1 hour ago",
    severity: "high",
    status: "monitoring",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "destructive"
    case "high":
      return "secondary"
    case "medium":
      return "outline"
    default:
      return "secondary"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "destructive"
    case "responding":
      return "secondary"
    case "resolved":
      return "outline"
    case "monitoring":
      return "outline"
    default:
      return "secondary"
  }
}

export function RecentAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Recent Alerts
        </CardTitle>
        <CardDescription>Latest emergency reports and incidents in your area</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{alert.type}</h4>
                  <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                  <Badge variant={getStatusColor(alert.status)}>{alert.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  )
}
