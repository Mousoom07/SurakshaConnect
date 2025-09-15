"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Activity, AlertTriangle, TrendingUp, Clock, MapPin, Thermometer, Wind, Zap, Heart, Shield } from "lucide-react"

interface HealthRisk {
  id: string
  type: "disease_outbreak" | "contamination" | "aftershock" | "weather" | "infrastructure"
  title: string
  description: string
  severity: "critical" | "high" | "moderate" | "low"
  probability: number
  timeframe: string
  affectedAreas: string[]
  population: number
  preventiveMeasures: string[]
  symptoms: string[]
  timestamp: string
}

interface HealthAlert {
  id: string
  type: "immediate" | "preventive" | "monitoring"
  title: string
  message: string
  priority: "urgent" | "high" | "medium"
  targetGroup: "all" | "vulnerable" | "responders" | "children"
  expiresAt: string
}

export default function HealthRiskPrediction() {
  const [activeRisks, setActiveRisks] = useState<HealthRisk[]>([
    {
      id: "risk-001",
      type: "disease_outbreak",
      title: "Waterborne Disease Risk",
      description: "High probability of cholera and dysentery outbreak due to contaminated water sources",
      severity: "critical",
      probability: 87,
      timeframe: "3-7 days",
      affectedAreas: ["Downtown District", "Riverside Area", "Industrial Zone"],
      population: 15000,
      preventiveMeasures: [
        "Boil water for 3+ minutes before drinking",
        "Use water purification tablets",
        "Avoid raw foods and ice",
        "Practice strict hand hygiene",
      ],
      symptoms: ["Severe diarrhea", "Vomiting", "Dehydration", "Abdominal cramps"],
      timestamp: "2024-01-15 17:30:00",
    },
    {
      id: "risk-002",
      type: "aftershock",
      title: "Secondary Earthquake Risk",
      description: "Seismic analysis predicts 6.2+ magnitude aftershock with structural collapse risk",
      severity: "high",
      probability: 72,
      timeframe: "24-48 hours",
      affectedAreas: ["City Center", "Old Town", "Harbor District"],
      population: 25000,
      preventiveMeasures: [
        "Evacuate damaged buildings immediately",
        "Stay away from glass windows and heavy objects",
        "Keep emergency kit accessible",
        "Identify safe spots in each room",
      ],
      symptoms: ["Anxiety", "Sleep disruption", "Panic attacks", "Physical injuries"],
      timestamp: "2024-01-15 16:45:00",
    },
    {
      id: "risk-003",
      type: "contamination",
      title: "Air Quality Hazard",
      description: "Chemical plant damage releasing toxic fumes, respiratory risks increasing",
      severity: "high",
      probability: 94,
      timeframe: "12-24 hours",
      affectedAreas: ["Industrial Zone", "East Residential"],
      population: 8500,
      preventiveMeasures: [
        "Stay indoors with windows closed",
        "Use N95 masks when outside",
        "Avoid outdoor exercise",
        "Seek higher ground if possible",
      ],
      symptoms: ["Coughing", "Breathing difficulty", "Eye irritation", "Headaches"],
      timestamp: "2024-01-15 18:15:00",
    },
  ])

  const [healthAlerts, setHealthAlerts] = useState<HealthAlert[]>([
    {
      id: "alert-001",
      type: "immediate",
      title: "Urgent: Boil Water Advisory",
      message: "All water must be boiled for 3+ minutes before consumption. Water treatment plant compromised.",
      priority: "urgent",
      targetGroup: "all",
      expiresAt: "2024-01-18 12:00:00",
    },
    {
      id: "alert-002",
      type: "preventive",
      title: "Tetanus Vaccination Recommended",
      message: "Due to debris and metal hazards, tetanus shots recommended for all rescue workers.",
      priority: "high",
      targetGroup: "responders",
      expiresAt: "2024-01-20 18:00:00",
    },
    {
      id: "alert-003",
      type: "monitoring",
      title: "Monitor Children for Trauma Symptoms",
      message: "Watch for signs of PTSD, anxiety, and behavioral changes in children.",
      priority: "medium",
      targetGroup: "children",
      expiresAt: "2024-01-25 12:00:00",
    },
  ])

  const [predictionAccuracy, setPredictionAccuracy] = useState(89)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const runPredictionAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const newRisk: HealthRisk = {
        id: `risk-${Date.now()}`,
        type: "weather",
        title: "Hypothermia Risk Increase",
        description: "Temperature drop predicted, increased risk for displaced populations",
        severity: "moderate",
        probability: 68,
        timeframe: "6-12 hours",
        affectedAreas: ["Evacuation Centers", "Temporary Shelters"],
        population: 3200,
        preventiveMeasures: [
          "Distribute warm clothing and blankets",
          "Ensure adequate heating in shelters",
          "Monitor vulnerable individuals closely",
          "Provide hot meals and beverages",
        ],
        symptoms: ["Shivering", "Confusion", "Drowsiness", "Weak pulse"],
        timestamp: new Date().toLocaleString(),
      }

      setActiveRisks((prev) => [newRisk, ...prev])
      setIsAnalyzing(false)
      setPredictionAccuracy((prev) => Math.min(prev + 2, 95))
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "moderate":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-red-500 bg-red-50"
      case "high":
        return "border-orange-500 bg-orange-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getRiskIcon = (type: string) => {
    switch (type) {
      case "disease_outbreak":
        return <Activity className="h-5 w-5" />
      case "contamination":
        return <Wind className="h-5 w-5" />
      case "aftershock":
        return <Zap className="h-5 w-5" />
      case "weather":
        return <Thermometer className="h-5 w-5" />
      case "infrastructure":
        return <Shield className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Prediction Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Risk Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRisks.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeRisks.filter((r) => r.severity === "critical").length} critical risks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictionAccuracy}%</div>
            <Progress value={predictionAccuracy} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Population at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeRisks.reduce((sum, risk) => sum + risk.population, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {new Set(activeRisks.flatMap((r) => r.affectedAreas)).size} areas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Health Risk Prediction
          </CardTitle>
          <CardDescription>Predictive analysis of secondary health risks following disasters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={runPredictionAnalysis} disabled={isAnalyzing} className="flex items-center gap-2">
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  Run New Analysis
                </>
              )}
            </Button>

            <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </CardContent>
      </Card>

      {/* Active Health Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Active Health Alerts
          </CardTitle>
          <CardDescription>Immediate health advisories for affected populations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthAlerts.map((alert) => (
              <Alert key={alert.id} className={getPriorityColor(alert.priority)}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center gap-2">
                  {alert.title}
                  <Badge variant="outline" className="text-xs">
                    {alert.targetGroup}
                  </Badge>
                </AlertTitle>
                <AlertDescription className="mt-2">{alert.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Predicted Health Risks</CardTitle>
          <CardDescription>AI-generated predictions of secondary health risks and outbreaks</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Risks</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="disease">Disease</TabsTrigger>
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              {activeRisks.map((risk) => (
                <Card key={risk.id} className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getSeverityColor(risk.severity)}`}>
                          {getRiskIcon(risk.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{risk.title}</CardTitle>
                          <CardDescription>{risk.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getSeverityColor(risk.severity)}>{risk.severity}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">{risk.probability}% probability</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Timeline & Impact
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span>{risk.timeframe}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Population:</span>
                            <span>{risk.population.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Areas:</span>
                            <span>{risk.affectedAreas.length}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h5 className="font-medium mb-2">Affected Areas:</h5>
                          <div className="flex flex-wrap gap-1">
                            {risk.affectedAreas.map((area, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <MapPin className="h-3 w-3 mr-1" />
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Preventive Measures
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {risk.preventiveMeasures.map((measure, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              {measure}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4">
                          <h5 className="font-medium mb-2 flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Watch for Symptoms:
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {risk.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="critical">
              <div className="space-y-4">
                {activeRisks
                  .filter((risk) => risk.severity === "critical")
                  .map((risk) => (
                    <div key={risk.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800">{risk.title}</h4>
                      <p className="text-sm text-red-600 mt-1">{risk.description}</p>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="disease">
              <div className="space-y-4">
                {activeRisks
                  .filter((risk) => risk.type === "disease_outbreak")
                  .map((risk) => (
                    <div key={risk.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{risk.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{risk.description}</p>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="environmental">
              <div className="space-y-4">
                {activeRisks
                  .filter((risk) => ["contamination", "weather"].includes(risk.type))
                  .map((risk) => (
                    <div key={risk.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{risk.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{risk.description}</p>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
