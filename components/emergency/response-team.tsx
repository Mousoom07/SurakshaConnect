"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Phone, MapPin, Clock, Shield, Truck, Heart } from "lucide-react"

interface ResponderTeam {
  id: string
  name: string
  type: "police" | "fire" | "medical" | "rescue"
  status: "available" | "responding" | "busy" | "off-duty"
  location: string
  distance: number
  responseTime: string
  members: {
    id: string
    name: string
    role: string
    avatar?: string
  }[]
  equipment: string[]
  contact: string
}

const mockTeams: ResponderTeam[] = [
  {
    id: "team-001",
    name: "Alpha Medical Unit",
    type: "medical",
    status: "available",
    location: "Central Hospital",
    distance: 1.2,
    responseTime: "3-5 min",
    members: [
      { id: "1", name: "Dr. Sarah Chen", role: "Paramedic" },
      { id: "2", name: "Mike Rodriguez", role: "EMT" },
      { id: "3", name: "Lisa Park", role: "Nurse" },
    ],
    equipment: ["Ambulance", "Defibrillator", "Advanced Life Support"],
    contact: "(555) 123-4567",
  },
  {
    id: "team-002",
    name: "Fire Station 12",
    type: "fire",
    status: "responding",
    location: "Downtown Fire Station",
    distance: 0.8,
    responseTime: "2-4 min",
    members: [
      { id: "4", name: "Captain Johnson", role: "Fire Captain" },
      { id: "5", name: "Tom Wilson", role: "Firefighter" },
      { id: "6", name: "Alex Brown", role: "Firefighter" },
      { id: "7", name: "Maria Garcia", role: "Firefighter" },
    ],
    equipment: ["Fire Engine", "Ladder Truck", "Rescue Equipment"],
    contact: "(555) 234-5678",
  },
  {
    id: "team-003",
    name: "Police Unit 7",
    type: "police",
    status: "available",
    location: "North Precinct",
    distance: 2.1,
    responseTime: "4-6 min",
    members: [
      { id: "8", name: "Officer Davis", role: "Police Officer" },
      { id: "9", name: "Officer Kim", role: "Police Officer" },
    ],
    equipment: ["Patrol Car", "First Aid Kit", "Communication Equipment"],
    contact: "(555) 345-6789",
  },
]

const getTeamIcon = (type: string) => {
  switch (type) {
    case "medical":
      return <Heart className="h-4 w-4" />
    case "fire":
      return <Truck className="h-4 w-4" />
    case "police":
      return <Shield className="h-4 w-4" />
    case "rescue":
      return <Users className="h-4 w-4" />
    default:
      return <Users className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "outline"
    case "responding":
      return "secondary"
    case "busy":
      return "destructive"
    case "off-duty":
      return "outline"
    default:
      return "outline"
  }
}

const getTeamTypeColor = (type: string) => {
  switch (type) {
    case "medical":
      return "bg-red-500/10 text-red-700 dark:text-red-300"
    case "fire":
      return "bg-orange-500/10 text-orange-700 dark:text-orange-300"
    case "police":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-300"
    case "rescue":
      return "bg-green-500/10 text-green-700 dark:text-green-300"
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-300"
  }
}

export function ResponseTeam() {
  const [teams, setTeams] = useState<ResponderTeam[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading teams
    setTimeout(() => {
      setTeams(mockTeams)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleContactTeam = (team: ResponderTeam) => {
    window.open(`tel:${team.contact}`)
  }

  const handleDispatchTeam = (team: ResponderTeam) => {
    // Simulate dispatching team
    setTeams((prev) => prev.map((t) => (t.id === team.id ? { ...t, status: "responding" as const } : t)))
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Response Teams
          </CardTitle>
          <CardDescription>Loading available response teams...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Response Teams
        </CardTitle>
        <CardDescription>Available emergency response teams in your area</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTeamTypeColor(team.type)}`}
                    >
                      {getTeamIcon(team.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{team.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(team.status)}>
                          {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground capitalize">{team.type} Team</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {team.distance}km away
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ETA: {team.responseTime}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{team.location}</p>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Team Members ({team.members.length})</h5>
                <div className="flex items-center gap-2">
                  {team.members.slice(0, 4).map((member) => (
                    <div key={member.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{member.name}</span>
                    </div>
                  ))}
                  {team.members.length > 4 && (
                    <span className="text-xs text-muted-foreground">+{team.members.length - 4} more</span>
                  )}
                </div>
              </div>

              {/* Equipment */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Equipment</h5>
                <div className="flex flex-wrap gap-1">
                  {team.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => handleContactTeam(team)} variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                {team.status === "available" && (
                  <Button size="sm" onClick={() => handleDispatchTeam(team)}>
                    Dispatch Team
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
