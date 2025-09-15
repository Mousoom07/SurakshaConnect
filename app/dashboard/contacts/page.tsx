import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, MapPin, Shield, Truck, Heart, Search, Plus, Edit } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-background dashboard-page">
      <DashboardHeader />

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/50">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Emergency Contacts</h2>
                <p className="text-muted-foreground">आपातकालीन संपर्क - Manage emergency service contacts across India</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>

            <Card className="dashboard-card border-red-200 bg-red-950/20 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <Phone className="h-5 w-5" />
                  Indian National Emergency Numbers
                  <span className="text-sm font-normal text-muted-foreground">भारतीय राष्ट्रीय आपातकालीन नंबर</span>
                </CardTitle>
                <CardDescription>
                  Official emergency service numbers valid across all Indian states and territories
                  <br />
                  <span className="text-sm text-muted-foreground/80">
                    सभी भारतीय राज्यों और केंद्र शासित प्रदेशों में वैध आधिकारिक आपातकालीन सेवा नंबर
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-blue-700 dark:text-blue-400">100</div>
                      <div className="text-sm font-medium">Police</div>
                      <div className="text-xs text-muted-foreground">पुलिस</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-red-500/10 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-red-700 dark:text-red-400">101</div>
                      <div className="text-sm font-medium">Fire</div>
                      <div className="text-xs text-muted-foreground">अग्निशमन</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-green-700 dark:text-green-400">102</div>
                      <div className="text-sm font-medium">Ambulance</div>
                      <div className="text-xs text-muted-foreground">एम्बुलेंस</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-orange-700 dark:text-orange-400">108</div>
                      <div className="text-sm font-medium">Emergency</div>
                      <div className="text-xs text-muted-foreground">आपातकाल</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> These numbers work from any phone (mobile/landline) across India without area
                    codes.
                    <br />
                    <span className="text-xs text-yellow-700 dark:text-yellow-300">
                      नोट: ये नंबर भारत भर में किसी भी फोन (मोबाइल/लैंडलाइन) से बिना एरिया कोड के काम करते हैं।
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="max-w-sm bg-input text-foreground" />
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Contacts / सभी संपर्क</TabsTrigger>
                <TabsTrigger value="police">Police / पुलिस</TabsTrigger>
                <TabsTrigger value="fire">Fire / अग्निशमन</TabsTrigger>
                <TabsTrigger value="medical">Medical / चिकित्सा</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "Mumbai Police Control Room",
                      type: "police",
                      phone: "+91-22-2262-0111",
                      email: "control@mumbaipolice.gov.in",
                      location: "Mumbai, Maharashtra",
                      status: "Active",
                      icon: Shield,
                      color: "bg-blue-500/10 text-blue-700",
                    },
                    {
                      name: "Delhi Fire Service",
                      type: "fire",
                      phone: "+91-11-2331-0101",
                      email: "emergency@delhifire.gov.in",
                      location: "New Delhi",
                      status: "Active",
                      icon: Truck,
                      color: "bg-red-500/10 text-red-700",
                    },
                    {
                      name: "AIIMS Emergency",
                      type: "medical",
                      phone: "+91-11-2659-3756",
                      email: "emergency@aiims.edu",
                      location: "New Delhi",
                      status: "Active",
                      icon: Heart,
                      color: "bg-green-500/10 text-green-700",
                    },
                    {
                      name: "Bangalore Police",
                      type: "police",
                      phone: "+91-80-2294-2222",
                      email: "control@bangalorepolice.gov.in",
                      location: "Bangalore, Karnataka",
                      status: "Active",
                      icon: Shield,
                      color: "bg-blue-500/10 text-blue-700",
                    },
                    {
                      name: "Chennai Fire & Rescue",
                      type: "fire",
                      phone: "+91-44-2854-1999",
                      email: "fire@chennaicorp.gov.in",
                      location: "Chennai, Tamil Nadu",
                      status: "Active",
                      icon: Truck,
                      color: "bg-red-500/10 text-red-700",
                    },
                    {
                      name: "Apollo Hospital Emergency",
                      type: "medical",
                      phone: "+91-40-2360-7777",
                      email: "emergency@apollohospitals.com",
                      location: "Hyderabad, Telangana",
                      status: "Active",
                      icon: Heart,
                      color: "bg-green-500/10 text-green-700",
                    },
                  ].map((contact, index) => (
                    <Card key={index} className="dashboard-card hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${contact.color}`}>
                              <contact.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{contact.name}</CardTitle>
                              <Badge variant="outline" className="mt-1 capitalize">
                                {contact.type}
                              </Badge>
                            </div>
                          </div>
                          <Badge variant={contact.status === "Active" ? "default" : "secondary"}>
                            {contact.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.location}</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="police" className="space-y-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle>Police Contacts</CardTitle>
                    <CardDescription>Police stations and control rooms across India</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Police Emergency Contacts</h3>
                      <p className="text-muted-foreground mb-4">
                        Quick access to police stations and emergency control rooms
                      </p>
                      <Button>View All Police Contacts</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fire" className="space-y-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle>Fire Service Contacts</CardTitle>
                    <CardDescription>Fire stations and emergency services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Fire Emergency Services</h3>
                      <p className="text-muted-foreground mb-4">
                        Fire stations and rescue services across Indian cities
                      </p>
                      <Button>View All Fire Contacts</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle>Medical Emergency Contacts</CardTitle>
                    <CardDescription>Hospitals and medical emergency services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Medical Emergency Services</h3>
                      <p className="text-muted-foreground mb-4">
                        Hospitals and ambulance services for medical emergencies
                      </p>
                      <Button>View All Medical Contacts</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
