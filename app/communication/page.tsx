import { TeamChat } from "@/components/communication/team-chat"

export default function CommunicationPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Communication</h1>
          <p className="text-muted-foreground">Real-time coordination and communication for emergency response teams</p>
        </div>

        <TeamChat />
      </div>
    </div>
  )
}
