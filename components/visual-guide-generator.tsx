"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  BookOpen,
  ImageIcon,
  Volume2,
  Share,
  AlertTriangle,
  Heart,
  Shield,
  Flame,
  Waves,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GuideStep {
  id: number
  title: string
  description: string
  imageUrl?: string
  audioUrl?: string
  warning?: string
  duration?: string
}

interface SurvivalGuide {
  id: string
  title: string
  category: string
  urgency: "low" | "medium" | "high" | "critical"
  description: string
  estimatedTime: string
  steps: GuideStep[]
  language: string
}

const mockGuides: SurvivalGuide[] = [
  {
    id: "guide-001",
    title: "Earthquake Safety: Building Collapse",
    category: "earthquake",
    urgency: "critical",
    description: "Essential steps to survive if trapped in a collapsed building",
    estimatedTime: "5-10 minutes",
    language: "English",
    steps: [
      {
        id: 1,
        title: "Stay Calm and Assess",
        description:
          "Take deep breaths. Check for injuries. Look around for immediate dangers like gas leaks or electrical hazards.",
        imageUrl: "/person-staying-calm-in-collapsed-building.jpg",
        warning: "Do not use matches or lighters - gas leaks may be present",
        duration: "30 seconds",
      },
      {
        id: 2,
        title: "Create Noise for Rescue",
        description:
          "Tap on pipes or walls in sets of three. Shout only as a last resort to conserve energy and avoid inhaling dust.",
        imageUrl: "/person-tapping-on-pipe-for-rescue-signal.jpg",
        duration: "2-3 minutes",
      },
      {
        id: 3,
        title: "Find Safe Space",
        description:
          "Move to the strongest part of your shelter. Look for triangle of life spaces next to large objects.",
        imageUrl: "/triangle-of-life-safe-space-in-collapsed-building.jpg",
        duration: "1-2 minutes",
      },
      {
        id: 4,
        title: "Conserve Air and Energy",
        description:
          "Cover your mouth with cloth to filter dust. Breathe slowly and steadily. Avoid unnecessary movement.",
        imageUrl: "/person-covering-mouth-with-cloth-in-dusty-environm.jpg",
        duration: "Ongoing",
      },
    ],
  },
  {
    id: "guide-002",
    title: "Flood Evacuation Safety",
    category: "flood",
    urgency: "high",
    description: "How to safely evacuate during rising flood waters",
    estimatedTime: "10-15 minutes",
    language: "English",
    steps: [
      {
        id: 1,
        title: "Turn Off Utilities",
        description: "Shut off electricity, gas, and water at main switches if you can do so safely.",
        imageUrl: "/person-turning-off-electrical-main-switch-safely.jpg",
        warning: "Never touch electrical equipment if you're wet or standing in water",
        duration: "2-3 minutes",
      },
      {
        id: 2,
        title: "Gather Emergency Supplies",
        description: "Take only essential items: medications, documents, water, flashlight, and battery radio.",
        imageUrl: "/emergency-supply-kit-with-flashlight-water-medicat.jpg",
        duration: "3-5 minutes",
      },
      {
        id: 3,
        title: "Choose Safe Route",
        description: "Avoid walking in moving water. 6 inches can knock you down. Use a stick to check depth ahead.",
        imageUrl: "/person-using-stick-to-test-flood-water-depth.jpg",
        warning: "Turn around, don't drown - find alternate route if water is too deep",
        duration: "5-10 minutes",
      },
    ],
  },
]

export function VisualGuideGenerator() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [customRequest, setCustomRequest] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<SurvivalGuide | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const categories = [
    { value: "all", label: "All Categories", icon: BookOpen },
    { value: "earthquake", label: "Earthquake", icon: AlertTriangle },
    { value: "flood", label: "Flood", icon: Waves },
    { value: "fire", label: "Fire", icon: Flame },
    { value: "medical", label: "Medical", icon: Heart },
    { value: "shelter", label: "Shelter", icon: Shield },
  ]

  const filteredGuides = mockGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const generateCustomGuide = async () => {
    if (!customRequest.trim()) return

    setIsGenerating(true)
    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const customGuide: SurvivalGuide = {
        id: "custom-" + Date.now(),
        title: "Custom Emergency Guide",
        category: "custom",
        urgency: "high",
        description: customRequest,
        estimatedTime: "5-15 minutes",
        language: "English",
        steps: [
          {
            id: 1,
            title: "Assess the Situation",
            description: "Quickly evaluate your immediate surroundings and identify potential dangers.",
            imageUrl: "/person-assessing-emergency-situation.jpg",
            duration: "1-2 minutes",
          },
          {
            id: 2,
            title: "Take Immediate Action",
            description: "Follow the most critical safety steps based on your specific emergency situation.",
            imageUrl: "/person-taking-emergency-safety-action.jpg",
            duration: "3-5 minutes",
          },
          {
            id: 3,
            title: "Signal for Help",
            description: "Use available methods to alert rescue services or nearby people of your situation.",
            imageUrl: "/person-signaling-for-emergency-help.jpg",
            duration: "2-3 minutes",
          },
        ],
      }

      setSelectedGuide(customGuide)
      setCurrentStep(0)
    } catch (error) {
      console.error("Error generating guide:", error)
    } finally {
      setIsGenerating(false)
    }
  }

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

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((c) => c.value === category)
    const IconComponent = categoryData?.icon || BookOpen
    return <IconComponent className="w-4 h-4" />
  }

  const playAudio = (step: GuideStep) => {
    // In real implementation, this would use text-to-speech API
    console.log("Playing audio for step:", step.title)
    alert("Audio playback would start here using text-to-speech API")
  }

  if (selectedGuide) {
    const currentStepData = selectedGuide.steps[currentStep]

    return (
      <div className="space-y-6">
        {/* Guide Header */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(selectedGuide.category)}
                  <Badge className={cn("text-xs", getUrgencyColor(selectedGuide.urgency))}>
                    {selectedGuide.urgency.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{selectedGuide.title}</CardTitle>
                <CardDescription>{selectedGuide.description}</CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Estimated time: {selectedGuide.estimatedTime}</span>
                  <span>Language: {selectedGuide.language}</span>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedGuide(null)}>
                Back to Guides
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Step Progress */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Progress</h3>
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {selectedGuide.steps.length}
              </span>
            </div>
            <div className="flex gap-2">
              {selectedGuide.steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    index <= currentStep ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                {currentStepData.duration && <Badge variant="outline">Duration: {currentStepData.duration}</Badge>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => playAudio(currentStepData)}>
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStepData.imageUrl && (
              <div className="relative">
                <img
                  src={currentStepData.imageUrl || "/placeholder.svg"}
                  alt={currentStepData.title}
                  className="w-full h-48 object-cover rounded-lg border border-border"
                />
                <Button size="sm" variant="secondary" className="absolute top-2 right-2">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  View Full Size
                </Button>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-foreground leading-relaxed">{currentStepData.description}</p>

              {currentStepData.warning && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <h4 className="font-medium text-accent mb-1">Warning</h4>
                      <p className="text-sm text-foreground">{currentStepData.warning}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous Step
              </Button>

              {currentStep < selectedGuide.steps.length - 1 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)} className="bg-primary hover:bg-primary/90">
                  Next Step
                </Button>
              ) : (
                <Button className="bg-green-500 hover:bg-green-600 text-white">Guide Complete</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Survival Guide Library</CardTitle>
          <CardDescription>
            Find step-by-step visual guides for emergency situations, or generate a custom guide using AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search survival guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Custom Guide Generator */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Generate Custom Guide
          </CardTitle>
          <CardDescription>
            Describe your emergency situation and AI will create a personalized survival guide with visual instructions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your emergency situation (e.g., 'I'm trapped in a car during a flash flood' or 'There's a gas leak in my building')..."
            value={customRequest}
            onChange={(e) => setCustomRequest(e.target.value)}
            rows={3}
          />
          <Button
            onClick={generateCustomGuide}
            disabled={!customRequest.trim() || isGenerating}
            className="w-full bg-secondary hover:bg-secondary/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Guide...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Generate Visual Guide
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Guide Library */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="border-border hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(guide.category)}
                    <Badge className={cn("text-xs", getUrgencyColor(guide.urgency))}>
                      {guide.urgency.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{guide.steps.length} steps</span>
                <span>{guide.estimatedTime}</span>
              </div>

              <Button onClick={() => setSelectedGuide(guide)} className="w-full bg-primary hover:bg-primary/90">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Guide
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <Card className="border-border">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No guides found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or generate a custom guide above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
