"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, CheckCircle, XCircle, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationRequest {
  id: string
  content: string
  location: string
  timestamp: Date
  urgencyScore: number
  duplicateScore: number
  spamScore: number
  status: "pending" | "verified" | "flagged" | "duplicate"
  confidence: number
  similarRequests: string[]
  aiAnalysis: string
}

export function AIVerificationDashboard() {
  const [requests, setRequests] = useState<VerificationRequest[]>([])
  const [stats, setStats] = useState({
    totalProcessed: 0,
    verified: 0,
    flagged: 0,
    duplicates: 0,
    avgProcessingTime: 2.3,
  })
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  useEffect(() => {
    // Mock data for demonstration
    const mockRequests: VerificationRequest[] = [
      {
        id: "req-001",
        content: "Building collapsed on Main Street, multiple people trapped inside, need immediate rescue",
        location: "Main Street, Downtown",
        timestamp: new Date(Date.now() - 300000),
        urgencyScore: 95,
        duplicateScore: 15,
        spamScore: 5,
        status: "verified",
        confidence: 92,
        similarRequests: [],
        aiAnalysis:
          "High urgency medical emergency with structural collapse. Verified location and consistent details.",
      },
      {
        id: "req-002",
        content: "Need help on Main Street, building fell down, people stuck",
        location: "Main St, Downtown Area",
        timestamp: new Date(Date.now() - 240000),
        urgencyScore: 90,
        duplicateScore: 85,
        spamScore: 10,
        status: "duplicate",
        confidence: 88,
        similarRequests: ["req-001"],
        aiAnalysis: "Likely duplicate of req-001. Similar location and incident description with different wording.",
      },
      {
        id: "req-003",
        content: "Free money here! Click this link to claim your prize! Emergency help needed!",
        location: "Unknown",
        timestamp: new Date(Date.now() - 180000),
        urgencyScore: 20,
        duplicateScore: 5,
        spamScore: 95,
        status: "flagged",
        confidence: 97,
        similarRequests: [],
        aiAnalysis: "High spam probability. Contains promotional language and suspicious links unrelated to emergency.",
      },
      {
        id: "req-004",
        content: "Elderly person having chest pains, difficulty breathing, need ambulance urgently",
        location: "Oak Avenue, Residential District",
        timestamp: new Date(Date.now() - 120000),
        urgencyScore: 98,
        duplicateScore: 10,
        spamScore: 3,
        status: "verified",
        confidence: 96,
        similarRequests: [],
        aiAnalysis: "Critical medical emergency. Clear symptoms indicating potential cardiac event. High priority.",
      },
      {
        id: "req-005",
        content: "Water rising fast in basement, family trapped upstairs, can't get out",
        location: "Riverside Drive",
        timestamp: new Date(Date.now() - 60000),
        urgencyScore: 88,
        duplicateScore: 20,
        spamScore: 8,
        status: "pending",
        confidence: 85,
        similarRequests: [],
        aiAnalysis: "Flood emergency with people at risk. Consistent with weather conditions in area.",
      },
    ]

    setRequests(mockRequests)
    setStats({
      totalProcessed: 247,
      verified: 189,
      flagged: 23,
      duplicates: 35,
      avgProcessingTime: 2.3,
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500 text-white"
      case "flagged":
        return "bg-red-500 text-white"
      case "duplicate":
        return "bg-yellow-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  const getUrgencyColor = (score: number) => {
    if (score >= 90) return "text-red-600"
    if (score >= 70) return "text-orange-600"
    if (score >= 50) return "text-yellow-600"
    return "text-green-600"
  }

  const processRequest = async (requestId: string, action: "verify" | "flag") => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: action === "verify" ? "verified" : "flagged" } : req,
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
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Processed</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.totalProcessed}</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">Verified</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.verified}</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-muted-foreground">Flagged</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.flagged}</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">Avg Time</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.avgProcessingTime}s</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending ({requests.filter((r) => r.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="verified">
            Verified ({requests.filter((r) => r.status === "verified").length})
          </TabsTrigger>
          <TabsTrigger value="flagged">Flagged ({requests.filter((r) => r.status === "flagged").length})</TabsTrigger>
          <TabsTrigger value="duplicates">
            Duplicates ({requests.filter((r) => r.status === "duplicate").length})
          </TabsTrigger>
        </TabsList>

        {["pending", "verified", "flagged", "duplicates"].map((status) => (
          <TabsContent key={status} value={status === "duplicates" ? "duplicates" : status} className="space-y-4">
            {requests
              .filter((req) => (status === "duplicates" ? req.status === "duplicate" : req.status === status))
              .map((request) => (
                <Card
                  key={request.id}
                  className={cn(
                    "border-border cursor-pointer transition-all hover:shadow-md",
                    selectedRequest === request.id && "ring-2 ring-primary",
                  )}
                  onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(request.status)}>{request.status.toUpperCase()}</Badge>
                          <Badge variant="outline">ID: {request.id}</Badge>
                        </div>
                        <CardTitle className="text-lg">{request.content}</CardTitle>
                        <CardDescription>
                          {request.location} • {request.timestamp.toLocaleTimeString()}
                        </CardDescription>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Confidence</div>
                        <div className="text-lg font-bold text-foreground">{request.confidence}%</div>
                      </div>
                    </div>
                  </CardHeader>

                  {selectedRequest === request.id && (
                    <CardContent className="pt-0 space-y-4">
                      {/* AI Scores */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Urgency Score</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={request.urgencyScore} className="flex-1" />
                            <span className={cn("text-sm font-bold", getUrgencyColor(request.urgencyScore))}>
                              {request.urgencyScore}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Duplicate Score</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={request.duplicateScore} className="flex-1" />
                            <span className="text-sm font-bold text-foreground">{request.duplicateScore}%</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Spam Score</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={request.spamScore} className="flex-1" />
                            <span className="text-sm font-bold text-foreground">{request.spamScore}%</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Analysis */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">AI Analysis</label>
                        <div className="bg-muted p-3 rounded-lg mt-1">
                          <p className="text-sm text-foreground">{request.aiAnalysis}</p>
                        </div>
                      </div>

                      {/* Similar Requests */}
                      {request.similarRequests.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Similar Requests</label>
                          <div className="flex gap-2 mt-1">
                            {request.similarRequests.map((id) => (
                              <Badge key={id} variant="outline">
                                {id}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {request.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              processRequest(request.id, "verify")
                            }}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Verify Request
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              processRequest(request.id, "flag")
                            }}
                            variant="destructive"
                            className="flex-1"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Flag as Spam
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}

            {requests.filter((req) => (status === "duplicates" ? req.status === "duplicate" : req.status === status))
              .length === 0 && <div className="text-center py-8 text-muted-foreground">No {status} requests found</div>}
          </TabsContent>
        ))}
      </Tabs>

      {/* AI Processing Alert */}
      <Alert className="border-primary bg-primary/5">
        <Shield className="w-4 h-4 text-primary" />
        <AlertDescription className="text-primary">
          AI Verification System is actively monitoring incoming requests. Average processing time:{" "}
          {stats.avgProcessingTime} seconds per request.
        </AlertDescription>
      </Alert>
    </div>
  )
}
