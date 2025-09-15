import RealTimeTeamChat from "@/components/real-time-team-chat"

export default function TeamChatPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Team Communication Center</h1>
        <p className="text-gray-600 mt-2">Real-time coordination and communication for emergency response teams</p>
      </div>
      <RealTimeTeamChat />
    </div>
  )
}
