"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Truck,
  Users,
  Package,
  MapPin,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Wrench,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Equipment {
  id: string
  name: string
  type: "vehicle" | "medical" | "rescue" | "communication"
  status: "available" | "deployed" | "maintenance" | "out-of-service"
  location: string
  assignedTo?: string
  lastMaintenance: Date
  nextMaintenance: Date
  condition: "excellent" | "good" | "fair" | "poor"
}

interface Personnel {
  id: string
  name: string
  role: string
  status: "available" | "deployed" | "off-duty" | "training"
  location: string
  skills: string[]
  certifications: string[]
  currentAssignment?: string
}

interface Supply {
  id: string
  name: string
  category: "medical" | "food" | "shelter" | "safety"
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  location: string
  lastRestocked: Date
  supplier: string
}

const mockEquipment: Equipment[] = [
  {
    id: "EQ-001",
    name: "Fire Truck Alpha-1",
    type: "vehicle",
    status: "deployed",
    location: "Mumbai Central",
    assignedTo: "Team Alpha",
    lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    nextMaintenance: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    condition: "excellent",
  },
  {
    id: "EQ-002",
    name: "Ambulance Beta-2",
    type: "medical",
    status: "available",
    location: "Delhi NCR Station",
    lastMaintenance: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    nextMaintenance: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
    condition: "good",
  },
  {
    id: "EQ-003",
    name: "Rescue Boat Gamma-1",
    type: "rescue",
    status: "maintenance",
    location: "Bangalore Workshop",
    lastMaintenance: new Date(),
    nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    condition: "fair",
  },
]

const mockPersonnel: Personnel[] = [
  {
    id: "P-001",
    name: "Arjun Sharma",
    role: "Emergency Coordinator",
    status: "deployed",
    location: "Mumbai Central",
    skills: ["Leadership", "Crisis Management", "Communication"],
    certifications: ["Emergency Management", "First Aid", "Fire Safety"],
    currentAssignment: "Building Collapse Response",
  },
  {
    id: "P-002",
    name: "Priya Kapoor",
    role: "Fire Chief",
    status: "available",
    location: "Delhi NCR Station",
    skills: ["Fire Suppression", "Rescue Operations", "Team Leadership"],
    certifications: ["Fire Chief Certification", "Hazmat", "Technical Rescue"],
  },
  {
    id: "P-003",
    name: "Rajesh Nair",
    role: "Medical Team Lead",
    status: "available",
    location: "Bangalore Medical Center",
    skills: ["Emergency Medicine", "Trauma Care", "Triage"],
    certifications: ["Paramedic", "Advanced Life Support", "Disaster Medicine"],
  },
]

const mockSupplies: Supply[] = [
  {
    id: "S-001",
    name: "Medical Bandages",
    category: "medical",
    currentStock: 150,
    minStock: 100,
    maxStock: 500,
    unit: "units",
    location: "Central Medical Warehouse",
    lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    supplier: "MedSupply India",
  },
  {
    id: "S-002",
    name: "Emergency Food Rations",
    category: "food",
    currentStock: 75,
    minStock: 200,
    maxStock: 1000,
    unit: "packages",
    location: "Food Distribution Center",
    lastRestocked: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    supplier: "Emergency Foods Ltd",
  },
  {
    id: "S-003",
    name: "Emergency Blankets",
    category: "shelter",
    currentStock: 300,
    minStock: 150,
    maxStock: 800,
    unit: "units",
    location: "Shelter Supply Depot",
    lastRestocked: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    supplier: "Shelter Solutions",
  },
]

export function ResourceTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "deployed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "out-of-service":
        return "bg-red-100 text-red-800 border-red-200"
      case "off-duty":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "training":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100
    if (current <= min) return { level: "critical", color: "bg-red-500", percentage }
    if (current <= min * 1.5) return { level: "low", color: "bg-yellow-500", percentage }
    return { level: "good", color: "bg-green-500", percentage }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vehicle":
        return <Truck className="w-5 h-5" />
      case "medical":
        return <Heart className="w-5 h-5" />
      case "rescue":
        return <AlertTriangle className="w-5 h-5" />
      case "communication":
        return <RefreshCw className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resource Management</h2>
          <p className="text-muted-foreground">
            Track and manage equipment, personnel, and supplies across all emergency response operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Resource Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800">
                {mockEquipment.filter((e) => e.status === "available").length} Available
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Equipment</p>
              <p className="text-3xl font-bold">{mockEquipment.length}</p>
              <p className="text-xs text-muted-foreground">
                {mockEquipment.filter((e) => e.status === "deployed").length} deployed,{" "}
                {mockEquipment.filter((e) => e.status === "maintenance").length} in maintenance
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-600" />
              <Badge className="bg-green-100 text-green-800">
                {mockPersonnel.filter((p) => p.status === "available").length} Available
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Personnel</p>
              <p className="text-3xl font-bold">{mockPersonnel.length}</p>
              <p className="text-xs text-muted-foreground">
                {mockPersonnel.filter((p) => p.status === "deployed").length} deployed,{" "}
                {mockPersonnel.filter((p) => p.status === "off-duty").length} off-duty
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-purple-600" />
              <Badge className="bg-red-100 text-red-800">
                {mockSupplies.filter((s) => s.currentStock <= s.minStock).length} Low Stock
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Supply Items</p>
              <p className="text-3xl font-bold">{mockSupplies.length}</p>
              <p className="text-xs text-muted-foreground">
                {mockSupplies.filter((s) => s.currentStock > s.minStock).length} well-stocked items
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Wrench className="w-8 h-8 text-orange-600" />
              <Badge className="bg-yellow-100 text-yellow-800">
                {mockEquipment.filter((e) => e.status === "maintenance").length} In Maintenance
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
              <p className="text-3xl font-bold">
                {
                  mockEquipment.filter(
                    (e) => new Date(e.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  ).length
                }
              </p>
              <p className="text-xs text-muted-foreground">Due within 7 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Tabs */}
      <Tabs defaultValue="equipment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="personnel">Personnel</TabsTrigger>
          <TabsTrigger value="supplies">Supplies</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Equipment Inventory</CardTitle>
                  <CardDescription>Manage vehicles, medical equipment, and rescue tools</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="deployed">Deployed</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEquipment.map((equipment) => (
                  <div
                    key={equipment.id}
                    className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(equipment.type)}
                        <div>
                          <h4 className="font-semibold">{equipment.name}</h4>
                          <p className="text-sm text-muted-foreground">ID: {equipment.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(equipment.status)}>{equipment.status}</Badge>
                        <Badge variant="outline" className={getConditionColor(equipment.condition)}>
                          {equipment.condition}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {equipment.location}
                        </p>
                      </div>
                      {equipment.assignedTo && (
                        <div>
                          <p className="text-muted-foreground">Assigned To</p>
                          <p className="font-medium">{equipment.assignedTo}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-muted-foreground">Last Maintenance</p>
                        <p className="font-medium">{equipment.lastMaintenance.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Maintenance</p>
                        <p className="font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {equipment.nextMaintenance.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {equipment.status === "available" && (
                        <Button size="sm" variant="outline">
                          Deploy
                        </Button>
                      )}
                      {equipment.status === "deployed" && (
                        <Button size="sm" variant="outline">
                          Recall
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Wrench className="w-4 h-4 mr-1" />
                        Schedule Maintenance
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personnel Management</CardTitle>
              <CardDescription>Track team members, skills, and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPersonnel.map((person) => (
                  <div
                    key={person.id}
                    className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{person.name}</h4>
                        <p className="text-sm text-muted-foreground">{person.role}</p>
                      </div>
                      <Badge className={getStatusColor(person.status)}>{person.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {person.location}
                        </p>
                      </div>
                      {person.currentAssignment && (
                        <div>
                          <p className="text-muted-foreground">Current Assignment</p>
                          <p className="font-medium">{person.currentAssignment}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-muted-foreground">Skills</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {person.skills.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {person.skills.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{person.skills.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {person.status === "available" && (
                        <Button size="sm" variant="outline">
                          Assign
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supply Inventory</CardTitle>
              <CardDescription>Monitor stock levels and manage supply chain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSupplies.map((supply) => {
                  const stockInfo = getStockLevel(supply.currentStock, supply.minStock, supply.maxStock)
                  return (
                    <div
                      key={supply.id}
                      className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{supply.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{supply.category}</p>
                        </div>
                        <Badge
                          className={cn(
                            stockInfo.level === "critical"
                              ? "bg-red-100 text-red-800"
                              : stockInfo.level === "low"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800",
                          )}
                        >
                          {stockInfo.level}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Stock Level</span>
                          <span>
                            {supply.currentStock} / {supply.maxStock} {supply.unit}
                          </span>
                        </div>
                        <Progress value={stockInfo.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Minimum required: {supply.minStock} {supply.unit}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{supply.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Supplier</p>
                          <p className="font-medium">{supply.supplier}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Restocked</p>
                          <p className="font-medium">{supply.lastRestocked.toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {stockInfo.level === "critical" && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Emergency Reorder
                          </Button>
                        )}
                        {stockInfo.level === "low" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-yellow-500 text-yellow-600 bg-transparent"
                          >
                            Reorder
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Update Stock
                        </Button>
                        <Button size="sm" variant="outline">
                          View History
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
