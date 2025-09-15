import { CommunityMatchmaking } from "@/components/community-matchmaking"

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Community Matchmaking</h1>
          <p className="text-muted-foreground text-lg">
            AI-powered matching of local volunteers with emergency requests based on skills, proximity, and
            availability.
          </p>
        </div>

        <CommunityMatchmaking />
      </div>
    </div>
  )
}
