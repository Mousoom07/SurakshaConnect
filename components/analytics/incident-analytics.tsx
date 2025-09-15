"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, Clock, Users, AlertTriangle, CheckCircle, Download, Filter } from "lucide-react"

const responseTimeData = [
  { month: "Jan", avgTime: 4.2, target: 5.0 },
  { month: "Feb", avgTime: 3.8, target: 5.0 },
  { month: "Mar", avgTime: 4.1, target: 5.0 },
  { month: "Apr", avgTime: 3.9, target: 5.0 },
  { month: "May", avgTime: 4.3, target: 5.0 },
  { month: "Jun", avgTime: 3.7, target: 5.0 },
]

const incidentTypeData = [
  { name: "Medical", value: 35, color: "#ef4444" },
  { name: "Fire", value: 25, color: "#f97316" },
  { name: "Rescue", value: 20, color: "#3b82f6" },
  { name: "Evacuation", value: 15, color: "#10b981" },
  { name: "Other", value: 5, color: "#6b7280" },
]

const dailyIncidentsData = [
  { day: "Mon", incidents: 12, resolved: 11 },
  { day: "Tue", incidents: 15, resolved: 14 },
  { day: "Wed", incidents: 8, resolved: 8 },
  { day: "Thu", incidents: 18, resolved: 16 },
  { day: "Fri", incidents: 22, resolved: 20 },
  { day: "Sat", incidents: 14, resolved: 13 },
  { day: "Sun", incidents: 10, resolved: 10 },
]

const performanceMetrics = [
  {
    title: "Average Response Time",
    value: "3.9 min",
    change: "-0.3 min",
    trend: "down",
    target: "< 5 min",
    status: "good",
  },
  {
    title: "Resolution Rate",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    target: "> 90%",
    status: "excellent",
  },
  {
    title: "Team Utilization",
    value: "78%",
    change: "+5%",
    trend: "up",
    target: "70-85%",
    status: "good",
  },
  {
    title: "Critical Incidents",
    value: "3",
    change: "-2",
    trend: "down",
    target: "< 5",
    status: "excellent",
  },
]

const teamPerformanceData = [
  { team: "Team Alpha", incidents: 45, avgTime: 3.2, successRate: 96 },
  { team: "Team Beta", incidents: 38, avgTime: 4.1, successRate: 92 },
  { team: "Team Gamma", incidents: 42, avgTime: 3.8, successRate: 94 },
  { team: "Team Delta", incidents: 35, avgTime: 4.5, successRate: 89 },
]

export function IncidentAnalytics() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("response-time")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Incident Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive performance metrics and insights for emergency response operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {index === 0 && <Clock className="w-5 h-5 text-primary" />}
                  {index === 1 && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {index === 2 && <Users className="w-5 h-5 text-blue-600" />}
                  {index === 3 && <AlertTriangle className="w-5 h-5 text-red-600" />}
                </div>
                <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{metric.value}</span>
                  <div className="flex items-center gap-1 text-sm">
                    {getTrendIcon(metric.trend)}
                    <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="response-time">Response Time</TabsTrigger>
          <TabsTrigger value="incident-types">Incident Types</TabsTrigger>
          <TabsTrigger value="daily-trends">Daily Trends</TabsTrigger>
          <TabsTrigger value="team-performance">Team Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="response-time" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Trends</CardTitle>
              <CardDescription>Average response time compared to target benchmarks over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avgTime"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Average Response Time"
                  />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incident-types" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Distribution</CardTitle>
                <CardDescription>Breakdown of incident types by frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incidentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {incidentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incident Type Details</CardTitle>
                <CardDescription>Detailed breakdown with statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidentTypeData.map((type, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type.color }} />
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{type.value}%</div>
                        <div className="text-sm text-muted-foreground">
                          ~{Math.round((type.value / 100) * 150)} incidents
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="daily-trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Incident Trends</CardTitle>
              <CardDescription>Daily incident volume and resolution rates over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={dailyIncidentsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="incidents"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Total Incidents"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.8}
                    name="Resolved"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team-performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Comparison</CardTitle>
              <CardDescription>Performance metrics across all response teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformanceData.map((team, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{team.team}</h4>
                      <Badge
                        className={getStatusColor(
                          team.successRate >= 95 ? "excellent" : team.successRate >= 90 ? "good" : "warning",
                        )}
                      >
                        {team.successRate >= 95 ? "Excellent" : team.successRate >= 90 ? "Good" : "Needs Improvement"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Incidents Handled</p>
                        <p className="text-2xl font-bold text-primary">{team.incidents}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Response Time</p>
                        <p className="text-2xl font-bold text-secondary">{team.avgTime} min</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-bold text-accent">{team.successRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
