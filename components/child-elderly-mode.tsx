"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Baby,
  Users,
  Heart,
  MapPin,
  Phone,
  Utensils,
  Home,
  AlertTriangle,
  Volume2,
  Zap,
  Shield,
  Smile,
  Frown,
  HelpCircle,
} from "lucide-react"

type UserMode = "child" | "elderly" | "standard"
type EmergencyType = "hurt" | "lost" | "scared" | "hungry" | "help" | "medical" | "fall" | "chest-pain"

interface EmergencyButton {
  id: string
  type: EmergencyType
  icon: React.ReactNode
  label: string
  color: string
  description: string
}

export default function ChildElderlyMode() {
  const [userMode, setUserMode] = useState<UserMode>("standard")
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [lastEmergency, setLastEmergency] = useState<EmergencyType | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [emergencyCount, setEmergencyCount] = useState(0)

  const childEmergencyButtons: EmergencyButton[] = [
    {
      id: "1",
      type: "hurt",
      icon: <Heart className="h-8 w-8" />,
      label: "I'm Hurt",
      color: "bg-red-500 hover:bg-red-600",
      description: "Tell helpers you are injured",
    },
    {
      id: "2",
      type: "lost",
      icon: <MapPin className="h-8 w-8" />,
      label: "I'm Lost",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Can't find your way home",
    },
    {
      id: "3",
      type: "scared",
      icon: <Frown className="h-8 w-8" />,
      label: "I'm Scared",
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Feeling frightened or unsafe",
    },
    {
      id: "4",
      type: "hungry",
      icon: <Utensils className="h-8 w-8" />,
      label: "I'm Hungry",
      color: "bg-orange-500 hover:bg-orange-600",
      description: "Need food or water",
    },
    {
      id: "5",
      type: "help",
      icon: <HelpCircle className="h-8 w-8" />,
      label: "Need Help",
      color: "bg-green-500 hover:bg-green-600",
      description: "General help needed",
    },
  ]

  const elderlyEmergencyButtons: EmergencyButton[] = [
    {
      id: "1",
      type: "medical",
      icon: <Heart className="h-12 w-12" />,
      label: "MEDICAL\nEMERGENCY",
      color: "bg-red-600 hover:bg-red-700",
      description: "Heart, breathing, or serious medical issue",
    },
    {
      id: "2",
      type: "fall",
      icon: <AlertTriangle className="h-12 w-12" />,
      label: "I FELL\nDOWN",
      color: "bg-orange-600 hover:bg-orange-700",
      description: "Fallen and cannot get up",
    },
    {
      id: "3",
      type: "help",
      icon: <Phone className="h-12 w-12" />,
      label: "NEED\nHELP",
      color: "bg-blue-600 hover:bg-blue-700",
      description: "General assistance required",
    },
    {
      id: "4",
      type: "lost",
      icon: <Home className="h-12 w-12" />,
      label: "CAN'T FIND\nHOME",
      color: "bg-purple-600 hover:bg-purple-700",
      description: "Lost or confused about location",
    },
  ]

  const handleEmergency = async (type: EmergencyType) => {
    setIsEmergencyActive(true)
    setLastEmergency(type)
    setEmergencyCount((prev) => prev + 1)

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => console.log("Location error:", error),
      )
    }

    // Play alert sound (simulated)
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        userMode === "child"
          ? `Emergency alert sent. Help is coming. Stay where you are.`
          : `Emergency alert activated. Your location has been sent to emergency services.`,
      )
      utterance.rate = 0.8
      utterance.volume = 1
      speechSynthesis.speak(utterance)
    }

    // Auto-reset after 30 seconds
    setTimeout(() => {
      setIsEmergencyActive(false)
    }, 30000)
  }

  const cancelEmergency = () => {
    setIsEmergencyActive(false)
    setLastEmergency(null)
  }

  if (userMode === "child") {
    return (
      <div className="space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-4">
        <Card className="border-2 border-blue-200">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-blue-700">
              <Baby className="h-8 w-8" />
              Kids Emergency Helper
            </CardTitle>
            <CardDescription className="text-lg">Tap the big buttons if you need help!</CardDescription>
          </CardHeader>
          <CardContent>
            {isEmergencyActive ? (
              <div className="text-center space-y-6">
                <div className="animate-pulse">
                  <AlertTriangle className="h-24 w-24 text-red-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-red-600 mb-2">Help is Coming!</h2>
                  <p className="text-xl text-gray-700">Stay right where you are</p>
                  <p className="text-lg text-gray-600">Adults are on their way to help you</p>
                </div>

                <div className="bg-green-100 p-6 rounded-xl">
                  <Smile className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <p className="text-lg font-medium text-green-700">You did the right thing!</p>
                  <p className="text-green-600">Help will be here soon</p>
                </div>

                <Button
                  onClick={cancelEmergency}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 bg-transparent"
                >
                  I'm Okay Now
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {childEmergencyButtons.map((button) => (
                  <Button
                    key={button.id}
                    onClick={() => handleEmergency(button.type)}
                    className={`${button.color} text-white h-24 text-xl font-bold rounded-2xl shadow-lg transform transition-transform hover:scale-105`}
                  >
                    <div className="flex items-center gap-4">
                      {button.icon}
                      <div className="text-left">
                        <div>{button.label}</div>
                        <div className="text-sm font-normal opacity-90">{button.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {/* Fun reassurance section */}
            <Card className="mt-6 bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <Smile className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-lg font-medium text-yellow-700">Remember:</p>
                <p className="text-yellow-600">You are brave and smart! Adults are here to help you.</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Mode switcher */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg">Switch to Adult Mode</Label>
              <Button onClick={() => setUserMode("standard")} variant="outline" size="sm">
                Adult Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (userMode === "elderly") {
    return (
      <div className="space-y-6 bg-gray-50 min-h-screen p-4">
        <Card className="border-4 border-blue-300">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-3 text-4xl text-blue-800">
              <Users className="h-12 w-12" />
              Emergency Help
            </CardTitle>
            <CardDescription className="text-2xl font-medium">Press any button for immediate help</CardDescription>
          </CardHeader>
          <CardContent>
            {isEmergencyActive ? (
              <div className="text-center space-y-8">
                <div className="animate-pulse">
                  <Phone className="h-32 w-32 text-green-500 mx-auto mb-6" />
                  <h2 className="text-5xl font-bold text-green-600 mb-4">HELP IS COMING</h2>
                  <p className="text-3xl text-gray-700 mb-2">Emergency services contacted</p>
                  <p className="text-2xl text-gray-600">Stay on the line</p>
                </div>

                {location && (
                  <div className="bg-blue-100 p-6 rounded-xl">
                    <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-xl font-medium text-blue-700">Your location has been sent</p>
                    <p className="text-lg text-blue-600">
                      Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                    </p>
                  </div>
                )}

                <Button
                  onClick={cancelEmergency}
                  size="lg"
                  variant="outline"
                  className="text-2xl px-12 py-6 h-auto bg-transparent"
                >
                  Cancel Emergency
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {elderlyEmergencyButtons.map((button) => (
                  <Button
                    key={button.id}
                    onClick={() => handleEmergency(button.type)}
                    className={`${button.color} text-white h-32 text-2xl font-bold rounded-3xl shadow-xl transform transition-transform hover:scale-105`}
                  >
                    <div className="flex items-center gap-6">
                      {button.icon}
                      <div className="text-left">
                        <div className="whitespace-pre-line">{button.label}</div>
                        <div className="text-lg font-normal opacity-90 mt-1">{button.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {/* Large text instructions */}
            <Card className="mt-8 bg-green-50 border-green-200 border-2">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-2xl font-bold text-green-700 mb-2">You Are Safe</p>
                <p className="text-xl text-green-600">Help is always available with one touch</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Mode switcher */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Label className="text-xl">Switch Mode</Label>
              <div className="flex gap-4">
                <Button onClick={() => setUserMode("child")} variant="outline" size="lg" className="text-lg px-6">
                  Child Mode
                </Button>
                <Button onClick={() => setUserMode("standard")} variant="outline" size="lg" className="text-lg px-6">
                  Standard Mode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Standard mode - mode selector
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Accessibility Modes
          </CardTitle>
          <CardDescription>Choose the interface that works best for you or your family member.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Child Mode Card */}
          <Card
            className="cursor-pointer hover:bg-blue-50 transition-colors border-2 border-blue-200"
            onClick={() => setUserMode("child")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Baby className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">Child Mode</h3>
                  <p className="text-gray-600 mb-3">
                    Simple, colorful interface with cartoon icons and easy-to-understand buttons.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Large Buttons</Badge>
                    <Badge variant="secondary">Simple Language</Badge>
                    <Badge variant="secondary">Friendly Icons</Badge>
                    <Badge variant="secondary">Voice Guidance</Badge>
                  </div>
                </div>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                  Use Child Mode
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Elderly Mode Card */}
          <Card
            className="cursor-pointer hover:bg-green-50 transition-colors border-2 border-green-200"
            onClick={() => setUserMode("elderly")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Elderly Mode</h3>
                  <p className="text-gray-600 mb-3">
                    Extra large buttons, high contrast text, and one-tap emergency calling.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Extra Large Text</Badge>
                    <Badge variant="secondary">High Contrast</Badge>
                    <Badge variant="secondary">One-Tap SOS</Badge>
                    <Badge variant="secondary">Voice Feedback</Badge>
                  </div>
                </div>
                <Button size="lg" className="bg-green-500 hover:bg-green-600">
                  Use Elderly Mode
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Comparison */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Mode Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Baby className="h-4 w-4" />
                    Child Mode Features
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Smile className="h-4 w-4 text-green-500" />
                      Cartoon-style icons and friendly colors
                    </li>
                    <li className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-green-500" />
                      Simple voice instructions and reassurance
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500" />
                      Quick emergency buttons (hurt, lost, scared, hungry)
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      Calming messages while waiting for help
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Elderly Mode Features
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500" />
                      Extra large buttons (medical, fall, help, lost)
                    </li>
                    <li className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-green-500" />
                      Clear voice feedback and confirmations
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-500" />
                      Direct connection to emergency services
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      Automatic location sharing with responders
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          {emergencyCount > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-orange-800">Emergency Usage</p>
                    <p className="text-sm text-orange-700">
                      {emergencyCount} emergency alert{emergencyCount > 1 ? "s" : ""} sent today
                      {lastEmergency && ` • Last: ${lastEmergency}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
