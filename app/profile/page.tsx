import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ProfileOverview } from "@/components/profile/profile-overview"
import { ProfileForm } from "@/components/profile/profile-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
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
              <h2 className="text-3xl font-bold tracking-tight">Profile Management</h2>
              <p className="text-muted-foreground">
                प्रोफ़ाइल प्रबंधन - Manage your personal information, emergency contacts, and account settings
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview / अवलोकन</TabsTrigger>
                <TabsTrigger value="edit">Edit Profile / प्रोफ़ाइल संपादित करें</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <ProfileOverview />
              </TabsContent>

              <TabsContent value="edit">
                <ProfileForm />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
