import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Home,
  Building,
  Users,
  Bed,
  MapPin,
  Phone,
  Clock,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Plus,
} from "lucide-react"

export default function SheltersPage() {
  return (
    <div className="gradient-bg min-h-screen">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 brand-tile rounded-2xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Shelter Management</h1>
                <p className="text-sm text-muted-foreground">Emergency Housing Coordination</p>
              </div>
            </div>
            <Button className="shelter-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Shelter
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search shelters by name, location, or capacity..." className="pl-10 glass-card" />
          </div>
          <Button variant="outline" className="glass-card bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Shelters</p>
                  <p className="text-2xl font-bold text-primary">89</p>
                </div>
                <Building className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Beds</p>
                  <p className="text-2xl font-bold text-secondary">1,247</p>
                </div>
                <Bed className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Occupancy</p>
                  <p className="text-2xl font-bold text-accent">892</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Utilization Rate</p>
                  <p className="text-2xl font-bold text-primary">72%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shelter List */}
        <div className="grid gap-6">
          <Card className="glass-card hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 brand-tile rounded-2xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Downtown Emergency Shelter</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      123 Main Street, Downtown District
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">150</div>
                  <div className="text-xs text-muted-foreground">Total Capacity</div>
                </div>
                <div className="text-center p-3 bg-secondary/10 rounded-lg">
                  <div className="text-lg font-bold text-secondary">42</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-lg font-bold text-accent">108</div>
                  <div className="text-xs text-muted-foreground">Occupied</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">72%</div>
                  <div className="text-xs text-muted-foreground">Utilization</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    (555) 123-4567
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    24/7 Operations
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 brand-tile rounded-2xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Riverside Family Center</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      456 River Road, Riverside Area
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Near Capacity</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">200</div>
                  <div className="text-xs text-muted-foreground">Total Capacity</div>
                </div>
                <div className="text-center p-3 bg-secondary/10 rounded-lg">
                  <div className="text-lg font-bold text-secondary">15</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-lg font-bold text-accent">185</div>
                  <div className="text-xs text-muted-foreground">Occupied</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">93%</div>
                  <div className="text-xs text-muted-foreground">Utilization</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    (555) 987-6543
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    24/7 Operations
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 brand-tile rounded-2xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Westside Community Hub</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      789 West Avenue, Westside District
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800">Maintenance</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">120</div>
                  <div className="text-xs text-muted-foreground">Total Capacity</div>
                </div>
                <div className="text-center p-3 bg-secondary/10 rounded-lg">
                  <div className="text-lg font-bold text-secondary">0</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-lg font-bold text-accent">0</div>
                  <div className="text-xs text-muted-foreground">Occupied</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">0%</div>
                  <div className="text-xs text-muted-foreground">Utilization</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    (555) 456-7890
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Scheduled Maintenance
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
