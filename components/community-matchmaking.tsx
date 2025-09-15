"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, MapPin, Clock, Phone, CheckCircle, AlertTriangle, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface Volunteer {
  id: string
  name: string
  skills: string[]
  location: string
  distance: number
  availability: "available" | "busy" | "offline"
  rating: number
  responseTime: string
  phone: string
  verified: boolean
  specializations: string[]
}

interface EmergencyRequest {
  id: string
  type: "medical" | "shelter" | "food" | "evacuation" | "other"
  description: string
  location: string
  urgency: "low" | "medium" | "high" | "critical"
  requiredSkills: string[]
  timestamp: Date
  status: "pending" | "matched" | "completed"
  matchedVolunteers: string[]
}

interface Match {
  requestId: string
  volunteerId: string
  matchScore: number
  distance: number
  skillMatch: number
  responseTime: string
  status: "suggested" | "accepted" | "declined"
}

export function CommunityMatchmaking() {
  const [activeTab, setActiveTab] = useState("requests")
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [requests, setRequests] = useState<EmergencyRequest[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  useEffect(() => {
    // Mock data for demonstration
    const mockVolunteers: Volunteer[] = [
      {
        id: "vol-001",
        name: "Dr. Sarah Chen",
        skills: ["Medical", "First Aid", "CPR", "Emergency Medicine"],
        location: "Downtown Medical District",
        distance: 0.8,
        availability: "available",
        rating: 4.9,
        responseTime: "3 min",
        phone: "+1-555-0123",
        verified: true,
        specializations: ["Trauma Care", "Cardiac Emergency"],
      },
      {
        id: "vol-002",
        name: "Mike Rodriguez",
        skills: ["Search & Rescue", "Heavy Lifting", "Navigation"],
        location: "Industrial District",
        distance: 1.2,
        availability: "available",
        rating: 4.7,
        responseTime: "5 min",
        phone: "+1-555-0124",
        verified: true,
        specializations: ["Urban Rescue", "Equipment Operation"],
      },
      {
        id: "vol-003",
        name: "Lisa Thompson",
        skills: ["Counseling", "Child Care", "Translation"],
        location: "Residential Area",
        distance: 2.1,
        availability: "busy",
        rating: 4.8,
        responseTime: "15 min",
        phone: "+1-555-0125",
        verified: true,
        specializations: ["Crisis Counseling", "Family Support"],
      },
      {
        id: "vol-004",
        name: "James Wilson",
        skills: ["Transportation", "Logistics", "Communication"],
        location: "Transport Hub",
        distance: 1.5,
        availability: "available",
        rating: 4.6,
        responseTime: "7 min",
        phone: "+1-555-0126",
        verified: false,
        specializations: ["Emergency Transport", "Supply Coordination"],
      },
    ]

    const mockRequests: EmergencyRequest[] = [
      {
        id: "req-001",
        type: "medical",
        description: "Elderly person having chest pains, needs immediate medical attention",
        location: "Oak Street Apartments",
        urgency: "critical",
        requiredSkills: ["Medical", "CPR", "Emergency Medicine"],
        timestamp: new Date(Date.now() - 300000),
        status: "pending",
        matchedVolunteers: [],
      },
      {
        id: "req-002",
        type: "evacuation",
        description: "Family trapped in flooded basement, need rescue assistance",
        location: "Riverside Drive",
        urgency: "high",
        requiredSkills: ["Search & Rescue", "Heavy Lifting"],
        timestamp: new Date(Date.now() - 180000),
        status: "pending",
        matchedVolunteers: [],
      },
      {
        id: "req-003",
        type: "shelter",
        description: "Displaced family with children needs temporary shelter and support",
        location: "Community Center",
        urgency: "medium",
        requiredSkills: ["Child Care", "Counseling", "Logistics"],
        timestamp: new Date(Date.now() - 120000),
        status: "matched",
        matchedVolunteers: ["vol-003", "vol-004"],
      },
    ]

    const mockMatches: Match[] = [
      {
        requestId: "req-001",
        volunteerId: "vol-001",
        matchScore: 95,
        distance: 0.8,
        skillMatch: 100,
        responseTime: "3 min",
        status: "suggested",
      },
      {
        requestId: "req-002",
        volunteerId: "vol-002",
        matchScore: 88,
        distance: 1.2,
        skillMatch: 90,
        responseTime: "5 min",
        status: "suggested",
      },
    ]

    setVolunteers(mockVolunteers)
    setRequests(mockRequests)
    setMatches(mockMatches)
  }, [])

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500 text-white"
      case "busy":
        return "bg-yellow-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const acceptMatch = (requestId: string, volunteerId: string) => {
    setMatches((prev) =>
      prev.map((match) =>
        match.requestId === requestId && match.volunteerId === volunteerId ? { ...match, status: "accepted" } : match,
      ),
    )

    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: "matched", matchedVolunteers: [...req.matchedVolunteers, volunteerId] }
          : req,
      ),
    )
  }

  const declineMatch = (requestId: string, volunteerId: string) => {
    setMatches((prev) =>
      prev.map((match) =>
        match.requestId === requestId && match.volunteerId === volunteerId ? { ...match, status: "declined" } : match,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Active Volunteers</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {volunteers.filter((v) => v.availability === "available").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Pending Requests</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {requests.filter((r) => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">Matches Made</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {matches.filter((m) => m.status === "accepted").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">Avg Response</span>
            </div>
            <div className="text-2xl font-bold text-foreground">4.2m</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests">Emergency Requests</TabsTrigger>
          <TabsTrigger value="volunteers">Available Volunteers</TabsTrigger>
          <TabsTrigger value="matches">AI Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Emergency Requests Needing Help</CardTitle>
              <CardDescription>Active emergency situations requiring volunteer assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requests.map((request) => (
                <Card
                  key={request.id}
                  className={cn(
                    "border-border cursor-pointer transition-all hover:shadow-md",
                    selectedRequest === request.id && "ring-2 ring-primary",
                  )}
                  onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getUrgencyColor(request.urgency)}>{request.urgency.toUpperCase()}</Badge>
                          <Badge variant="outline">{request.type.toUpperCase()}</Badge>
                          <Badge variant={request.status === "matched" ? "default" : "secondary"}>
                            {request.status.toUpperCase()}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-foreground">{request.description}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {request.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedRequest === request.id && (
                      <div className="space-y-3 pt-3 border-t border-border">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Required Skills</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.requiredSkills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {request.matchedVolunteers.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Matched Volunteers</label>
                            <div className="space-y-2 mt-1">
                              {request.matchedVolunteers.map((volId) => {
                                const volunteer = volunteers.find((v) => v.id === volId)
                                return volunteer ? (
                                  <div key={volId} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="font-medium">{volunteer.name}</span>
                                    <Badge variant="outline">{volunteer.responseTime}</Badge>
                                  </div>
                                ) : null
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Registered Volunteers</CardTitle>
              <CardDescription>Community members available to help during emergencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {volunteers.map((volunteer) => (
                <Card key={volunteer.id} className="border-border">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{volunteer.name}</h4>
                          {volunteer.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                          <Badge className={getAvailabilityColor(volunteer.availability)}>
                            {volunteer.availability.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {volunteer.location} ({volunteer.distance}km away)
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {volunteer.responseTime} response
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {volunteer.rating}/5.0
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Skills:</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {volunteer.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Specializations:</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {volunteer.specializations.map((spec) => (
                              <Badge key={spec} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={volunteer.availability !== "available"}
                          className="mb-2 bg-transparent"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>AI-Generated Matches</CardTitle>
              <CardDescription>
                Intelligent matching of volunteers to emergency requests based on skills and proximity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {matches.map((match) => {
                const request = requests.find((r) => r.id === match.requestId)
                const volunteer = volunteers.find((v) => v.id === match.volunteerId)

                if (!request || !volunteer) return null

                return (
                  <Card key={`${match.requestId}-${match.volunteerId}`} className="border-border">
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="default">Match Score: {match.matchScore}%</Badge>
                              <Badge
                                variant={
                                  match.status === "accepted"
                                    ? "default"
                                    : match.status === "declined"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {match.status.toUpperCase()}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-foreground">
                              {volunteer.name} → {request.type.toUpperCase()} Emergency
                            </h4>
                            <p className="text-sm text-muted-foreground">{request.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <label className="font-medium text-muted-foreground">Distance</label>
                            <p className="text-foreground">{match.distance}km</p>
                          </div>
                          <div>
                            <label className="font-medium text-muted-foreground">Skill Match</label>
                            <p className="text-foreground">{match.skillMatch}%</p>
                          </div>
                          <div>
                            <label className="font-medium text-muted-foreground">Response Time</label>
                            <p className="text-foreground">{match.responseTime}</p>
                          </div>
                        </div>

                        {match.status === "suggested" && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => acceptMatch(match.requestId, match.volunteerId)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept Match
                            </Button>
                            <Button
                              onClick={() => declineMatch(match.requestId, match.volunteerId)}
                              variant="outline"
                              className="flex-1"
                            >
                              Decline
                            </Button>
                          </div>
                        )}

                        {match.status === "accepted" && (
                          <Alert className="border-green-500 bg-green-50">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                              Match accepted! Volunteer has been notified and is en route.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {matches.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No matches found at this time</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
