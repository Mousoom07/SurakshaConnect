"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, MapPin, User, Heart, Store, AlertTriangle, CheckCircle, Navigation, Phone } from "lucide-react"

interface Resource {
  id: string
  title: string
  category: "medical" | "food" | "water" | "shelter" | "clothing" | "tools" | "other"
  description: string
  quantity: number
  unit: string
  provider: {
    name: string
    type: "individual" | "business" | "ngo" | "government"
    rating: number
    verified: boolean
    contact: string
  }
  location: {
    address: string
    coordinates: [number, number]
    distance: number
  }
  availability: "immediate" | "within_hour" | "within_day" | "scheduled"
  price: number | "free"
  timestamp: string
  urgency: "critical" | "high" | "medium" | "low"
  matchedNeeds: number
}

interface Need {
  id: string
  title: string
  category: "medical" | "food" | "water" | "shelter" | "clothing" | "tools" | "other"
  description: string
  quantity: number
  unit: string
  requester: {
    name: string
    location: string
    contact: string
    verified: boolean
  }
  urgency: "critical" | "high" | "medium" | "low"
  timestamp: string
  status: "open" | "matched" | "fulfilled"
  matches: number
}

export default function ResourceMarketplace() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState("distance")

  const [resources, setResources] = useState<Resource[]>([
    {
      id: "res-001",
      title: "Emergency Medical Supplies",
      category: "medical",
      description: "Antibiotics, bandages, pain relievers, antiseptic",
      quantity: 50,
      unit: "kits",
      provider: {
        name: "City Pharmacy",
        type: "business",
        rating: 4.8,
        verified: true,
        contact: "+1-555-0199",
      },
      location: {
        address: "123 Main St, Downtown",
        coordinates: [40.7128, -74.006],
        distance: 0.5,
      },
      availability: "immediate",
      price: "free",
      timestamp: "2024-01-15 18:30:00",
      urgency: "critical",
      matchedNeeds: 12,
    },
    {
      id: "res-002",
      title: "Hot Meals & Water",
      category: "food",
      description: "Fresh cooked meals, bottled water, snacks",
      quantity: 200,
      unit: "servings",
      provider: {
        name: "Maria's Restaurant",
        type: "business",
        rating: 4.9,
        verified: true,
        contact: "+1-555-0156",
      },
      location: {
        address: "456 Oak Ave, Midtown",
        coordinates: [40.7589, -73.9851],
        distance: 1.2,
      },
      availability: "within_hour",
      price: "free",
      timestamp: "2024-01-15 17:45:00",
      urgency: "high",
      matchedNeeds: 8,
    },
    {
      id: "res-003",
      title: "Temporary Shelter Space",
      category: "shelter",
      description: "Warm, safe indoor space with bedding",
      quantity: 25,
      unit: "beds",
      provider: {
        name: "Community Center",
        type: "ngo",
        rating: 4.7,
        verified: true,
        contact: "+1-555-0178",
      },
      location: {
        address: "789 Pine St, Northside",
        coordinates: [40.7831, -73.9712],
        distance: 2.1,
      },
      availability: "immediate",
      price: "free",
      timestamp: "2024-01-15 16:20:00",
      urgency: "high",
      matchedNeeds: 15,
    },
  ])

  const [needs, setNeeds] = useState<Need[]>([
    {
      id: "need-001",
      title: "Insulin for Diabetic Child",
      category: "medical",
      description: "Urgent need for insulin pens, child is 8 years old",
      quantity: 5,
      unit: "pens",
      requester: {
        name: "Jennifer M.",
        location: "Central Evacuation Center",
        contact: "+1-555-0134",
        verified: true,
      },
      urgency: "critical",
      timestamp: "2024-01-15 19:15:00",
      status: "open",
      matches: 2,
    },
    {
      id: "need-002",
      title: "Baby Formula and Diapers",
      category: "other",
      description: "For 6-month-old baby, size 3 diapers",
      quantity: 1,
      unit: "week supply",
      requester: {
        name: "David K.",
        location: "Red Cross Shelter #2",
        contact: "+1-555-0167",
        verified: true,
      },
      urgency: "high",
      timestamp: "2024-01-15 18:45:00",
      status: "matched",
      matches: 1,
    },
  ])

  const [newResource, setNewResource] = useState({
    title: "",
    category: "",
    description: "",
    quantity: "",
    unit: "",
    availability: "",
    price: "",
    contact: "",
  })

  const [newNeed, setNewNeed] = useState({
    title: "",
    category: "",
    description: "",
    quantity: "",
    unit: "",
    urgency: "",
    contact: "",
  })

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medical":
        return "🏥"
      case "food":
        return "🍽️"
      case "water":
        return "💧"
      case "shelter":
        return "🏠"
      case "clothing":
        return "👕"
      case "tools":
        return "🔧"
      default:
        return "📦"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProviderTypeColor = (type: string) => {
    switch (type) {
      case "business":
        return "bg-blue-100 text-blue-800"
      case "ngo":
        return "bg-green-100 text-green-800"
      case "government":
        return "bg-purple-100 text-purple-800"
      case "individual":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const addResource = () => {
    if (!newResource.title || !newResource.category) return

    const resource: Resource = {
      id: `res-${Date.now()}`,
      title: newResource.title,
      category: newResource.category as any,
      description: newResource.description,
      quantity: Number.parseInt(newResource.quantity) || 1,
      unit: newResource.unit || "items",
      provider: {
        name: "You",
        type: "individual",
        rating: 5.0,
        verified: false,
        contact: newResource.contact,
      },
      location: {
        address: "Your Location",
        coordinates: [40.75, -73.985],
        distance: 0,
      },
      availability: (newResource.availability as any) || "immediate",
      price: newResource.price === "free" ? "free" : Number.parseFloat(newResource.price) || "free",
      timestamp: new Date().toLocaleString(),
      urgency: "medium",
      matchedNeeds: 0,
    }

    setResources((prev) => [resource, ...prev])
    setNewResource({
      title: "",
      category: "",
      description: "",
      quantity: "",
      unit: "",
      availability: "",
      price: "",
      contact: "",
    })
  }

  const addNeed = () => {
    if (!newNeed.title || !newNeed.category) return

    const need: Need = {
      id: `need-${Date.now()}`,
      title: newNeed.title,
      category: newNeed.category as any,
      description: newNeed.description,
      quantity: Number.parseInt(newNeed.quantity) || 1,
      unit: newNeed.unit || "items",
      requester: {
        name: "You",
        location: "Your Location",
        contact: newNeed.contact,
        verified: false,
      },
      urgency: (newNeed.urgency as any) || "medium",
      timestamp: new Date().toLocaleString(),
      status: "open",
      matches: 0,
    }

    setNeeds((prev) => [need, ...prev])
    setNewNeed({
      title: "",
      category: "",
      description: "",
      quantity: "",
      unit: "",
      urgency: "",
      contact: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Marketplace Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Available Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
            <p className="text-xs text-muted-foreground">{resources.filter((r) => r.price === "free").length} free</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Needs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{needs.filter((n) => n.status === "open").length}</div>
            <p className="text-xs text-muted-foreground">
              {needs.filter((n) => n.urgency === "critical").length} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Successful Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {needs.filter((n) => n.status === "matched" || n.status === "fulfilled").length}
            </div>
            <p className="text-xs text-muted-foreground">AI matched</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Verified Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.filter((r) => r.provider.verified).length}</div>
            <p className="text-xs text-muted-foreground">Trusted sources</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Resources</TabsTrigger>
          <TabsTrigger value="needs">View Needs</TabsTrigger>
          <TabsTrigger value="offer">Offer Resources</TabsTrigger>
          <TabsTrigger value="request">Request Help</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Resource Marketplace
              </CardTitle>
              <CardDescription>
                Find available supplies and services from local businesses, NGOs, and volunteers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="food">Food & Water</SelectItem>
                    <SelectItem value="shelter">Shelter</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="urgency">Urgency</SelectItem>
                    <SelectItem value="availability">Availability</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resources List */}
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getCategoryIcon(resource.category)}</div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={getUrgencyColor(resource.urgency)}>{resource.urgency}</Badge>
                      <div className="text-sm text-muted-foreground">{resource.matchedNeeds} matches</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Availability
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Quantity:</strong> {resource.quantity} {resource.unit}
                        </p>
                        <p>
                          <strong>Available:</strong> {resource.availability.replace("_", " ")}
                        </p>
                        <p>
                          <strong>Price:</strong> {resource.price === "free" ? "Free" : `$${resource.price}`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Provider
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span>{resource.provider.name}</span>
                          {resource.provider.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                        </div>
                        <Badge className={getProviderTypeColor(resource.provider.type)} variant="secondary">
                          {resource.provider.type}
                        </Badge>
                        <p>Rating: {resource.provider.rating}/5.0</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>{resource.location.address}</p>
                        <p className="text-muted-foreground">{resource.location.distance} km away</p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                          <Navigation className="h-3 w-3" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="needs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Community Needs
              </CardTitle>
              <CardDescription>Help requests from disaster victims and emergency responders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {needs.map((need) => (
                  <Card key={need.id} className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getCategoryIcon(need.category)}</div>
                          <div>
                            <CardTitle className="text-lg">{need.title}</CardTitle>
                            <CardDescription>{need.description}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge className={getUrgencyColor(need.urgency)}>{need.urgency}</Badge>
                          <div className="text-sm text-muted-foreground">{need.matches} potential matches</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Request Details</h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <strong>Needed:</strong> {need.quantity} {need.unit}
                            </p>
                            <p>
                              <strong>Status:</strong> {need.status}
                            </p>
                            <p>
                              <strong>Posted:</strong> {need.timestamp}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Requester</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <span>{need.requester.name}</span>
                              {need.requester.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                            </div>
                            <p>{need.requester.location}</p>
                          </div>

                          <Button size="sm" className="mt-4 flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            Offer Help
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Offer Resources
              </CardTitle>
              <CardDescription>List supplies or services you can provide to help disaster victims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="res-title">Resource Title</Label>
                  <Input
                    id="res-title"
                    value={newResource.title}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Emergency Medical Supplies"
                  />
                </div>
                <div>
                  <Label htmlFor="res-category">Category</Label>
                  <Select
                    value={newResource.category}
                    onValueChange={(value) => setNewResource((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="food">Food & Water</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="res-quantity">Quantity</Label>
                  <Input
                    id="res-quantity"
                    type="number"
                    value={newResource.quantity}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="How many?"
                  />
                </div>
                <div>
                  <Label htmlFor="res-unit">Unit</Label>
                  <Input
                    id="res-unit"
                    value={newResource.unit}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, unit: e.target.value }))}
                    placeholder="e.g., kits, meals, beds"
                  />
                </div>
                <div>
                  <Label htmlFor="res-availability">Availability</Label>
                  <Select
                    value={newResource.availability}
                    onValueChange={(value) => setNewResource((prev) => ({ ...prev, availability: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="When available?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="within_hour">Within 1 hour</SelectItem>
                      <SelectItem value="within_day">Within 24 hours</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="res-price">Price</Label>
                  <Input
                    id="res-price"
                    value={newResource.price}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="Enter 'free' or amount"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="res-description">Description</Label>
                  <Textarea
                    id="res-description"
                    value={newResource.description}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of what you're offering..."
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="res-contact">Contact Information</Label>
                  <Input
                    id="res-contact"
                    value={newResource.contact}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, contact: e.target.value }))}
                    placeholder="Phone number or email"
                  />
                </div>
              </div>
              <Button onClick={addResource} className="mt-4">
                List Resource
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="request" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Request Help
              </CardTitle>
              <CardDescription>Post what you need and let AI match you with available resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="need-title">What do you need?</Label>
                  <Input
                    id="need-title"
                    value={newNeed.title}
                    onChange={(e) => setNewNeed((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Insulin for diabetic child"
                  />
                </div>
                <div>
                  <Label htmlFor="need-category">Category</Label>
                  <Select
                    value={newNeed.category}
                    onValueChange={(value) => setNewNeed((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="food">Food & Water</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="need-quantity">Quantity Needed</Label>
                  <Input
                    id="need-quantity"
                    type="number"
                    value={newNeed.quantity}
                    onChange={(e) => setNewNeed((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="How many?"
                  />
                </div>
                <div>
                  <Label htmlFor="need-unit">Unit</Label>
                  <Input
                    id="need-unit"
                    value={newNeed.unit}
                    onChange={(e) => setNewNeed((prev) => ({ ...prev, unit: e.target.value }))}
                    placeholder="e.g., pens, bottles, days"
                  />
                </div>
                <div>
                  <Label htmlFor="need-urgency">Urgency Level</Label>
                  <Select
                    value={newNeed.urgency}
                    onValueChange={(value) => setNewNeed((prev) => ({ ...prev, urgency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How urgent?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical - Life threatening</SelectItem>
                      <SelectItem value="high">High - Urgent need</SelectItem>
                      <SelectItem value="medium">Medium - Important</SelectItem>
                      <SelectItem value="low">Low - When available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="need-contact">Your Contact</Label>
                  <Input
                    id="need-contact"
                    value={newNeed.contact}
                    onChange={(e) => setNewNeed((prev) => ({ ...prev, contact: e.target.value }))}
                    placeholder="Phone number or email"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="need-description">Detailed Description</Label>
                  <Textarea
                    id="need-description"
                    value={newNeed.description}
                    onChange={(e) => setNewNeed((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide specific details about what you need and why..."
                    rows={3}
                  />
                </div>
              </div>
              <Button onClick={addNeed} className="mt-4">
                Post Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
