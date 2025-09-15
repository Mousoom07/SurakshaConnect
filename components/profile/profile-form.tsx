"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Phone, MapPin, Briefcase, Camera, Save, AlertTriangle, Upload, X } from "lucide-react"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  organization: string
  location: string
  bio: string
  profileImage: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  medicalInfo: {
    bloodType: string
    allergies: string
    medications: string
    conditions: string
  }
}

const initialProfile: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  organization: "",
  location: "",
  bio: "",
  profileImage: "",
  emergencyContact: {
    name: "",
    phone: "",
    relationship: "",
  },
  medicalInfo: {
    bloodType: "",
    allergies: "",
    medications: "",
    conditions: "",
  },
}

export function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateProfile = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const updateNestedProfile = (section: string, field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [section]: { ...prev[section as keyof ProfileData], [field]: value },
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        updateProfile("profileImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    updateProfile("profileImage", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess(false)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const getRoleLabel = (role: string) => {
    const roles = {
      citizen: "नागरिक / Citizen",
      "first-responder": "प्राथमिक उत्तरदाता / First Responder",
      "emergency-coordinator": "आपातकालीन समन्वयक / Emergency Coordinator",
      "government-official": "सरकारी अधिकारी / Government Official",
      "ngo-volunteer": "एनजीओ स्वयंसेवक / NGO Volunteer",
      "police-officer": "पुलिस अधिकारी / Police Officer",
      "fire-fighter": "अग्निशामक / Fire Fighter",
      "medical-professional": "चिकित्सा पेशेवर / Medical Professional",
    }
    return roles[role as keyof typeof roles] || "Select Role / भूमिका चुनें"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई! / Profile updated successfully!</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            बुनियादी जानकारी / Basic Information
          </CardTitle>
          <CardDescription>
            आपकी व्यक्तिगत जानकारी और संपर्क विवरण / Your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              {imagePreview || profile.profileImage ? (
                <AvatarImage src={imagePreview || profile.profileImage} alt="Profile" />
              ) : (
                <AvatarFallback className="text-lg bg-muted">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  फोटो अपलोड करें / Upload Photo
                </Button>
                {(imagePreview || profile.profileImage) && (
                  <Button type="button" variant="outline" size="sm" onClick={removeImage}>
                    <X className="h-4 w-4 mr-2" />
                    हटाएं / Remove
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                JPG, PNG या GIF। अधिकतम आकार 2MB / JPG, PNG or GIF. Max size 2MB.
              </p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">पहला नाम / First Name *</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => updateProfile("firstName", e.target.value)}
                placeholder="अपना पहला नाम दर्ज करें / Enter your first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">अंतिम नाम / Last Name *</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => updateProfile("lastName", e.target.value)}
                placeholder="अपना अंतिम नाम दर्ज करें / Enter your last name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">ईमेल पता / Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile("email", e.target.value)}
                  className="pl-10"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">फोन नंबर / Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => updateProfile("phone", e.target.value)}
                  className="pl-10"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">भूमिका / Role *</Label>
              <Select onValueChange={(value) => updateProfile("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="अपनी भूमिका चुनें / Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">नागरिक / Citizen</SelectItem>
                  <SelectItem value="first-responder">प्राथमिक उत्तरदाता / First Responder</SelectItem>
                  <SelectItem value="police-officer">पुलिस अधिकारी / Police Officer</SelectItem>
                  <SelectItem value="fire-fighter">अग्निशामक / Fire Fighter</SelectItem>
                  <SelectItem value="medical-professional">चिकित्सा पेशेवर / Medical Professional</SelectItem>
                  <SelectItem value="emergency-coordinator">आपातकालीन समन्वयक / Emergency Coordinator</SelectItem>
                  <SelectItem value="government-official">सरकारी अधिकारी / Government Official</SelectItem>
                  <SelectItem value="ngo-volunteer">एनजीओ स्वयंसेवक / NGO Volunteer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">संगठन / Organization</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="organization"
                  value={profile.organization}
                  onChange={(e) => updateProfile("organization", e.target.value)}
                  className="pl-10"
                  placeholder="आपका संगठन / Your organization"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">स्थान / Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => updateProfile("location", e.target.value)}
                className="pl-10"
                placeholder="शहर, राज्य, भारत / City, State, India"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">बायो / Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => updateProfile("bio", e.target.value)}
              placeholder="अपने बारे में और अपने अनुभव के बारे में बताएं... / Tell us about yourself and your experience..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            आपातकालीन संपर्क / Emergency Contact
          </CardTitle>
          <CardDescription>
            आपातकाल की स्थिति में प्राथमिक संपर्क व्यक्ति / Primary contact person in case of emergency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyName">संपर्क नाम / Contact Name *</Label>
              <Input
                id="emergencyName"
                value={profile.emergencyContact.name}
                onChange={(e) => updateNestedProfile("emergencyContact", "name", e.target.value)}
                placeholder="आपातकालीन संपर्क का नाम / Emergency contact name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">संपर्क फोन / Contact Phone *</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={profile.emergencyContact.phone}
                onChange={(e) => updateNestedProfile("emergencyContact", "phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationship">रिश्ता / Relationship *</Label>
            <Select onValueChange={(value) => updateNestedProfile("emergencyContact", "relationship", value)}>
              <SelectTrigger>
                <SelectValue placeholder="रिश्ता चुनें / Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="पति/पत्नी / Spouse">पति/पत्नी / Spouse</SelectItem>
                <SelectItem value="माता-पिता / Parent">माता-पिता / Parent</SelectItem>
                <SelectItem value="बच्चा / Child">बच्चा / Child</SelectItem>
                <SelectItem value="भाई-बहन / Sibling">भाई-बहन / Sibling</SelectItem>
                <SelectItem value="मित्र / Friend">मित्र / Friend</SelectItem>
                <SelectItem value="सहकर्मी / Colleague">सहकर्मी / Colleague</SelectItem>
                <SelectItem value="अन्य / Other">अन्य / Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            चिकित्सा जानकारी / Medical Information
          </CardTitle>
          <CardDescription>
            आपातकालीन उत्तरदाताओं के लिए महत्वपूर्ण चिकित्सा विवरण / Important medical details for emergency responders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType">रक्त समूह / Blood Type</Label>
              <Select onValueChange={(value) => updateNestedProfile("medicalInfo", "bloodType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="रक्त समूह चुनें / Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="अज्ञात / Unknown">अज्ञात / Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">एलर्जी / Allergies</Label>
              <Input
                id="allergies"
                value={profile.medicalInfo.allergies}
                onChange={(e) => updateNestedProfile("medicalInfo", "allergies", e.target.value)}
                placeholder="कोई एलर्जी सूचीबद्ध करें / List any allergies"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications">वर्तमान दवाएं / Current Medications</Label>
            <Textarea
              id="medications"
              value={profile.medicalInfo.medications}
              onChange={(e) => updateNestedProfile("medicalInfo", "medications", e.target.value)}
              placeholder="वर्तमान दवाएं और खुराक सूचीबद्ध करें / List current medications and dosages"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditions">चिकित्सा स्थितियां / Medical Conditions</Label>
            <Textarea
              id="conditions"
              value={profile.medicalInfo.conditions}
              onChange={(e) => updateNestedProfile("medicalInfo", "conditions", e.target.value)}
              placeholder="कोई भी चिकित्सा स्थिति या विकलांगता सूचीबद्ध करें / List any medical conditions or disabilities"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} size="lg">
          {isLoading ? (
            "सेव हो रहा है... / Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              प्रोफ़ाइल सेव करें / Save Profile
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
