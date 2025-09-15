"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Pause, SkipForward, SkipBack, Volume2, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface MedicalStep {
  id: number
  title: string
  instruction: string
  warning?: string
  duration: string
  imageUrl: string
  audioText: string
}

interface MedicalScenario {
  id: string
  title: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  steps: MedicalStep[]
  warnings: string[]
}

export function MedicalFirstAidCompanion() {
  const [symptoms, setSymptoms] = useState("")
  const [currentScenario, setCurrentScenario] = useState<MedicalScenario | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const medicalScenarios: MedicalScenario[] = [
    {
      id: "bleeding",
      title: "Severe Bleeding Control",
      severity: "critical",
      description: "Heavy bleeding from wound, blood soaking through clothing",
      warnings: ["Call emergency services immediately", "Do not remove embedded objects", "Monitor for shock"],
      steps: [
        {
          id: 1,
          title: "Apply Direct Pressure",
          instruction: "Place clean cloth or gauze directly on the wound. Press firmly with both hands.",
          duration: "2-3 minutes",
          imageUrl: "/direct-pressure-bleeding-control.jpg",
          audioText: "Apply direct pressure to the wound using a clean cloth. Press firmly and maintain pressure.",
        },
        {
          id: 2,
          title: "Elevate if Possible",
          instruction: "If the injury is on an arm or leg, raise it above heart level while maintaining pressure.",
          duration: "Ongoing",
          imageUrl: "/elevate-injured-limb.jpg",
          audioText: "Elevate the injured limb above heart level if possible, while continuing to apply pressure.",
        },
        {
          id: 3,
          title: "Add More Dressing",
          instruction: "If blood soaks through, add more cloth on top. Do not remove the original dressing.",
          warning: "Never remove blood-soaked dressings",
          duration: "As needed",
          imageUrl: "/add-more-dressing-bleeding.jpg",
          audioText: "If bleeding continues, add more clean cloth on top of the existing dressing.",
        },
        {
          id: 4,
          title: "Monitor for Shock",
          instruction: "Watch for pale skin, rapid pulse, weakness. Keep person warm and lying down.",
          duration: "Continuous",
          imageUrl: "/monitor-shock-symptoms.jpg",
          audioText: "Monitor the person for signs of shock including pale skin, rapid pulse, and weakness.",
        },
      ],
    },
    {
      id: "choking",
      title: "Choking Emergency",
      severity: "critical",
      description: "Person cannot speak, cough, or breathe; hands at throat",
      warnings: ["Act immediately - brain damage occurs within 4-6 minutes", "Call 911 while performing aid"],
      steps: [
        {
          id: 1,
          title: "Confirm Choking",
          instruction: "Ask 'Are you choking?' If they cannot speak or cough, begin immediate action.",
          duration: "5 seconds",
          imageUrl: "/confirm-choking-signs.jpg",
          audioText: "Confirm the person is choking by asking if they can speak or cough.",
        },
        {
          id: 2,
          title: "Position for Heimlich",
          instruction: "Stand behind person, wrap arms around waist, place fist above navel below ribcage.",
          duration: "10 seconds",
          imageUrl: "/heimlich-maneuver-position.jpg",
          audioText: "Position yourself behind the person and place your fist above their navel.",
        },
        {
          id: 3,
          title: "Perform Abdominal Thrusts",
          instruction: "Grasp fist with other hand, thrust inward and upward with quick, sharp movements.",
          duration: "Until object dislodged",
          imageUrl: "/abdominal-thrusts-technique.jpg",
          audioText: "Perform quick, sharp upward thrusts into the abdomen to dislodge the object.",
        },
        {
          id: 4,
          title: "Continue Until Clear",
          instruction: "Repeat thrusts until object is expelled or person becomes unconscious.",
          duration: "As needed",
          imageUrl: "/continue-heimlich-until-clear.jpg",
          audioText: "Continue abdominal thrusts until the airway is clear or emergency help arrives.",
        },
      ],
    },
    {
      id: "cardiac",
      title: "Cardiac Emergency",
      severity: "critical",
      description: "Chest pain, difficulty breathing, sweating, nausea",
      warnings: ["Time is critical - every minute counts", "Do not drive to hospital", "Prepare for CPR if needed"],
      steps: [
        {
          id: 1,
          title: "Call Emergency Services",
          instruction: "Call 911 immediately. Give clear location and describe symptoms.",
          duration: "1-2 minutes",
          imageUrl: "/call-emergency-cardiac.jpg",
          audioText: "Call emergency services immediately and describe the cardiac symptoms clearly.",
        },
        {
          id: 2,
          title: "Position Person",
          instruction: "Help person sit comfortably, slightly upright. Loosen tight clothing around neck and chest.",
          duration: "30 seconds",
          imageUrl: "/position-cardiac-patient.jpg",
          audioText: "Help the person sit in a comfortable, slightly upright position.",
        },
        {
          id: 3,
          title: "Give Aspirin if Available",
          instruction: "If person is conscious and not allergic, give 325mg aspirin to chew slowly.",
          warning: "Only if no aspirin allergy",
          duration: "1 minute",
          imageUrl: "/give-aspirin-cardiac-emergency.jpg",
          audioText: "If available and no allergies, give aspirin for the person to chew slowly.",
        },
        {
          id: 4,
          title: "Monitor and Reassure",
          instruction: "Stay with person, monitor breathing and pulse. Provide reassurance and comfort.",
          duration: "Until help arrives",
          imageUrl: "/monitor-cardiac-patient.jpg",
          audioText: "Stay with the person, monitor their condition, and provide reassurance.",
        },
      ],
    },
  ]

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return

    setIsAnalyzing(true)
    try {
      // Mock AI analysis - in production, use actual medical AI
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simple keyword matching for demo
      const lowerSymptoms = symptoms.toLowerCase()
      let matchedScenario: MedicalScenario | null = null

      if (lowerSymptoms.includes("bleeding") || lowerSymptoms.includes("blood") || lowerSymptoms.includes("cut")) {
        matchedScenario = medicalScenarios.find((s) => s.id === "bleeding") || null
      } else if (
        lowerSymptoms.includes("choking") ||
        lowerSymptoms.includes("can't breathe") ||
        lowerSymptoms.includes("throat")
      ) {
        matchedScenario = medicalScenarios.find((s) => s.id === "choking") || null
      } else if (
        lowerSymptoms.includes("chest pain") ||
        lowerSymptoms.includes("heart") ||
        lowerSymptoms.includes("cardiac")
      ) {
        matchedScenario = medicalScenarios.find((s) => s.id === "cardiac") || null
      } else {
        // Default to bleeding scenario for demo
        matchedScenario = medicalScenarios[0]
      }

      setCurrentScenario(matchedScenario)
      setCurrentStep(0)
    } catch (error) {
      console.error("Error analyzing symptoms:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)

      speechSynthesis.speak(utterance)
    }
  }

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  return (
    <div className="space-y-6">
      {/* Symptom Input */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Medical Emergency Assistant
          </CardTitle>
          <CardDescription>
            Describe the medical emergency symptoms and get step-by-step first aid instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Describe the symptoms or medical emergency
            </label>
            <Textarea
              placeholder="Example: Person is bleeding heavily from arm wound, blood soaking through clothing..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <Button onClick={analyzeSymptoms} disabled={!symptoms.trim() || isAnalyzing} className="w-full">
            {isAnalyzing ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Get First Aid Instructions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Medical Scenario Results */}
      {currentScenario && (
        <div className="space-y-6">
          {/* Scenario Overview */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(currentScenario.severity)}>
                      {currentScenario.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">Medical Emergency</Badge>
                  </div>
                  <CardTitle className="text-xl">{currentScenario.title}</CardTitle>
                  <CardDescription>{currentScenario.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-muted-foreground">Progress</div>
                  <div className="text-2xl font-bold text-foreground">
                    {currentStep + 1}/{currentScenario.steps.length}
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Warnings */}
            {currentScenario.warnings.length > 0 && (
              <CardContent className="pt-0">
                <Alert className="border-red-500 bg-red-50">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Critical Warnings:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {currentScenario.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            )}
          </Card>

          {/* Current Step */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">Step {currentScenario.steps[currentStep].id}</Badge>
                  {currentScenario.steps[currentStep].title}
                </CardTitle>
                <Badge variant="secondary">{currentScenario.steps[currentStep].duration}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Visual Guide */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <img
                  src={`/abstract-geometric-shapes.png?height=300&width=500&query=${encodeURIComponent(
                    currentScenario.steps[currentStep].title,
                  )}`}
                  alt={currentScenario.steps[currentStep].title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Instructions:</h4>
                <p className="text-foreground">{currentScenario.steps[currentStep].instruction}</p>

                {currentScenario.steps[currentStep].warning && (
                  <Alert className="border-amber-500 bg-amber-50">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <strong>Warning:</strong> {currentScenario.steps[currentStep].warning}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Audio Controls */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => (isPlaying ? stopAudio() : playAudio(currentScenario.steps[currentStep].audioText))}
                  variant="outline"
                  size="sm"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Stop Audio
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Play Instructions
                    </>
                  )}
                </Button>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Step Progress</span>
                  <span>
                    {currentStep + 1} of {currentScenario.steps.length}
                  </span>
                </div>
                <Progress value={((currentStep + 1) / currentScenario.steps.length) * 100} />
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="flex-1"
                >
                  <SkipBack className="w-4 h-4 mr-2" />
                  Previous Step
                </Button>
                <Button
                  onClick={() => setCurrentStep(Math.min(currentScenario.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === currentScenario.steps.length - 1}
                  className="flex-1"
                >
                  Next Step
                  <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* All Steps Overview */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>All Steps Overview</CardTitle>
              <CardDescription>Complete first aid procedure for {currentScenario.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentScenario.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      index === currentStep
                        ? "border-primary bg-primary/5"
                        : index < currentStep
                          ? "border-green-500 bg-green-50"
                          : "border-border bg-background",
                    )}
                    onClick={() => setCurrentStep(index)}
                  >
                    <Badge
                      variant={index === currentStep ? "default" : index < currentStep ? "secondary" : "outline"}
                      className={cn(
                        "min-w-[32px] h-8 flex items-center justify-center",
                        index < currentStep && "bg-green-500 text-white",
                      )}
                    >
                      {step.id}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
