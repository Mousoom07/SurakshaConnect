import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import DarkModeToggle from "@/components/dark-mode-toggle"
import GlobalFooter from "@/components/global-footer"
import ScrollProgress from "@/components/scroll-progress"

// Client-only floating voice assistant
const VoiceAssistant = dynamic(() => import("@/components/voice-assistant-widget"), { ssr: false })

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "SurakshaConnect - India's Emergency Management Platform",
  description:
    "सुरक्षा कनेक्ट - India's professional crisis management platform with multilingual support, AI-powered emergency response, and comprehensive emergency services integration.",
  generator: "v0.app",
  icons: {
    icon: "/placeholder-logo.png",
    shortcut: "/placeholder-logo.png",
    apple: "/placeholder-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="min-h-full">
      <body className={`gradient-bg perf-mode text-foreground font-sans ${dmSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Scroll progress indicator */}
          <ScrollProgress />

          {/* Top utilities bar */}
          <div className="sticky top-0 z-[99] bg-black/40 backdrop-blur border-b border-border">
            <div className="container mx-auto px-4 py-2 flex items-center justify-end gap-3">
            <div className="hidden md:block text-xs text-muted-foreground">🌐 EN | हिंदी</div>
              <DarkModeToggle />
            </div>
          </div>

          {/* App content */}
          <Suspense fallback={null}>{children}</Suspense>

          {/* Global footer */}
          <GlobalFooter />

          {/* Floating voice assistant (client-only) */}
          <VoiceAssistant />
        </ThemeProvider>
      </body>
    </html>
  )
}
