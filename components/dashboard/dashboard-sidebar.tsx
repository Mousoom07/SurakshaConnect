"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Map, AlertTriangle, Users, Settings, Phone, MapPin, Activity, FileText, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Emergency Map",
    href: "/dashboard/map",
    icon: Map,
    badge: "Live",
  },
  {
    title: "Active Alerts",
    href: "/dashboard/alerts",
    icon: AlertTriangle,
    badge: "5",
  },
  {
    title: "Emergency Contacts",
    href: "/dashboard/contacts",
    icon: Phone,
  },
  {
    title: "Location Services",
    href: "/dashboard/location",
    icon: MapPin,
  },
  {
    title: "Response Teams",
    href: "/dashboard/teams",
    icon: Users,
  },
  {
    title: "Activity Log",
    href: "/dashboard/activity",
    icon: Activity,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Safety Resources",
    href: "/dashboard/resources",
    icon: Shield,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === item.href && "bg-secondary text-secondary-foreground",
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                  {item.badge && (
                    <Badge variant={item.badge === "Live" ? "destructive" : "secondary"} className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
