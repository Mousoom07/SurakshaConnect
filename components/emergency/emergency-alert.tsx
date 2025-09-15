"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Phone, MapPin, Send, Mic, Camera } from "lucide-react"

interface EmergencyAlert {
  type: string
  severity: string
  location: string
  description: string
  contactInfo: string
}

const emergencyTypes = [
  { value: "medical", label: "Medical Emergency", color: "destructive" },
  { value: "fire", label: "Fire", color: "destructive" },
  { value: "police", label: "Police/Security", color: "secondary" },
  { value: "natural-disaster", label: "Natural Disaster", color: "destructive" },
  { value: "accident", label: "Accident", color: "secondary" },
  { value: "other", label: "Other Emergency", color: "outline" },
]

const severityLevels = [
  { value: "critical", label: "Critical - Life Threatening", color: "destructive" },
  { value: "high", label: "High - Urgent Response", color: "secondary" },
  { value: "medium", label: "Medium - Standard Response", color: "outline" },
  { value: "low", label: "Low - Non-urgent", color: "outline" },
]

export function EmergencyAlert() {
  const [alert, setAlert] = useState<EmergencyAlert>({
    type: "",
    severity: "",
    location: "",
    description: "",
    contactInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateAlert = (field: keyof EmergencyAlert, value: string) => {
    setAlert((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate emergency alert submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleQuickCall = () => {
    window.open("tel:911")
  }

  if (isSubmitted) {
    return (
      <Card className="border-primary">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Emergency Alert Sent</h3>
              <p className="text-muted-foreground">Your emergency alert has been dispatched to local response teams.</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Alert ID: #EM-2024-001</Badge>
              <p className="text-sm text-muted-foreground">Expected response time: 3-5 minutes</p>
            </div>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Send Another Alert
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Emergency Alert System
        </CardTitle>
        <CardDescription>Report emergencies and get immediate assistance from response teams</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button type="button" variant="destructive" onClick={handleQuickCall} className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call 911
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent">
              <Mic className="h-4 w-4 mr-2" />
              Voice Alert
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent">
              <Camera className="h-4 w-4 mr-2" />
              Photo Evidence
            </Button>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              For immediate life-threatening emergencies, call 911 directly. Use this form for non-critical emergencies
              or to provide additional details.
            </AlertDescription>
          </Alert>

          {/* Emergency Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Emergency Type *</Label>
            <Select onValueChange={(value) => updateAlert("type", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select emergency type" />
              </SelectTrigger>
              <SelectContent>
                {emergencyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Severity Level */}
          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level *</Label>
            <Select onValueChange={(value) => updateAlert("severity", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select severity level" />
              </SelectTrigger>
              <SelectContent>
                {severityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={alert.location}
                onChange={(e) => updateAlert("location", e.target.value)}
                placeholder="Enter specific address or landmark"
                className="pl-10"
                required
              />
            </div>
            <Button type="button" variant="outline" size="sm">
              Use Current Location
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={alert.description}
              onChange={(e) => updateAlert("description", e.target.value)}
              placeholder="Describe the emergency situation in detail..."
              rows={4}
              required
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="contact">Your Contact Information</Label>
            <Input
              id="contact"
              value={alert.contactInfo}
              onChange={(e) => updateAlert("contactInfo", e.target.value)}
              placeholder="Phone number for emergency responders to reach you"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !alert.type || !alert.severity || !alert.location || !alert.description}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              "Sending Alert..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Emergency Alert
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
