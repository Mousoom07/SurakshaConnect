"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Navigation, RefreshCw, AlertTriangle, Home } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
  address?: string
  city?: string
  state?: string
}

export function LocationTracker() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentLocation = () => {
    setIsLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("जियोलोकेशन इस ब्राउज़र द्वारा समर्थित नहीं है / Geolocation is not supported by this browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
        }

        setTimeout(() => {
          // Mock Indian addresses based on coordinates
          const indianAddresses = [
            {
              address: "कनॉट प्लेस, नई दिल्ली / Connaught Place, New Delhi",
              city: "नई दिल्ली / New Delhi",
              state: "दिल्ली / Delhi",
            },
            {
              address: "मरीन ड्राइव, मुंबई / Marine Drive, Mumbai",
              city: "मुंबई / Mumbai",
              state: "महाराष्ट्र / Maharashtra",
            },
            { address: "एमजी रोड, बैंगलोर / MG Road, Bangalore", city: "बैंगलोर / Bangalore", state: "कर्नाटक / Karnataka" },
            {
              address: "पार्क स्ट्रीट, कोलकाता / Park Street, Kolkata",
              city: "कोलकाता / Kolkata",
              state: "पश्चिम बंगाल / West Bengal",
            },
            { address: "अन्ना सलाई, चेन्नई / Anna Salai, Chennai", city: "चेन्नई / Chennai", state: "तमिलनाडु / Tamil Nadu" },
          ]
          const randomAddress = indianAddresses[Math.floor(Math.random() * indianAddresses.length)]
          newLocation.address = randomAddress.address
          newLocation.city = randomAddress.city
          newLocation.state = randomAddress.state
          setLocation(newLocation)
          setIsLoading(false)
        }, 1000)
      },
      (error) => {
        let errorMessage = ""
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "स्थान की अनुमति अस्वीकृत / Location permission denied"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "स्थान जानकारी उपलब्ध नहीं / Location information unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "स्थान अनुरोध समय समाप्त / Location request timeout"
            break
          default:
            errorMessage = `स्थान त्रुटि: ${error.message} / Location error: ${error.message}`
        }
        setError(errorMessage)
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const startTracking = () => {
    setIsTracking(true)
    getCurrentLocation()

    // Update location every 30 seconds when tracking
    const interval = setInterval(() => {
      getCurrentLocation()
    }, 30000)

    return () => clearInterval(interval)
  }

  const stopTracking = () => {
    setIsTracking(false)
  }

  useEffect(() => {
    // Get initial location
    getCurrentLocation()
  }, [])

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          स्थान ट्रैकिंग / Location Tracking
        </CardTitle>
        <CardDescription>
          आपातकालीन प्रतिक्रिया के लिए वास्तविक समय स्थान निगरानी / Real-time location monitoring for emergency response
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {location && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">स्थिति / Status</span>
              <Badge variant={isTracking ? "destructive" : "secondary"}>
                {isTracking ? "सक्रिय ट्रैकिंग / Active Tracking" : "स्थान मिला / Location Found"}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">निर्देशांक / Coordinates:</span>
                <span className="font-mono">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">सटीकता / Accuracy:</span>
                <span>{Math.round(location.accuracy)}m</span>
              </div>

              {location.address && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">पता / Address:</span>
                  <span className="text-right max-w-48">{location.address}</span>
                </div>
              )}

              {location.city && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">शहर / City:</span>
                  <span>{location.city}</span>
                </div>
              )}

              {location.state && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">राज्य / State:</span>
                  <span>{location.state}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">अंतिम अपडेट / Last Updated:</span>
                <span>{new Date(location.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={getCurrentLocation} disabled={isLoading} variant="outline" className="flex-1 bg-transparent">
            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Navigation className="h-4 w-4 mr-2" />}
            {isLoading ? "स्थान प्राप्त कर रहे हैं... / Getting Location..." : "स्थान अपडेट करें / Update Location"}
          </Button>

          <Button
            onClick={isTracking ? stopTracking : startTracking}
            variant={isTracking ? "destructive" : "default"}
            className="flex-1"
          >
            {isTracking ? "ट्रैकिंग बंद करें / Stop Tracking" : "ट्रैकिंग शुरू करें / Start Tracking"}
          </Button>
        </div>

        {location && (
          <Button variant="secondary" className="w-full">
            <MapPin className="h-4 w-4 mr-2" />
            मानचित्र पर देखें / View on Map
          </Button>
        )}

        <Button variant="outline" className="w-full bg-transparent">
          <Home className="h-4 w-4 mr-2" />
          निकटतम आश्रय स्थल / Nearest Shelters
        </Button>
      </CardContent>
    </Card>
  )
}
