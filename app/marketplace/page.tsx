import ResourceMarketplace from "@/components/resource-marketplace"

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Resource Marketplace</h1>
          <p className="text-muted-foreground">
            AI-powered matching of disaster victims' needs with available resources from local businesses, NGOs, and
            volunteers
          </p>
        </div>

        <ResourceMarketplace />
      </div>
    </div>
  )
}
