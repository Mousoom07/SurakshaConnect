import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Users, MapPin, Activity, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Active Emergencies",
    value: "12",
    change: "+3 from yesterday",
    trend: "up",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Response Teams",
    value: "8",
    change: "2 teams deployed",
    trend: "neutral",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Coverage Area",
    value: "45km²",
    change: "Expanded by 5km²",
    trend: "up",
    icon: MapPin,
    color: "text-secondary",
  },
  {
    title: "Response Time",
    value: "4.2min",
    change: "-0.8min improvement",
    trend: "down",
    icon: Activity,
    color: "text-accent",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
              {stat.trend === "down" && <TrendingDown className="h-3 w-3 text-green-500" />}
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
