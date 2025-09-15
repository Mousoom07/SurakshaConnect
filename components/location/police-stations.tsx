"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Navigation, Clock, Shield } from "lucide-react"

interface PoliceStation {
  id: string
  name: string
  nameHindi: string
  address: string
  addressHindi: string
  phone: string
  distance: number
  responseTime: string
  status: "available" | "busy" | "emergency"
  coordinates: {
    lat: number
    lng: number
  }
  city: string
  state: string
}

const mockPoliceStations: PoliceStation[] = [
  {
    id: "1",
    name: "Connaught Place Police Station",
    nameHindi: "कनॉट प्लेस पुलिस स्टेशन",
    address: "Connaught Place, New Delhi",
    addressHindi: "कनॉट प्लेस, नई दिल्ली",
    phone: "011-23341234",
    distance: 0.8,
    responseTime: "3-5 मिनट / min",
    status: "available",
    coordinates: { lat: 28.6315, lng: 77.2167 },
    city: "New Delhi",
    state: "Delhi",
  },
  {
    id: "2",
    name: "Colaba Police Station",
    nameHindi: "कोलाबा पुलिस स्टेशन",
    address: "Colaba, Mumbai",
    addressHindi: "कोलाबा, मुंबई",
    phone: "022-22154321",
    distance: 2.1,
    responseTime: "6-8 मिनट / min",
    status: "busy",
    coordinates: { lat: 18.9067, lng: 72.8147 },
    city: "Mumbai",
    state: "Maharashtra",
  },
  {
    id: "3",
    name: "MG Road Police Station",
    nameHindi: "एमजी रोड पुलिस स्टेशन",
    address: "MG Road, Bangalore",
    addressHindi: "एमजी रोड, बैंगलोर",
    phone: "080-25584321",
    distance: 1.5,
    responseTime: "2-4 मिनट / min",
    status: "available",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    city: "Bangalore",
    state: "Karnataka",
  },
  {
    id: "4",
    name: "Park Street Police Station",
    nameHindi: "पार्क स्ट्रीट पुलिस स्टेशन",
    address: "Park Street, Kolkata",
    addressHindi: "पार्क स्ट्रीट, कोलकाता",
    phone: "033-22294321",
    distance: 3.2,
    responseTime: "8-12 मिनट / min",
    status: "emergency",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    city: "Kolkata",
    state: "West Bengal",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "outline"
    case "busy":
      return "secondary"
    case "emergency":
      return "destructive"
    default:
      return "outline"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "available":
      return "उपलब्ध / Available"
    case "busy":
      return "व्यस्त / Busy"
    case "emergency":
      return "आपातकालीन प्रतिक्रिया / Emergency Response"
    default:
      return "अज्ञात / Unknown"
  }
}

export function PoliceStations() {
  const [stations, setStations] = useState<PoliceStation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading police stations data
    setTimeout(() => {
      setStations(mockPoliceStations.sort((a, b) => a.distance - b.distance))
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const handleDirections = (station: PoliceStation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.lat},${station.coordinates.lng}`
    window.open(url, "_blank")
  }

  if (isLoading) {
    return (
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            निकटतम पुलिस स्टेशन / Nearest Police Stations
          </CardTitle>
          <CardDescription>निकटतम पुलिस स्टेशन लोड हो रहे हैं... / Loading nearby police stations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          निकटतम पुलिस स्टेशन / Nearest Police Stations
        </CardTitle>
        <CardDescription>
          आपातकालीन संपर्क और निकटतम पुलिस स्टेशनों के दिशा-निर्देश / Emergency contacts and directions to nearby police stations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stations.map((station) => (
            <div key={station.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">{station.name}</h4>
                  <p className="text-sm text-muted-foreground">{station.nameHindi}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {station.distance}km दूर / away
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {station.responseTime}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{station.address}</p>
                  <p className="text-xs text-muted-foreground">{station.addressHindi}</p>
                </div>
                <Badge variant={getStatusColor(station.status)}>{getStatusText(station.status)}</Badge>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleCall(station.phone)} className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  कॉल करें / Call
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDirections(station)} className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  दिशा / Directions
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 mt-4">
          <Button variant="destructive" className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            आपातकाल: 100 डायल करें / Emergency: Dial 100
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Phone className="h-4 w-4 mr-2" />
            महिला हेल्पलाइन: 1091 / Women Helpline: 1091
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
