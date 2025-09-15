import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Briefcase, Shield, AlertTriangle, Clock, Camera } from "lucide-react"

const profileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  organization: "",
  location: "",
  joinDate: "नवंबर 2024 / November 2024",
  lastActive: "अभी / Just now",
  profileImage: "",
  emergencyContact: {
    name: "",
    phone: "",
    relationship: "",
  },
  stats: {
    emergenciesHandled: 0,
    responseTime: "N/A",
    successRate: "N/A",
    teamSize: 0,
  },
}

export function ProfileOverview() {
  const isEmpty = !profileData.firstName && !profileData.lastName && !profileData.email

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="dashboard-card">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              {profileData.profileImage ? (
                <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt="Profile" />
              ) : (
                <AvatarFallback className="text-2xl bg-muted">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {isEmpty ? "आपका नाम / Your Name" : `${profileData.firstName} ${profileData.lastName}`}
                </h2>
                <p className="text-muted-foreground">{profileData.role || "आपकी भूमिका / Your Role"}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {profileData.organization || "आपका संगठन / Your Organization"}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {profileData.location || "आपका स्थान / Your Location"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="outline" className="gap-1">
                  <Shield className="h-3 w-3" />
                  {isEmpty ? "प्रोफ़ाइल अधूरी / Profile Incomplete" : "सत्यापित पेशेवर / Verified Professional"}
                </Badge>
                <Badge variant={isEmpty ? "secondary" : "default"}>
                  {isEmpty ? "नया उपयोगकर्ता / New User" : "सक्रिय / Active"}
                </Badge>
                <span className="text-sm text-muted-foreground">अंतिम सक्रिय: {profileData.lastActive}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isEmpty && (
        <Card className="dashboard-card border-orange-200 bg-orange-50/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <h3 className="font-medium">प्रोफ़ाइल पूरी करें / Complete Your Profile</h3>
                <p className="text-sm text-muted-foreground">
                  बेहतर आपातकालीन सेवाओं के लिए अपनी प्रोफ़ाइल जानकारी भरें / Fill in your profile information for better
                  emergency services
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            संपर्क जानकारी / Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{profileData.email || "आपका ईमेल / Your Email"}</p>
                <p className="text-sm text-muted-foreground">प्राथमिक ईमेल / Primary Email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{profileData.phone || "आपका फोन / Your Phone"}</p>
                <p className="text-sm text-muted-foreground">मोबाइल फोन / Mobile Phone</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            आपातकालीन संपर्क / Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium">
                {profileData.emergencyContact.name || "आपातकालीन संपर्क नाम / Emergency Contact Name"}
              </p>
              <p className="text-sm text-muted-foreground">
                {profileData.emergencyContact.relationship || "रिश्ता / Relationship"} •{" "}
                {profileData.emergencyContact.phone || "फोन नंबर / Phone Number"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            प्रदर्शन अवलोकन / Performance Overview
          </CardTitle>
          <CardDescription>
            आपकी आपातकालीन प्रतिक्रिया आंकड़े और उपलब्धियां / Your emergency response statistics and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profileData.stats.emergenciesHandled}</div>
              <div className="text-sm text-muted-foreground">आपातकाल संभाले / Emergencies Handled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{profileData.stats.responseTime}</div>
              <div className="text-sm text-muted-foreground">औसत प्रतिक्रिया समय / Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{profileData.stats.successRate}</div>
              <div className="text-sm text-muted-foreground">सफलता दर / Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profileData.stats.teamSize}</div>
              <div className="text-sm text-muted-foreground">टीम सदस्य / Team Members</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>खाता विवरण / Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">सदस्य बने / Member Since</span>
            <span className="font-medium">{profileData.joinDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">खाता प्रकार / Account Type</span>
            <Badge variant="outline">व्यक्तिगत / Personal</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">सत्यापन स्थिति / Verification Status</span>
            <Badge variant={isEmpty ? "secondary" : "default"}>
              {isEmpty ? "लंबित / Pending" : "सत्यापित / Verified"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
