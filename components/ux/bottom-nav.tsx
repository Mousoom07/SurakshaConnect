"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertTriangle, LayoutDashboard, Mic, User } from "lucide-react"

// Mobile-first sticky bottom navigation bar
export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  const itemClass = (active: boolean) =>
    `flex flex-col items-center justify-center gap-1 flex-1 py-2 ${
      active ? "text-primary" : "text-muted-foreground"
    }`

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[99] bg-background/80 backdrop-blur border-t">
      <div className="max-w-3xl mx-auto grid grid-cols-4">
        <Link href="/triage" className={itemClass(isActive("/triage"))} aria-label="SOS">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-[11px]">SOS</span>
        </Link>
        <Link href="/dashboard" className={itemClass(isActive("/dashboard"))} aria-label="Dashboard">
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[11px]">Dashboard</span>
        </Link>
        <Link href="/voice" className={itemClass(isActive("/voice"))} aria-label="Voice">
          <Mic className="h-5 w-5" />
          <span className="text-[11px]">Voice</span>
        </Link>
        <Link href="/profile" className={itemClass(isActive("/profile"))} aria-label="Profile">
          <User className="h-5 w-5" />
          <span className="text-[11px]">Profile</span>
        </Link>
      </div>
    </nav>
  )
}