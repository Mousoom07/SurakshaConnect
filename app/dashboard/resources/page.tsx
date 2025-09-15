import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, Video, BookOpen, Download, ExternalLink, Search, Filter } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/50">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Safety Resources</h2>
                <p className="text-muted-foreground">सुरक्षा संसाधन - Emergency preparedness and safety resources</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <Tabs defaultValue="guides" className="space-y-6">
              <TabsList>
                <TabsTrigger value="guides">Safety Guides / सुरक्षा गाइड</TabsTrigger>
                <TabsTrigger value="videos">Training Videos / प्रशिक्षण वीडियो</TabsTrigger>
                <TabsTrigger value="documents">Documents / दस्तावेज़</TabsTrigger>
                <TabsTrigger value="protocols">Protocols / प्रोटोकॉल</TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Earthquake Safety Guide",
                      titleHindi: "भूकंप सुरक्षा गाइड",
                      description: "Complete guide for earthquake preparedness and response",
                      category: "Natural Disaster",
                      downloads: "2.3k",
                      rating: 4.8,
                      icon: Shield,
                      color: "bg-red-500/10 text-red-700",
                    },
                    {
                      title: "Fire Safety Protocols",
                      titleHindi: "अग्नि सुरक्षा प्रोटोकॉल",
                      description: "Fire prevention and emergency evacuation procedures",
                      category: "Fire Safety",
                      downloads: "1.8k",
                      rating: 4.9,
                      icon: Shield,
                      color: "bg-orange-500/10 text-orange-700",
                    },
                    {
                      title: "Flood Emergency Response",
                      titleHindi: "बाढ़ आपातकालीन प्रतिक्रिया",
                      description: "Flood preparedness and rescue procedures",
                      category: "Natural Disaster",
                      downloads: "1.5k",
                      rating: 4.7,
                      icon: Shield,
                      color: "bg-blue-500/10 text-blue-700",
                    },
                    {
                      title: "Medical Emergency First Aid",
                      titleHindi: "चिकित्सा आपातकाल प्राथमिक चिकित्सा",
                      description: "Basic first aid and medical emergency procedures",
                      category: "Medical",
                      downloads: "3.1k",
                      rating: 4.9,
                      icon: Shield,
                      color: "bg-green-500/10 text-green-700",
                    },
                    {
                      title: "Cyclone Preparedness",
                      titleHindi: "चक्रवात तैयारी",
                      description: "Cyclone warning systems and safety measures",
                      category: "Natural Disaster",
                      downloads: "987",
                      rating: 4.6,
                      icon: Shield,
                      color: "bg-purple-500/10 text-purple-700",
                    },
                    {
                      title: "Chemical Spill Response",
                      titleHindi: "रासायनिक रिसाव प्रतिक्रिया",
                      description: "Hazardous material handling and containment",
                      category: "Industrial",
                      downloads: "654",
                      rating: 4.5,
                      icon: Shield,
                      color: "bg-yellow-500/10 text-yellow-700",
                    },
                  ].map((guide, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${guide.color}`}>
                              <guide.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{guide.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">{guide.titleHindi}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{guide.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{guide.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{guide.downloads} downloads</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{guide.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Videos</CardTitle>
                    <CardDescription>Emergency response training and educational videos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Emergency Training Videos</h3>
                      <p className="text-muted-foreground mb-4">
                        Comprehensive video library for emergency response training
                      </p>
                      <Button>Browse Video Library</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Documents</CardTitle>
                    <CardDescription>Official documents, forms, and reference materials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Document Library</h3>
                      <p className="text-muted-foreground mb-4">
                        Access official forms, procedures, and reference documents
                      </p>
                      <Button>View Documents</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="protocols" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Protocols</CardTitle>
                    <CardDescription>Standard operating procedures and emergency protocols</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Protocol Library</h3>
                      <p className="text-muted-foreground mb-4">
                        Standard operating procedures for various emergency scenarios
                      </p>
                      <Button>View Protocols</Button>
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
