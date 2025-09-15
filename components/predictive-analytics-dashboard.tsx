"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
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
} from "recharts"
import { TrendingUp, TrendingDown, AlertTriangle, MapPin, Calendar, Zap, Users, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface Prediction {
  id: string
  type: "flood" | "earthquake" | "fire" | "storm" | "medical_surge"
  location: string
  probability: number
  severity: "low" | "medium" | "high" | "critical"
  timeframe: string
  confidence: number
  factors: string[]
  recommendations: string[]
  resourceNeeds: {
    volunteers: number
    medicalSupplies: number
    shelterCapacity: number
    evacuationVehicles: number
  }
}

interface HistoricalData {
  month: string
  floods: number
  earthquakes: number
  fires: number
  storms: number
  medical: number
}

interface ResourceForecast {
  resource: string
  current: number
  predicted: number
  shortage: number
  trend: "up" | "down" | "stable"
}

export function PredictiveAnalyticsDashboard() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [resourceForecasts, setResourceForecasts] = useState<ResourceForecast[]>([])
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("7days")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      default:
        return "bg-green-500 text-white"
    }
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-red-600"
    if (probability >= 60) return "text-orange-600"
    if (probability >= 40) return "text-yellow-600"
    return "text-green-600"
  }

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"]

  useEffect(() => {
    // Mock data for demonstration
    const mockPredictions: Prediction[] = [
      {
        id: "pred-001",
        type: "flood",
        location: "Riverside District",
        probability: 85,
        severity: "high",
        timeframe: "Next 24-48 hours",
        confidence: 92,
        factors: [
          "Heavy rainfall forecast",
          "River levels rising",
          "Saturated ground conditions",
          "Historical flood patterns",
        ],
        recommendations: [
          "Pre-position sandbags and flood barriers",
          "Alert residents in low-lying areas",
          "Prepare evacuation routes",
          "Coordinate with emergency services",
        ],
        resourceNeeds: {
          volunteers: 150,
          medicalSupplies: 50,
          shelterCapacity: 300,
          evacuationVehicles: 25,
        },
      },
      {
        id: "pred-002",
        type: "medical_surge",
        location: "Downtown Medical District",
        probability: 72,
        severity: "medium",
        timeframe: "Next 3-5 days",
        confidence: 88,
        factors: ["Flu season peak", "Hospital capacity trends", "Population density", "Weather conditions"],
        recommendations: [
          "Increase medical staff scheduling",
          "Stock additional medical supplies",
          "Prepare overflow facilities",
          "Coordinate with regional hospitals",
        ],
        resourceNeeds: {
          volunteers: 75,
          medicalSupplies: 200,
          shelterCapacity: 0,
          evacuationVehicles: 10,
        },
      },
      {
        id: "pred-003",
        type: "fire",
        location: "Forest Hills Area",
        probability: 68,
        severity: "high",
        timeframe: "Next 7-10 days",
        confidence: 85,
        factors: ["Dry weather conditions", "High wind speeds", "Low humidity", "Vegetation moisture levels"],
        recommendations: [
          "Increase fire patrol frequency",
          "Issue fire safety warnings",
          "Prepare firefighting resources",
          "Clear evacuation routes",
        ],
        resourceNeeds: {
          volunteers: 100,
          medicalSupplies: 30,
          shelterCapacity: 200,
          evacuationVehicles: 20,
        },
      },
      {
        id: "pred-004",
        type: "storm",
        location: "County-wide",
        probability: 45,
        severity: "medium",
        timeframe: "Next 5-7 days",
        confidence: 78,
        factors: ["Weather patterns", "Seasonal trends", "Atmospheric pressure", "Temperature gradients"],
        recommendations: [
          "Monitor weather conditions closely",
          "Prepare storm response teams",
          "Check emergency supplies",
          "Review evacuation procedures",
        ],
        resourceNeeds: {
          volunteers: 200,
          medicalSupplies: 75,
          shelterCapacity: 500,
          evacuationVehicles: 30,
        },
      },
    ]

    const mockHistoricalData: HistoricalData[] = [
      { month: "Jan", floods: 2, earthquakes: 0, fires: 1, storms: 3, medical: 8 },
      { month: "Feb", floods: 1, earthquakes: 1, fires: 2, storms: 2, medical: 12 },
      { month: "Mar", floods: 4, earthquakes: 0, fires: 3, storms: 5, medical: 15 },
      { month: "Apr", floods: 3, earthquakes: 0, fires: 4, storms: 4, medical: 10 },
      { month: "May", floods: 2, earthquakes: 1, fires: 6, storms: 3, medical: 8 },
      { month: "Jun", floods: 1, earthquakes: 0, fires: 8, storms: 2, medical: 6 },
      { month: "Jul", floods: 0, earthquakes: 0, fires: 12, storms: 1, medical: 5 },
      { month: "Aug", floods: 1, earthquakes: 0, fires: 10, storms: 2, medical: 7 },
      { month: "Sep", floods: 2, earthquakes: 0, fires: 6, storms: 4, medical: 9 },
      { month: "Oct", floods: 3, earthquakes: 1, fires: 3, storms: 6, medical: 11 },
      { month: "Nov", floods: 4, earthquakes: 0, fires: 1, storms: 5, medical: 14 },
      { month: "Dec", floods: 2, earthquakes: 0, fires: 0, storms: 4, medical: 16 },
    ]

    const mockResourceForecasts: ResourceForecast[] = [
      {
        resource: "Medical Volunteers",
        current: 245,
        predicted: 380,
        shortage: 135,
        trend: "up",
      },
      {
        resource: "Emergency Supplies",
        current: 1200,
        predicted: 1800,
        shortage: 600,
        trend: "up",
      },
      {
        resource: "Shelter Capacity",
        current: 800,
        predicted: 1200,
        shortage: 400,
        trend: "up",
      },
      {
        resource: "Transport Vehicles",
        current: 45,
        predicted: 75,
        shortage: 30,
        trend: "up",
      },
      {
        resource: "Communication Equipment",
        current: 120,
        predicted: 110,
        shortage: -10,
        trend: "down",
      },
    ]

    setPredictions(mockPredictions)
    setHistoricalData(mockHistoricalData)
    setResourceForecasts(mockResourceForecasts)
  }, [])

  const pieData = predictions.map((pred, index) => ({
    name: pred.type.replace("_", " ").toUpperCase(),
    value: pred.probability,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-muted-foreground">High Risk Predictions</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {predictions.filter((p) => p.probability >= 70).length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">Avg Confidence</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length)}%
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Resource Shortage</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {resourceForecasts.reduce((sum, r) => sum + Math.max(0, r.shortage), 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Areas Monitored</span>
            </div>
            <div className="text-2xl font-bold text-foreground">12</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Risk Predictions</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
          <TabsTrigger value="resources">Resource Forecasting</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          {/* Risk Overview Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Risk Probability Distribution</CardTitle>
              <CardDescription>Current disaster risk predictions across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Predictions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Detailed Risk Predictions</CardTitle>
              <CardDescription>AI-generated disaster predictions with recommended actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictions.map((prediction) => (
                <Card
                  key={prediction.id}
                  className={cn(
                    "border-border cursor-pointer transition-all hover:shadow-md",
                    selectedPrediction === prediction.id && "ring-2 ring-primary",
                  )}
                  onClick={() => setSelectedPrediction(selectedPrediction === prediction.id ? null : prediction.id)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(prediction.severity)}>
                            {prediction.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{prediction.type.replace("_", " ").toUpperCase()}</Badge>
                        </div>
                        <h4 className="font-medium text-foreground">
                          {prediction.type.replace("_", " ").toUpperCase()} Risk - {prediction.location}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {prediction.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {prediction.timeframe}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Probability</div>
                        <div className={cn("text-2xl font-bold", getProbabilityColor(prediction.probability))}>
                          {prediction.probability}%
                        </div>
                        <div className="text-xs text-muted-foreground">{prediction.confidence}% confidence</div>
                      </div>
                    </div>

                    {selectedPrediction === prediction.id && (
                      <div className="space-y-4 pt-3 border-t border-border">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Contributing Factors</label>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-foreground">
                            {prediction.factors.map((factor, index) => (
                              <li key={index}>{factor}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Recommended Actions</label>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-foreground">
                            {prediction.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Predicted Resource Needs</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            <div className="text-center">
                              <div className="text-lg font-bold text-foreground">
                                {prediction.resourceNeeds.volunteers}
                              </div>
                              <div className="text-xs text-muted-foreground">Volunteers</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-foreground">
                                {prediction.resourceNeeds.medicalSupplies}
                              </div>
                              <div className="text-xs text-muted-foreground">Medical Supplies</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-foreground">
                                {prediction.resourceNeeds.shelterCapacity}
                              </div>
                              <div className="text-xs text-muted-foreground">Shelter Capacity</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-foreground">
                                {prediction.resourceNeeds.evacuationVehicles}
                              </div>
                              <div className="text-xs text-muted-foreground">Vehicles</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Historical Emergency Trends</CardTitle>
              <CardDescription>12-month analysis of emergency incidents by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="floods" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="fires" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="storms" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="medical" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Monthly Emergency Distribution</CardTitle>
              <CardDescription>Breakdown of emergency types by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="floods" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="fires" stackId="a" fill="#ef4444" />
                    <Bar dataKey="storms" stackId="a" fill="#8b5cf6" />
                    <Bar dataKey="medical" stackId="a" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Resource Demand Forecasting</CardTitle>
              <CardDescription>Predicted resource needs based on risk analysis and historical patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resourceForecasts.map((forecast) => (
                <Card key={forecast.resource} className="border-border">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{forecast.resource}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Current: {forecast.current}</span>
                          <span>•</span>
                          <span>Predicted Need: {forecast.predicted}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {forecast.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        ) : forecast.trend === "down" ? (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 bg-gray-400 rounded-full" />
                        )}
                        <Badge
                          variant={forecast.shortage > 0 ? "destructive" : "default"}
                          className={forecast.shortage > 0 ? "bg-red-500 text-white" : "bg-green-500 text-white"}
                        >
                          {forecast.shortage > 0 ? `${forecast.shortage} Short` : "Sufficient"}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Resource Availability</span>
                        <span>{Math.round((forecast.current / forecast.predicted) * 100)}%</span>
                      </div>
                      <Progress value={(forecast.current / forecast.predicted) * 100} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Machine learning analysis of disaster patterns and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-500 bg-blue-50">
                <Zap className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Pattern Detection:</strong> Flood risk increases by 40% during spring months based on 5-year
                  historical analysis. Recommend pre-positioning resources in Riverside District.
                </AlertDescription>
              </Alert>

              <Alert className="border-orange-500 bg-orange-50">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Resource Gap Alert:</strong> Medical volunteer shortage predicted for next month. Current
                  capacity at 65% of projected need. Recommend recruitment campaign.
                </AlertDescription>
              </Alert>

              <Alert className="border-green-500 bg-green-50">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Efficiency Improvement:</strong> Response times improved 23% after implementing AI triage
                  system. Continue current protocols and expand to additional districts.
                </AlertDescription>
              </Alert>

              <Alert className="border-purple-500 bg-purple-50">
                <MapPin className="w-4 h-4 text-purple-600" />
                <AlertDescription className="text-purple-800">
                  <strong>Geographic Correlation:</strong> 78% of medical emergencies occur within 2km of major
                  transportation hubs. Consider strategic placement of medical response units.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>Accuracy metrics for predictive models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">94.2%</div>
                  <div className="text-sm text-muted-foreground">Flood Prediction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">87.8%</div>
                  <div className="text-sm text-muted-foreground">Fire Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">91.5%</div>
                  <div className="text-sm text-muted-foreground">Medical Surge</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">89.3%</div>
                  <div className="text-sm text-muted-foreground">Storm Tracking</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
