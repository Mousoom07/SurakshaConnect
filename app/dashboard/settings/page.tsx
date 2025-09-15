import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Bell, Shield, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/50">
          <DashboardSidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">सेटिंग्स - Configure your SurakshaConnect preferences</p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList>
                <TabsTrigger value="general">General / सामान्य</TabsTrigger>
                <TabsTrigger value="notifications">Notifications / सूचनाएं</TabsTrigger>
                <TabsTrigger value="security">Security / सुरक्षा</TabsTrigger>
                <TabsTrigger value="language">Language / भाषा</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      General Settings
                    </CardTitle>
                    <CardDescription>Manage your account and system preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name</Label>
                        <Input
                          id="organization"
                          placeholder="Enter organization name"
                          defaultValue="Mumbai Emergency Services"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Primary Location</Label>
                        <Select defaultValue="mumbai">
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mumbai">Mumbai, Maharashtra</SelectItem>
                            <SelectItem value="delhi">Delhi NCR</SelectItem>
                            <SelectItem value="bangalore">Bangalore, Karnataka</SelectItem>
                            <SelectItem value="chennai">Chennai, Tamil Nadu</SelectItem>
                            <SelectItem value="hyderabad">Hyderabad, Telangana</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="ist">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-save Settings</Label>
                        <p className="text-sm text-muted-foreground">Automatically save changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>Configure how you receive emergency alerts and notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Emergency Alerts</Label>
                          <p className="text-sm text-muted-foreground">Receive critical emergency notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Browser push notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Sound Alerts</Label>
                          <p className="text-sm text-muted-foreground">Play sound for emergency alerts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <Button>Save Notification Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>Manage your account security and access controls</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" placeholder="Enter current password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" placeholder="Enter new password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Session Timeout</Label>
                          <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                        </div>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button>Update Security Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="language" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Language & Regional Settings
                    </CardTitle>
                    <CardDescription>Configure language preferences and regional settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Primary Language</Label>
                        <Select defaultValue="en-hi">
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en-hi">English with Hindi (अंग्रेजी हिंदी के साथ)</SelectItem>
                            <SelectItem value="hi">Hindi (हिंदी)</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="bn">Bengali (বাংলা)</SelectItem>
                            <SelectItem value="te">Telugu (తెలుగు)</SelectItem>
                            <SelectItem value="mr">Marathi (मराठी)</SelectItem>
                            <SelectItem value="ta">Tamil (தமிழ்)</SelectItem>
                            <SelectItem value="gu">Gujarati (ગુજરાતી)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Voice Recognition Language</Label>
                        <Select defaultValue="multi">
                          <SelectTrigger>
                            <SelectValue placeholder="Select voice language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multi">Multi-language Detection</SelectItem>
                            <SelectItem value="hi">Hindi (हिंदी)</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="bn">Bengali (বাংলা)</SelectItem>
                            <SelectItem value="te">Telugu (తెలుగు)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date Format</Label>
                        <Select defaultValue="dd-mm-yyyy">
                          <SelectTrigger>
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dd-mm-yyyy">DD/MM/YYYY (Indian)</SelectItem>
                            <SelectItem value="mm-dd-yyyy">MM/DD/YYYY (US)</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (ISO)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Right-to-Left Text Support</Label>
                        <p className="text-sm text-muted-foreground">Enable RTL support for Arabic/Urdu</p>
                      </div>
                      <Switch />
                    </div>
                    <Button>Save Language Settings</Button>
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
