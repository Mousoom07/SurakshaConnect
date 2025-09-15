"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, X, Eye, TrendingUp, Clock, Zap } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  content: string
  source: string
  timestamp: string
  verificationStatus: "verified" | "disputed" | "false" | "pending"
  confidenceScore: number
  category: "safety" | "infrastructure" | "resources" | "evacuation" | "health"
  impact: "high" | "medium" | "low"
  reportCount: number
  flaggedBy: string[]
  aiAnalysis: {
    factCheck: string
    sources: string[]
    reasoning: string
  }
}

interface MisinformationReport {
  id: string
  reportedContent: string
  reportedBy: string
  reason: string
  timestamp: string
  status: "investigating" | "confirmed_false" | "verified_true" | "inconclusive"
  aiConfidence: number
}

export default function MisinformationFilter() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: "news-001",
      title: "Main Bridge Collapse Confirmed",
      content:
        "City officials confirm the Main Street Bridge has partially collapsed due to earthquake damage. Alternative routes via Oak Avenue and Pine Street are available.",
      source: "City Emergency Management",
      timestamp: "2024-01-15 19:30:00",
      verificationStatus: "verified",
      confidenceScore: 96,
      category: "infrastructure",
      impact: "high",
      reportCount: 1,
      flaggedBy: [],
      aiAnalysis: {
        factCheck: "Verified through multiple official sources",
        sources: ["City Emergency Management", "Local News Channel 7", "Police Department"],
        reasoning: "Multiple credible sources confirm bridge damage with photographic evidence",
      },
    },
    {
      id: "news-002",
      title: "Water Treatment Plant Poisoned - AVOID ALL TAP WATER",
      content:
        "URGENT: Chemical contamination at water treatment facility. All tap water is toxic. Boiling will not help. Only bottled water is safe.",
      source: "Anonymous Social Media",
      timestamp: "2024-01-15 18:45:00",
      verificationStatus: "false",
      confidenceScore: 89,
      category: "health",
      impact: "high",
      reportCount: 23,
      flaggedBy: ["AI System", "Health Department", "Multiple Users"],
      aiAnalysis: {
        factCheck: "False information - water is safe after boiling",
        sources: ["Health Department Official Statement", "Water Authority"],
        reasoning:
          "No evidence of chemical contamination. Standard boil-water advisory is in effect due to power outage, not contamination.",
      },
    },
    {
      id: "news-003",
      title: "Evacuation Center at Roosevelt School Full",
      content: "Roosevelt Elementary evacuation center has reached capacity. Redirecting to Central Community Center.",
      source: "Red Cross Volunteer",
      timestamp: "2024-01-15 17:20:00",
      verificationStatus: "disputed",
      confidenceScore: 67,
      category: "evacuation",
      impact: "medium",
      reportCount: 8,
      flaggedBy: ["AI System"],
      aiAnalysis: {
        factCheck: "Partially accurate - center is busy but not full",
        sources: ["Red Cross Official", "School District"],
        reasoning:
          "Center is at 80% capacity, not full. Still accepting evacuees but prioritizing families with children.",
      },
    },
  ])

  const [reports, setReports] = useState<MisinformationReport[]>([
    {
      id: "report-001",
      reportedContent: "Heard that the hospital is turning away patients because they ran out of supplies",
      reportedBy: "Community Member",
      reason: "Causing panic and preventing people from seeking medical help",
      timestamp: "2024-01-15 20:15:00",
      status: "investigating",
      aiConfidence: 78,
    },
  ])

  const [newReport, setNewReport] = useState({
    content: "",
    reason: "",
  })

  const [filterStats, setFilterStats] = useState({
    totalProcessed: 1247,
    falseInfoBlocked: 89,
    verifiedNews: 156,
    pendingReview: 23,
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const analyzeContent = async (content: string) => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 15
      })
    }, 200)

    setTimeout(() => {
      const newItem: NewsItem = {
        id: `news-${Date.now()}`,
        title: "User Submitted Content",
        content: content,
        source: "User Submission",
        timestamp: new Date().toLocaleString(),
        verificationStatus: "pending",
        confidenceScore: Math.floor(Math.random() * 40 + 60),
        category: "safety",
        impact: "medium",
        reportCount: 0,
        flaggedBy: [],
        aiAnalysis: {
          factCheck: "Analysis in progress - cross-referencing with verified sources",
          sources: ["Checking official channels..."],
          reasoning: "AI is analyzing content for factual accuracy and potential harm",
        },
      }

      setNewsItems((prev) => [newItem, ...prev])
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }, 3000)
  }

  const submitReport = () => {
    if (!newReport.content || !newReport.reason) return

    const report: MisinformationReport = {
      id: `report-${Date.now()}`,
      reportedContent: newReport.content,
      reportedBy: "You",
      reason: newReport.reason,
      timestamp: new Date().toLocaleString(),
      status: "investigating",
      aiConfidence: Math.floor(Math.random() * 30 + 70),
    }

    setReports((prev) => [report, ...prev])
    setNewReport({ content: "", reason: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "false":
        return "bg-red-500"
      case "disputed":
        return "bg-orange-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "false":
        return <X className="h-4 w-4 text-red-500" />
      case "disputed":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Content Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterStats.totalProcessed}</div>
            <p className="text-xs text-muted-foreground">AI analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">False Info Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{filterStats.falseInfoBlocked}</div>
            <p className="text-xs text-muted-foreground">Prevented spread</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Verified News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{filterStats.verifiedNews}</div>
            <p className="text-xs text-muted-foreground">Confirmed accurate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{filterStats.pendingReview}</div>
            <p className="text-xs text-muted-foreground">Being verified</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Verified Feed</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
          <TabsTrigger value="report">Report Misinformation</TabsTrigger>
          <TabsTrigger value="analyze">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Verified Information Feed
              </CardTitle>
              <CardDescription>AI-filtered and fact-checked emergency information from trusted sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsItems
                  .filter((item) => item.verificationStatus === "verified")
                  .map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.verificationStatus)}
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(item.verificationStatus)}>Verified</Badge>
                            <span className={`text-sm font-medium ${getImpactColor(item.impact)}`}>
                              {item.impact} impact
                            </span>
                          </div>
                        </div>
                        <CardDescription>
                          {item.source} • {item.timestamp}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{item.content}</p>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            AI Verification
                          </h4>
                          <p className="text-sm text-green-700 mb-2">{item.aiAnalysis.factCheck}</p>
                          <div className="text-xs text-green-600">
                            <strong>Sources:</strong> {item.aiAnalysis.sources.join(", ")}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Flagged & Disputed Content
              </CardTitle>
              <CardDescription>Information identified as potentially false or harmful by AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsItems
                  .filter((item) => item.verificationStatus !== "verified")
                  .map((item) => (
                    <Card
                      key={item.id}
                      className={`border-l-4 ${
                        item.verificationStatus === "false"
                          ? "border-l-red-500"
                          : item.verificationStatus === "disputed"
                            ? "border-l-orange-500"
                            : "border-l-yellow-500"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.verificationStatus)}
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(item.verificationStatus)}>{item.verificationStatus}</Badge>
                            <span className="text-sm text-muted-foreground">{item.reportCount} reports</span>
                          </div>
                        </div>
                        <CardDescription>
                          {item.source} • {item.timestamp}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{item.content}</p>

                        {item.flaggedBy.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Flagged by:</h4>
                            <div className="flex flex-wrap gap-1">
                              {item.flaggedBy.map((flagger, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {flagger}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div
                          className={`p-3 rounded-lg ${
                            item.verificationStatus === "false"
                              ? "bg-red-50"
                              : item.verificationStatus === "disputed"
                                ? "bg-orange-50"
                                : "bg-yellow-50"
                          }`}
                        >
                          <h4
                            className={`font-medium mb-2 flex items-center gap-2 ${
                              item.verificationStatus === "false"
                                ? "text-red-800"
                                : item.verificationStatus === "disputed"
                                  ? "text-orange-800"
                                  : "text-yellow-800"
                            }`}
                          >
                            <AlertTriangle className="h-4 w-4" />
                            AI Analysis ({item.confidenceScore}% confidence)
                          </h4>
                          <p
                            className={`text-sm mb-2 ${
                              item.verificationStatus === "false"
                                ? "text-red-700"
                                : item.verificationStatus === "disputed"
                                  ? "text-orange-700"
                                  : "text-yellow-700"
                            }`}
                          >
                            {item.aiAnalysis.factCheck}
                          </p>
                          <p
                            className={`text-xs ${
                              item.verificationStatus === "false"
                                ? "text-red-600"
                                : item.verificationStatus === "disputed"
                                  ? "text-orange-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {item.aiAnalysis.reasoning}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Report Misinformation
              </CardTitle>
              <CardDescription>Help keep the community safe by reporting false or harmful information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Suspicious Content</label>
                  <Textarea
                    value={newReport.content}
                    onChange={(e) => setNewReport((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Paste the suspicious content or describe what you heard..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Why is this concerning?</label>
                  <Textarea
                    value={newReport.reason}
                    onChange={(e) => setNewReport((prev) => ({ ...prev, reason: e.target.value }))}
                    placeholder="Explain why you think this information is false or harmful..."
                    rows={3}
                  />
                </div>

                <Button onClick={submitReport} className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Submit Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Community-submitted misinformation reports under investigation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={report.status === "investigating" ? "secondary" : "default"}>
                          {report.status.replace("_", " ")}
                        </Badge>
                        <span className="text-sm text-muted-foreground">AI Confidence: {report.aiConfidence}%</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{report.timestamp}</span>
                    </div>

                    <p className="text-sm mb-2 bg-gray-50 p-2 rounded">"{report.reportedContent}"</p>

                    <p className="text-sm text-muted-foreground">
                      <strong>Concern:</strong> {report.reason}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyze" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Content Analysis
              </CardTitle>
              <CardDescription>Submit content for real-time AI fact-checking and verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Content to Analyze</label>
                  <Textarea
                    placeholder="Paste news, rumors, or information you want fact-checked..."
                    rows={4}
                    id="analyze-content"
                  />
                </div>

                <Button
                  onClick={() => {
                    const content = (document.getElementById("analyze-content") as HTMLTextAreaElement)?.value
                    if (content) analyzeContent(content)
                  }}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Analyze Content
                    </>
                  )}
                </Button>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      AI cross-referencing with verified sources...
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4" />
            <AlertTitle>How AI Verification Works</AlertTitle>
            <AlertDescription className="mt-2">
              Our AI system analyzes content by:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Cross-referencing with official sources and verified databases</li>
                <li>Checking for emotional language and fear-inducing phrases</li>
                <li>Analyzing source credibility and publication patterns</li>
                <li>Comparing with known misinformation patterns</li>
                <li>Verifying facts against real-time emergency data</li>
              </ul>
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
