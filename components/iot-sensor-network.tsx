"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Thermometer,
  Droplets,
  Wind,
  Zap,
  Radio,
  AlertTriangle,
  CheckCircle,
  Activity,
  Wifi,
  WifiOff,
  Battery,
  MapPin,
  Flame,
  CloudRain,
  Mountain,
  Building,
  Smartphone,
  Watch,
  Mic,
  Clock,
} from "lucide-react"

interface IoTSensor {
  id: string
  name: string
  type:
    | "temperature"
    | "humidity"
    | "air_quality"
    | "motion"
    | "sound"
    | "smoke"
    | "water"
    | "seismic"
    | "radiation"
    | "gas"
  location: { lat: number; lng: number; address: string }
  value: number
  unit: string
  status: "online" | "offline" | "warning" | "critical"
  batteryLevel: number
  lastUpdate: Date
  threshold: { min: number; max: number }
  isTriggered: boolean
}

interface WearableDevice {
  id: string
  name: string
  type: "smartwatch" | "fitness_tracker" | "emergency_beacon" | "medical_device"
  wearer: string
  heartRate?: number
  steps?: number
  location?: { lat: number; lng: number }
  batteryLevel: number
  isEmergency: boolean
  lastSync: Date
}

interface EnvironmentalAlert {
  id: string
  type: "earthquake" | "fire" | "flood" | "gas_leak" | "extreme_weather" | "air_quality" | "radiation"
  severity: "low" | "medium" | "high" | "critical"
  location: string
  description: string
  timestamp: Date
  affectedSensors: string[]
  recommendedActions: string[]
}

export default function IoTSensorNetwork() {
  const [sensors, setSensors] = useState<IoTSensor[]>([])
  const [wearables, setWearables] = useState<WearableDevice[]>([])
  const [alerts, setAlerts] = useState<EnvironmentalAlert[]>([])
  const [isNetworkActive, setIsNetworkActive] = useState(false)
  const [selectedSensorType, setSelectedSensorType] = useState<string>("all")
  const [autoAlerts, setAutoAlerts] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState<"low" | "medium" | "high">("medium")
  const [connectedDevices, setConnectedDevices] = useState(0)
  const [dataPoints, setDataPoints] = useState(0)

  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const mockSensors: IoTSensor[] = [
    {
      id: "1",
      name: "Building A - Temperature",
      type: "temperature",
      location: { lat: 40.7589, lng: -73.9851, address: "Main Building, Floor 3" },
      value: 72,
      unit: "°F",
      status: "online",
      batteryLevel: 85,
      lastUpdate: new Date(),
      threshold: { min: 32, max: 100 },
      isTriggered: false,
    },
    {
      id: "2",
      name: "Smoke Detector - Kitchen",
      type: "smoke",
      location: { lat: 40.759, lng: -73.985, address: "Kitchen Area" },
      value: 15,
      unit: "ppm",
      status: "critical",
      batteryLevel: 92,
      lastUpdate: new Date(),
      threshold: { min: 0, max: 50 },
      isTriggered: true,
    },
    {
      id: "3",
      name: "Air Quality Monitor",
      type: "air_quality",
      location: { lat: 40.7588, lng: -73.9852, address: "Outdoor Courtyard" },
      value: 156,
      unit: "AQI",
      status: "warning",
      batteryLevel: 67,
      lastUpdate: new Date(),
      threshold: { min: 0, max: 150 },
      isTriggered: true,
    },
    {
      id: "4",
      name: "Seismic Sensor",
      type: "seismic",
      location: { lat: 40.7587, lng: -73.9853, address: "Foundation Level" },
      value: 2.1,
      unit: "Richter",
      status: "warning",
      batteryLevel: 78,
      lastUpdate: new Date(),
      threshold: { min: 0, max: 3.0 },
      isTriggered: false,
    },
    {
      id: "5",
      name: "Water Level Sensor",
      type: "water",
      location: { lat: 40.7586, lng: -73.9854, address: "Basement" },
      value: 8,
      unit: "inches",
      status: "online",
      batteryLevel: 91,
      lastUpdate: new Date(),
      threshold: { min: 0, max: 12 },
      isTriggered: false,
    },
    {
      id: "6",
      name: "Radiation Monitor",
      type: "radiation",
      location: { lat: 40.7585, lng: -73.9855, address: "Perimeter North" },
      value: 0.12,
      unit: "mSv/h",
      status: "online",
      batteryLevel: 88,
      lastUpdate: new Date(),
      threshold: { min: 0, max: 1.0 },
      isTriggered: false,
    },
  ]

  const mockWearables: WearableDevice[] = [
    {
      id: "1",
      name: "Emergency Watch",
      type: "smartwatch",
      wearer: "John Doe",
      heartRate: 95,
      steps: 8432,
      location: { lat: 40.7589, lng: -73.9851 },
      batteryLevel: 67,
      isEmergency: false,
      lastSync: new Date(),
    },
    {
      id: "2",
      name: "Medical Alert Device",
      type: "medical_device",
      wearer: "Jane Smith",
      heartRate: 142,
      location: { lat: 40.759, lng: -73.985 },
      batteryLevel: 23,
      isEmergency: true,
      lastSync: new Date(),
    },
    {
      id: "3",
      name: "Safety Beacon",
      type: "emergency_beacon",
      wearer: "Mike Johnson",
      location: { lat: 40.7588, lng: -73.9852 },
      batteryLevel: 89,
      isEmergency: false,
      lastSync: new Date(),
    },
  ]

  const startNetwork = () => {
    setIsNetworkActive(true)
    setSensors(mockSensors)
    setWearables(mockWearables)
    setConnectedDevices(mockSensors.length + mockWearables.length)

    // Start real-time updates
    updateIntervalRef.current = setInterval(() => {
      updateSensorData()
      setDataPoints((prev) => prev + mockSensors.length + mockWearables.length)
    }, 5000)

    // Generate initial alerts
    generateAlerts()
  }

  const stopNetwork = () => {
    setIsNetworkActive(false)
    setSensors([])
    setWearables([])
    setAlerts([])
    setConnectedDevices(0)
    setDataPoints(0)

    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current)
    }
  }

  const updateSensorData = () => {
    setSensors((prev) =>
      prev.map((sensor) => {
        const variation = (Math.random() - 0.5) * 0.1
        let newValue = sensor.value + sensor.value * variation

        // Simulate realistic sensor behavior
        if (sensor.type === "temperature") {
          newValue = Math.max(32, Math.min(120, newValue))
        } else if (sensor.type === "humidity") {
          newValue = Math.max(0, Math.min(100, newValue))
        } else if (sensor.type === "air_quality") {
          newValue = Math.max(0, Math.min(500, newValue))
        }

        const isTriggered = newValue < sensor.threshold.min || newValue > sensor.threshold.max
        const status = isTriggered ? (newValue > sensor.threshold.max * 1.5 ? "critical" : "warning") : "online"

        return {
          ...sensor,
          value: Math.round(newValue * 100) / 100,
          status,
          isTriggered,
          lastUpdate: new Date(),
          batteryLevel: Math.max(0, sensor.batteryLevel - Math.random() * 0.1),
        }
      }),
    )

    setWearables((prev) =>
      prev.map((wearable) => ({
        ...wearable,
        heartRate: wearable.heartRate
          ? Math.max(60, Math.min(180, wearable.heartRate + (Math.random() - 0.5) * 10))
          : undefined,
        steps: wearable.steps ? wearable.steps + Math.floor(Math.random() * 50) : undefined,
        batteryLevel: Math.max(0, wearable.batteryLevel - Math.random() * 0.2),
        lastSync: new Date(),
      })),
    )
  }

  const generateAlerts = () => {
    const newAlerts: EnvironmentalAlert[] = [
      {
        id: "1",
        type: "fire",
        severity: "critical",
        location: "Kitchen Area",
        description: "Smoke detected above safe levels. Possible fire hazard.",
        timestamp: new Date(),
        affectedSensors: ["2"],
        recommendedActions: [
          "Evacuate the building immediately",
          "Call fire department",
          "Use fire extinguisher if safe to do so",
          "Check for trapped individuals",
        ],
      },
      {
        id: "2",
        type: "air_quality",
        severity: "high",
        location: "Outdoor Courtyard",
        description: "Air quality index exceeds healthy levels.",
        timestamp: new Date(),
        affectedSensors: ["3"],
        recommendedActions: [
          "Avoid outdoor activities",
          "Close windows and doors",
          "Use air purifiers indoors",
          "Wear N95 masks if going outside",
        ],
      },
      {
        id: "3",
        type: "earthquake",
        severity: "medium",
        location: "Foundation Level",
        description: "Seismic activity detected. Minor earthquake possible.",
        timestamp: new Date(),
        affectedSensors: ["4"],
        recommendedActions: [
          "Drop, cover, and hold on",
          "Stay away from windows",
          "Be prepared for aftershocks",
          "Check for structural damage",
        ],
      },
    ]

    setAlerts(newAlerts)
  }

  const getSensorIcon = (type: IoTSensor["type"]) => {
    switch (type) {
      case "temperature":
        return <Thermometer className="h-5 w-5" />
      case "humidity":
        return <Droplets className="h-5 w-5" />
      case "air_quality":
        return <Wind className="h-5 w-5" />
      case "smoke":
        return <Flame className="h-5 w-5" />
      case "water":
        return <CloudRain className="h-5 w-5" />
      case "seismic":
        return <Mountain className="h-5 w-5" />
      case "radiation":
        return <Zap className="h-5 w-5" />
      case "motion":
        return <Activity className="h-5 w-5" />
      case "sound":
        return <Mic className="h-5 w-5" />
      default:
        return <Radio className="h-5 w-5" />
    }
  }

  const getWearableIcon = (type: WearableDevice["type"]) => {
    switch (type) {
      case "smartwatch":
        return <Watch className="h-5 w-5" />
      case "fitness_tracker":
        return <Activity className="h-5 w-5" />
      case "emergency_beacon":
        return <Radio className="h-5 w-5" />
      case "medical_device":
        return <Activity className="h-5 w-5" />
      default:
        return <Smartphone className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-500 bg-green-100"
      case "warning":
        return "text-orange-500 bg-orange-100"
      case "critical":
        return "text-red-500 bg-red-100"
      case "offline":
        return "text-gray-500 bg-gray-100"
      default:
        return "text-gray-500 bg-gray-100"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "border-blue-200 bg-blue-50"
      case "medium":
        return "border-orange-200 bg-orange-50"
      case "high":
        return "border-red-200 bg-red-50"
      case "critical":
        return "border-red-500 bg-red-100"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const filteredSensors =
    selectedSensorType === "all" ? sensors : sensors.filter((sensor) => sensor.type === selectedSensorType)

  useEffect(() => {
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-blue-500" />
            IoT Sensor Network
            <Badge variant={isNetworkActive ? "default" : "secondary"} className="ml-auto">
              {isNetworkActive ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Real-time environmental monitoring and wearable device integration for comprehensive crisis detection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Network Control */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="font-medium">IoT Network Status</Label>
              <p className="text-sm text-gray-500">
                {isNetworkActive ? "Monitoring environmental conditions and wearable devices" : "Network is offline"}
              </p>
            </div>
            <Button
              onClick={isNetworkActive ? stopNetwork : startNetwork}
              variant={isNetworkActive ? "destructive" : "default"}
            >
              {isNetworkActive ? (
                <>
                  <WifiOff className="h-4 w-4 mr-2" />
                  Stop Network
                </>
              ) : (
                <>
                  <Wifi className="h-4 w-4 mr-2" />
                  Start Network
                </>
              )}
            </Button>
          </div>

          {/* Network Statistics */}
          {isNetworkActive && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{connectedDevices}</p>
                    <p className="text-sm text-gray-500">Connected Devices</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">{dataPoints.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Data Points</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{alerts.length}</p>
                    <p className="text-sm text-gray-500">Active Alerts</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">{sensors.filter((s) => s.status === "online").length}</p>
                    <p className="text-sm text-gray-500">Online Sensors</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Alert Settings */}
          {isNetworkActive && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Alert Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Alerts</Label>
                    <p className="text-sm text-gray-500">Send alerts when thresholds are exceeded</p>
                  </div>
                  <Switch checked={autoAlerts} onCheckedChange={setAutoAlerts} />
                </div>

                <div className="space-y-2">
                  <Label>Alert Sensitivity</Label>
                  <Select value={alertThreshold} onValueChange={(value: any) => setAlertThreshold(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Only critical alerts</SelectItem>
                      <SelectItem value="medium">Medium - Important alerts</SelectItem>
                      <SelectItem value="high">High - All alerts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Alerts */}
          {isNetworkActive && alerts.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Active Environmental Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <Card key={alert.id} className={`border-2 ${getSeverityColor(alert.severity)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="destructive" className="text-xs">
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {alert.type.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <h4 className="font-semibold">{alert.location}</h4>
                          <p className="text-sm text-gray-600">{alert.description}</p>
                        </div>
                        <div className="text-right text-xs text-gray-500">{alert.timestamp.toLocaleTimeString()}</div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Recommended Actions:</h5>
                        <ul className="text-sm space-y-1">
                          {alert.recommendedActions.map((action, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Sensor Filter */}
          {isNetworkActive && (
            <div className="flex items-center gap-4">
              <Label>Filter Sensors:</Label>
              <Select value={selectedSensorType} onValueChange={setSelectedSensorType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sensors</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="smoke">Smoke Detection</SelectItem>
                  <SelectItem value="air_quality">Air Quality</SelectItem>
                  <SelectItem value="seismic">Seismic</SelectItem>
                  <SelectItem value="water">Water Level</SelectItem>
                  <SelectItem value="radiation">Radiation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Environmental Sensors */}
          {isNetworkActive && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Environmental Sensors
                  <Badge variant="outline">{filteredSensors.length} sensors</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSensors.map((sensor) => (
                    <Card key={sensor.id} className="hover:bg-gray-50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${getStatusColor(sensor.status)}`}>
                              {getSensorIcon(sensor.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{sensor.name}</h4>
                              <p className="text-sm text-gray-600">{sensor.location.address}</p>
                            </div>
                          </div>
                          <Badge variant={sensor.status === "online" ? "default" : "destructive"}>
                            {sensor.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">
                              {sensor.value} {sensor.unit}
                            </span>
                            {sensor.isTriggered && <AlertTriangle className="h-5 w-5 text-red-500" />}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Battery className="h-3 w-3" />
                              <span>{Math.round(sensor.batteryLevel)}%</span>
                            </div>
                            <span>Updated: {sensor.lastUpdate.toLocaleTimeString()}</span>
                          </div>

                          <div className="text-xs text-gray-500">
                            Threshold: {sensor.threshold.min} - {sensor.threshold.max} {sensor.unit}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Wearable Devices */}
          {isNetworkActive && wearables.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Wearable Devices
                  <Badge variant="outline">{wearables.length} devices</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wearables.map((wearable) => (
                    <Card
                      key={wearable.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        wearable.isEmergency ? "border-red-200 bg-red-50" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                wearable.isEmergency ? "text-red-500 bg-red-100" : "text-blue-500 bg-blue-100"
                              }`}
                            >
                              {getWearableIcon(wearable.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{wearable.name}</h4>
                              <p className="text-sm text-gray-600">Wearer: {wearable.wearer}</p>
                              <p className="text-xs text-gray-500">Type: {wearable.type.replace("_", " ")}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {wearable.isEmergency && (
                              <Badge variant="destructive" className="mb-2">
                                EMERGENCY
                              </Badge>
                            )}
                            <div className="flex items-center gap-1 text-sm">
                              <Battery className="h-3 w-3" />
                              <span>{Math.round(wearable.batteryLevel)}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {wearable.heartRate && (
                            <div>
                              <div className="flex items-center gap-1">
                                <Activity className="h-3 w-3 text-red-500" />
                                <span className="font-medium">Heart Rate</span>
                              </div>
                              <div
                                className={`text-lg font-bold ${
                                  wearable.heartRate > 120 ? "text-red-500" : "text-green-500"
                                }`}
                              >
                                {Math.round(wearable.heartRate)} BPM
                              </div>
                            </div>
                          )}

                          {wearable.steps && (
                            <div>
                              <div className="flex items-center gap-1">
                                <Activity className="h-3 w-3 text-blue-500" />
                                <span className="font-medium">Steps</span>
                              </div>
                              <div className="text-lg font-bold text-blue-500">{wearable.steps.toLocaleString()}</div>
                            </div>
                          )}

                          {wearable.location && (
                            <div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-green-500" />
                                <span className="font-medium">Location</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {wearable.location.lat.toFixed(4)}, {wearable.location.lng.toFixed(4)}
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span className="font-medium">Last Sync</span>
                            </div>
                            <div className="text-xs text-gray-500">{wearable.lastSync.toLocaleTimeString()}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Network Information */}
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Building className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">IoT Network Capabilities</h4>
                  <div className="text-sm text-gray-600 space-y-1 mt-2">
                    <p>• Real-time environmental monitoring (temperature, air quality, smoke, radiation)</p>
                    <p>• Wearable device integration for personal health and safety tracking</p>
                    <p>• Automatic alert generation based on configurable thresholds</p>
                    <p>• Seismic activity detection for earthquake early warning</p>
                    <p>• Water level monitoring for flood detection</p>
                    <p>• Emergency beacon tracking for personnel safety</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
