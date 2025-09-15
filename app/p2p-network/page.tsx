import P2PSOSNetwork from "@/components/p2p-sos-network"

export default function P2PNetworkPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">P2P SOS Network</h1>
          <p className="text-gray-600">Create mesh networks with nearby devices when cell towers are down.</p>
        </div>
        <P2PSOSNetwork />
      </div>
    </div>
  )
}
