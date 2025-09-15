"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin, Navigation, Users, Phone } from "lucide-react"

interface Shelter {
  id: string
  name: string
  nameHindi: string
  address: string
  addressHindi: string
  phone: string
  distance: number
  capacity: number
  currentOccupancy: number
  status: "available" | "full" | "limited"
  coordinates: {
    lat: number
    lng: number
  }
  facilities: string[]
  facilitiesHindi: string[]
  city: string
  state: string
}

const mockShelters: Shelter[] = [
  {
    id: "1",
    name: "Red Cross Emergency Shelter",
    nameHindi: "रेड क्रॉस आपातकालीन आश्रय",
    address: "Rajpath, New Delhi",
    addressHindi: "राजपथ, नई दिल्ली",
    phone: "011-23456789",
    distance: 1.2,
    capacity: 500,
    currentOccupancy: 120,
    status: "available",
    coordinates: { lat: 28.6139, lng: 77.209 },
    facilities: ["Food", "Medical Aid", "Blankets", "Water"],
    facilitiesHindi: ["भोजन", "चिकित्सा सहायता", "कंबल", "पानी"],
    city: "New Delhi",
    state: "Delhi",
  },
  {
    id: "2",
    name: "Municipal Relief Center",
    nameHindi: "नगरपालिका राहत केंद्र",
    address: "Bandra West, Mumbai",
    addressHindi: "बांद्रा वेस्ट, मुंबई",
    phone: "022-26543210",
    distance: 2.8,
    capacity: 300,
    currentOccupancy: 280,
    status: "limited",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    facilities: ["Food", "Water", "Basic Medical", "Security"],
    facilitiesHindi: ["भोजन", "पानी", "बुनियादी चिकित्सा", "सुरक्षा"],
    city: "Mumbai",
    state: "Maharashtra",
  },
  {
    id: "3",
    name: "Community Emergency Shelter",
    nameHindi: "सामुदायिक आपातकालीन आश्रय",
    address: "Whitefield, Bangalore",
    addressHindi: "व्हाइटफील्ड, बैंगलोर",
    phone: "080-28765432",
    distance: 0.9,
    capacity: 200,
    currentOccupancy: 200,
    status: "full",
    coordinates: { lat: 12.9698, lng: 77.75 },
    facilities: ["Food", "Water", "Blankets", "Medical Aid", "Children Care"],
    facilitiesHindi: ["भोजन", "पानी", "कंबल", "चिकित्सा सहायता", "बाल देखभाल"],
    city: "Bangalore",
    state: "Karnataka",
  },
  {
    id: "4",
    name: "Government Relief Camp",
    nameHindi: "सरकारी राहत शिविर",
    address: "Salt Lake, Kolkata",
    addressHindi: "साल्ट लेक, कोलकाता",
    phone: "033-23456789",
    distance: 3.5,
    capacity: 400,
    currentOccupancy: 150,
    status: "available",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    facilities: ["Food", "Water", "Medical Aid", "Sanitation", "Security"],
    facilitiesHindi: ["भोजन", "पानी", "चिकित्सा सहायता", "स्वच्छता", "सुरक्षा"],
    city: "Kolkata",
    state: "West Bengal",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "outline"
    case "limited":
      return "secondary"
    case "full":
      return "destructive"
    default:
      return "outline"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "available":
      return "उपलब्ध / Available"
    case "limited":
      return "सीमित स्थान / Limited Space"
    case "full":
      return "भरा हुआ / Full"
    default:
      return "अज्ञात / Unknown"
  }
}

export function ShelterLocations() {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading shelter data
    setTimeout(() => {
      setShelters(mockShelters.sort((a, b) => a.distance - b.distance))
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const handleDirections = (shelter: Shelter) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.coordinates.lat},${shelter.coordinates.lng}`
    window.open(url, "_blank")
  }

  const getOccupancyPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100)
  }

  if (isLoading) {
    return (
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            निकटतम आश्रय स्थल / Nearest Shelters
          </CardTitle>
          <CardDescription>आश्रय स्थल लोड हो रहे हैं... / Loading shelter locations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
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
          <Home className="h-5 w-5 text-primary" />
          निकटतम आश्रय स्थल / Nearest Shelters
        </CardTitle>
        <CardDescription>
          आपातकालीन आश्रय स्थल और उनकी उपलब्धता / Emergency shelter locations and their availability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shelters.map((shelter) => (
            <div key={shelter.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium">{shelter.name}</h4>
                  <p className="text-sm text-muted-foreground">{shelter.nameHindi}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {shelter.distance}km दूर / away
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {shelter.currentOccupancy}/{shelter.capacity} (
                      {getOccupancyPercentage(shelter.currentOccupancy, shelter.capacity)}%)
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{shelter.address}</p>
                  <p className="text-xs text-muted-foreground">{shelter.addressHindi}</p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {shelter.facilities.slice(0, 3).map((facility, index) => (
                      <Badge key={facility} variant="outline" className="text-xs">
                        {facility} / {shelter.facilitiesHindi[index]}
                      </Badge>
                    ))}
                    {shelter.facilities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{shelter.facilities.length - 3} और / more
                      </Badge>
                    )}
                  </div>
                </div>
                <Badge variant={getStatusColor(shelter.status)}>{getStatusText(shelter.status)}</Badge>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleCall(shelter.phone)} className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  कॉल करें / Call
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDirections(shelter)} className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  दिशा / Directions
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          <Home className="h-4 w-4 mr-2" />
          सभी आश्रय स्थल देखें / View All Shelters
        </Button>
      </CardContent>
    </Card>
  )
}
