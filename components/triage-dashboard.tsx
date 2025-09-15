"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Clock,
  MapPin,
  User,
  Phone,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface EmergencyRequest {
  id: string
  timestamp: Date
  location: string
  urgency: "low" | "medium" | "high" | "critical"
  type: "medical" | "shelter" | "food" | "evacuation" | "other"
  description: string
  language: string
  status: "pending" | "assigned" | "in-progress" | "resolved" | "cancelled"
  assignedTo?: string
  estimatedResponseTime?: number
  contactInfo?: string
}

const mockRequests: EmergencyRequest[] = [
  {
    id: "ER-001",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    location: "Main Street, collapsed building",
    urgency: "critical",
    type: "medical",
    description: "Person trapped with possible broken leg, requires immediate medical assistance",
    language: "English",
    status: "pending",
    estimatedResponseTime: 8,
    contactInfo: "+1-555-0123",
  },
  {
    id: "ER-002",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    location: "Riverside Community Center",
    urgency: "high",
    type: "shelter",
    description: "Family of 4 needs immediate shelter, house flooded",
    language: "Spanish",
    status: "assigned",
    assignedTo: "Team Alpha",
    estimatedResponseTime: 15,
  },
  {
    id: "ER-003",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    location: "Oak Avenue Bridge",
    urgency: "high",
    type: "evacuation",
    description: "Elderly person stranded on bridge, water rising",
    language: "English",
    status: "in-progress",
    assignedTo: "Rescue Team 2",
    estimatedResponseTime: 5,
  },
  {
    id: "ER-004",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    location: "Downtown Food Bank",
    urgency: "medium",
    type: "food",
    description: "Large group needs food and water supplies",
    language: "French",
    status: "pending",
    estimatedResponseTime: 30,
  },
]

export function TriageDashboard() {
  const [requests, setRequests] = useState<EmergencyRequest[]>(mockRequests)
  const [filteredRequests, setFilteredRequests] = useState<EmergencyRequest[]>(mockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  useEffect(() => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (urgencyFilter !== "all") {
      filtered = filtered.filter((req) => req.urgency === urgencyFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((req) => req.type === typeFilter)
    }

    // Sort by urgency and timestamp
    filtered.sort((a, b) => {
      const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      const urgencyDiff = urgencyOrder[b.urgency] - urgencyOrder[a.urgency]
      if (urgencyDiff !== 0) return urgencyDiff
      return b.timestamp.getTime() - a.timestamp.getTime()
    })

    setFilteredRequests(filtered)
  }, [requests, searchTerm, urgencyFilter, statusFilter, typeFilter])

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-accent text-accent-foreground"
      case "medium":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-accent text-accent-foreground"
      case "assigned":
        return "bg-secondary text-secondary-foreground"
      case "in-progress":
        return "bg-primary text-primary-foreground"
      case "resolved":
        return "bg-green-500 text-white"
      case "cancelled":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medical":
        return <AlertTriangle className="w-4 h-4" />
      case "evacuation":
        return <MapPin className="w-4 h-4" />
      case "shelter":
        return <User className="w-4 h-4" />
      case "food":
        return <User className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60))
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ${minutes % 60}m ago`
  }

  const updateRequestStatus = (id: string, status: EmergencyRequest["status"]) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status } : req)))
  }

  const assignRequest = (id: string, team: string) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "assigned", assignedTo: team } : req)))
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    critical: requests.filter((r) => r.urgency === "critical").length,
    inProgress: requests.filter((r) => r.status === "in-progress").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-accent">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-destructive">{stats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="shelter">Shelter</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="evacuation">Evacuation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(request.type)}
                    <Badge className={cn("text-xs", getUrgencyColor(request.urgency))}>
                      {request.urgency.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(request.status))}>
                      {request.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>ID: {request.id}</p>
                  <p>{formatTimeAgo(request.timestamp)}</p>
                </div>
              </div>
              <CardTitle className="text-lg">
                {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Emergency
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {request.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">{request.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Language:</span>
                  <p className="font-medium">{request.language}</p>
                </div>
                {request.contactInfo && (
                  <div>
                    <span className="text-muted-foreground">Contact:</span>
                    <p className="font-medium">{request.contactInfo}</p>
                  </div>
                )}
                {request.assignedTo && (
                  <div>
                    <span className="text-muted-foreground">Assigned to:</span>
                    <p className="font-medium">{request.assignedTo}</p>
                  </div>
                )}
                {request.estimatedResponseTime && (
                  <div>
                    <span className="text-muted-foreground">ETA:</span>
                    <p className="font-medium">{request.estimatedResponseTime} min</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {request.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => assignRequest(request.id, "Team Alpha")}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Assign to Team Alpha
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => assignRequest(request.id, "Team Beta")}>
                      Assign to Team Beta
                    </Button>
                  </>
                )}

                {request.status === "assigned" && (
                  <Button
                    size="sm"
                    onClick={() => updateRequestStatus(request.id, "in-progress")}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    Mark In Progress
                  </Button>
                )}

                {request.status === "in-progress" && (
                  <Button
                    size="sm"
                    onClick={() => updateRequestStatus(request.id, "resolved")}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Resolved
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateRequestStatus(request.id, "cancelled")}
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>

                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="border-border">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No requests found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
