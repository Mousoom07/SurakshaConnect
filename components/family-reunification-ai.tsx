"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users, Search, Camera, Mic, MapPin, Heart, CheckCircle, User, Phone } from "lucide-react"

interface FamilyMember {
  id: string
  name: string
  age: number
  relationship: string
  lastKnownLocation: string
  description: string
  photo?: string
  voiceprint?: string
  status: "missing" | "found" | "safe" | "injured"
  lastSeen: string
  contactInfo?: string
}

interface Match {
  id: string
  confidence: number
  matchType: "photo" | "voice" | "description" | "name"
  survivor: {
    id: string
    name: string
    location: string
    shelter: string
    status: string
    reportedBy: string
    timestamp: string
  }
  meetingPoint?: {
    name: string
    address: string
    coordinates: [number, number]
    safetyRating: number
  }
}

export default function FamilyReunificationAI() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isRecording, setIsRecording] = useState(false)

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "member-001",
      name: "Sarah Johnson",
      age: 8,
      relationship: "Daughter",
      lastKnownLocation: "Roosevelt Elementary School",
      description: "Brown hair, blue eyes, wearing red backpack and white sneakers",
      status: "missing",
      lastSeen: "2024-01-15 08:30:00",
    },
    {
      id: "member-002",
      name: "Michael Johnson",
      age: 45,
      relationship: "Husband",
      lastKnownLocation: "Downtown Office Building",
      description: "Tall, black hair, glasses, wearing blue suit",
      status: "found",
      lastSeen: "2024-01-15 09:15:00",
      contactInfo: "+1-555-0123",
    },
    {
      id: "member-003",
      name: "Emma Johnson",
      age: 72,
      relationship: "Mother",
      lastKnownLocation: "Riverside Nursing Home",
      description: "Gray hair, uses walking cane, wearing purple cardigan",
      status: "safe",
      lastSeen: "2024-01-15 07:45:00",
    },
  ])

  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    relationship: "",
    lastKnownLocation: "",
    description: "",
  })

  const performAISearch = async (member: FamilyMember) => {
    setSelectedMember(member)
    setIsSearching(true)
    setSearchProgress(0)
    setMatches([])

    // Simulate AI search progress
    const progressInterval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 12
      })
    }, 300)

    // Simulate finding matches
    setTimeout(() => {
      const mockMatches: Match[] = [
        {
          id: "match-001",
          confidence: 94,
          matchType: "photo",
          survivor: {
            id: "survivor-001",
            name: "Sarah J.",
            location: "Central Evacuation Center",
            shelter: "Red Cross Shelter #3",
            status: "Safe",
            reportedBy: "Volunteer Maria Santos",
            timestamp: "2024-01-15 16:20:00",
          },
          meetingPoint: {
            name: "Central Park Reunion Point",
            address: "1234 Park Ave, Safe Zone Alpha",
            coordinates: [40.7829, -73.9654],
            safetyRating: 95,
          },
        },
        {
          id: "match-002",
          confidence: 78,
          matchType: "description",
          survivor: {
            id: "survivor-002",
            name: "Unknown Child",
            location: "St. Mary's Hospital",
            shelter: "Medical Center Ward 2",
            status: "Injured - Stable",
            reportedBy: "Dr. Jennifer Lee",
            timestamp: "2024-01-15 14:45:00",
          },
          meetingPoint: {
            name: "Hospital Family Center",
            address: "St. Mary's Hospital, Main Lobby",
            coordinates: [40.7505, -73.9934],
            safetyRating: 98,
          },
        },
      ]

      setMatches(mockMatches)
      setIsSearching(false)
      setSearchProgress(0)
    }, 4000)
  }

  const addFamilyMember = () => {
    if (!newMember.name || !newMember.age) return

    const member: FamilyMember = {
      id: `member-${Date.now()}`,
      name: newMember.name,
      age: Number.parseInt(newMember.age),
      relationship: newMember.relationship,
      lastKnownLocation: newMember.lastKnownLocation,
      description: newMember.description,
      status: "missing",
      lastSeen: new Date().toLocaleString(),
    }

    setFamilyMembers((prev) => [...prev, member])
    setNewMember({
      name: "",
      age: "",
      relationship: "",
      lastKnownLocation: "",
      description: "",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-green-500"
      case "found":
        return "bg-blue-500"
      case "injured":
        return "bg-orange-500"
      case "missing":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Search Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Family Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{familyMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {familyMembers.filter((m) => m.status === "missing").length} missing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Found Safe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {familyMembers.filter((m) => m.status === "safe" || m.status === "found").length}
            </div>
            <p className="text-xs text-muted-foreground">Confirmed safe</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{familyMembers.filter((m) => m.status === "missing").length}</div>
            <p className="text-xs text-muted-foreground">AI searching</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Potential Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matches.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">AI Search</TabsTrigger>
          <TabsTrigger value="family">Family Members</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {/* AI Search Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                AI-Powered Family Search
              </CardTitle>
              <CardDescription>
                Search across survivor databases using photos, voice, names, and descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="search">Search by Name or Description</Label>
                    <Input
                      id="search"
                      placeholder="Enter name, description, or characteristics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
                      {isRecording ? "Stop" : "Voice"}
                    </Button>
                  </div>
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />

                {isRecording && (
                  <Alert className="border-red-200 bg-red-50">
                    <Mic className="h-4 w-4 text-red-500" />
                    <AlertTitle>Recording Voice Sample</AlertTitle>
                    <AlertDescription>
                      Speak clearly to create a voice print for matching against survivor audio records.
                    </AlertDescription>
                  </Alert>
                )}

                {isSearching && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      AI searching across {Math.floor(Math.random() * 50000 + 10000)} survivor records...
                    </div>
                    <Progress value={searchProgress} className="w-full" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Search from Family List */}
          <Card>
            <CardHeader>
              <CardTitle>Search for Family Members</CardTitle>
              <CardDescription>Click to start AI search for any missing family member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {familyMembers
                  .filter((member) => member.status === "missing")
                  .map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {member.relationship}, age {member.age}
                          </p>
                          <p className="text-xs text-muted-foreground">Last seen: {member.lastKnownLocation}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => performAISearch(member)}
                        disabled={isSearching}
                        className="flex items-center gap-2"
                      >
                        <Search className="h-4 w-4" />
                        Search
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family" className="space-y-6">
          {/* Add Family Member */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Add Family Member
              </CardTitle>
              <CardDescription>Register missing family members for AI-powered search</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newMember.age}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder="Age"
                  />
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input
                    id="relationship"
                    value={newMember.relationship}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, relationship: e.target.value }))}
                    placeholder="e.g., Son, Daughter, Spouse"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Last Known Location</Label>
                  <Input
                    id="location"
                    value={newMember.lastKnownLocation}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, lastKnownLocation: e.target.value }))}
                    placeholder="Where they were last seen"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Physical Description</Label>
                  <Textarea
                    id="description"
                    value={newMember.description}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Hair color, clothing, distinguishing features..."
                    rows={3}
                  />
                </div>
              </div>
              <Button onClick={addFamilyMember} className="mt-4">
                Add Family Member
              </Button>
            </CardContent>
          </Card>

          {/* Family Members List */}
          <Card>
            <CardHeader>
              <CardTitle>Registered Family Members</CardTitle>
              <CardDescription>Current status of all registered family members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {member.relationship}, age {member.age}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Last Known Location:</p>
                        <p>{member.lastKnownLocation}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Seen:</p>
                        <p>{member.lastSeen}</p>
                      </div>
                      {member.description && (
                        <div className="md:col-span-2">
                          <p className="text-muted-foreground">Description:</p>
                          <p>{member.description}</p>
                        </div>
                      )}
                      {member.contactInfo && (
                        <div>
                          <p className="text-muted-foreground">Contact:</p>
                          <p className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {member.contactInfo}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          {selectedMember && (
            <Alert className="border-blue-200 bg-blue-50">
              <Search className="h-4 w-4" />
              <AlertTitle>Searching for: {selectedMember.name}</AlertTitle>
              <AlertDescription>
                AI is analyzing survivor databases for potential matches using photo recognition, voice analysis, and
                description matching.
              </AlertDescription>
            </Alert>
          )}

          {matches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Potential Matches Found
                </CardTitle>
                <CardDescription>AI has found potential matches for {selectedMember?.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches.map((match) => (
                    <Card key={match.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{match.survivor.name}</CardTitle>
                            <CardDescription>
                              Match confidence:{" "}
                              <span className={`font-medium ${getConfidenceColor(match.confidence)}`}>
                                {match.confidence}%
                              </span>{" "}
                              ({match.matchType} match)
                            </CardDescription>
                          </div>
                          <Badge variant={match.confidence >= 90 ? "default" : "secondary"}>
                            {match.confidence >= 90 ? "High Confidence" : "Possible Match"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Current Location
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Location:</strong> {match.survivor.location}
                              </p>
                              <p>
                                <strong>Shelter:</strong> {match.survivor.shelter}
                              </p>
                              <p>
                                <strong>Status:</strong> {match.survivor.status}
                              </p>
                              <p>
                                <strong>Reported by:</strong> {match.survivor.reportedBy}
                              </p>
                              <p>
                                <strong>Time:</strong> {match.survivor.timestamp}
                              </p>
                            </div>
                          </div>

                          {match.meetingPoint && (
                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Heart className="h-4 w-4" />
                                Suggested Meeting Point
                              </h4>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <strong>Location:</strong> {match.meetingPoint.name}
                                </p>
                                <p>
                                  <strong>Address:</strong> {match.meetingPoint.address}
                                </p>
                                <p className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <strong>Safety Rating:</strong> {match.meetingPoint.safetyRating}%
                                </p>
                              </div>

                              <div className="flex gap-2 mt-4">
                                <Button size="sm" className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  Get Directions
                                </Button>
                                <Button size="sm" variant="outline">
                                  Contact Shelter
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {matches.length === 0 && !isSearching && selectedMember && (
            <Card>
              <CardContent className="text-center py-8">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No matches found yet</h3>
                <p className="text-muted-foreground mb-4">
                  AI will continue searching as new survivor data becomes available
                </p>
                <Button onClick={() => performAISearch(selectedMember)}>Search Again</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
