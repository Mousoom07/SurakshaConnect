"use client"

import Link from "next/link"

export default function GlobalFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>📞 Helpline: 1800-XXXX-XXX</li>
            <li>🕒 24/7 Emergency Desk</li>
            <li><Link href="/voice" className="underline">Voice Support</Link></li>
            <li><button onClick={() => alert('Connecting to live support...')} className="underline">💬 Live Support Chat</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><Link href="/dashboard" className="underline">Dashboard</Link></li>
            <li><Link href="/map" className="underline">Coverage Map</Link></li>
            <li><Link href="/triage" className="underline">AI Triage</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Disclaimer</h4>
          <p className="text-xs text-muted-foreground">This platform assists in emergency coordination. In life-threatening situations, contact local authorities immediately.</p>
        </div>
      </div>
    </footer>
  )
}