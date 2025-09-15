"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Shield,
  MapPin,
  Users,
  Zap,
  Mic,
  FileText,
  Globe,
  Award,
  HeartHandshake,
  Home,
  Bed,
  Building,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  Lock,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

import TrustedBadges from "@/components/trusted-badges"
import VoiceAssistantWidget from "@/components/voice-assistant-widget"
import VoiceAssistantButton from "@/components/voice-assistant-button"
import ImpactCounter from "@/components/impact-counter"

import { Skeleton } from "@/components/ui/skeleton"
import ExitIntent from "@/components/exit-intent"
import { useEffect, useState } from "react"

const CounterInit = dynamic(() => import("@/components/counter-init"), { ssr: false })
const IndiaCoverageMap = dynamic(() => import("@/components/india-coverage-map"), { ssr: false, loading: () => <Skeleton className="h-64 w-full rounded-xl" /> })
const OnboardingModal = dynamic(() => import("@/components/onboarding-modal"), { ssr: false })
const QuickSearch = dynamic(() => import("@/components/quick-search"), { ssr: false })
const OneTapLocation = dynamic(() => import("@/components/one-tap-location"), { ssr: false })
const EffectsLayer = dynamic(() => import("@/components/ux/effects-layer"), { ssr: false })
const BottomNav = dynamic(() => import("@/components/ux/bottom-nav"), { ssr: false })
const LiveOperatorButton = dynamic(() => import("@/components/support/live-operator-button"), { ssr: false })
const PartnersCarousel = dynamic(() => import("@/components/trust/partners-carousel"), { ssr: false, loading: () => <Skeleton className="h-16 w-full rounded-md" /> })
const CommunityStories = dynamic(() => import("@/components/community/stories"), { ssr: false, loading: () => <Skeleton className="h-40 w-full rounded-md" /> })
const InstallPrompt = dynamic(() => import("@/components/pwa/install-prompt"), { ssr: false })
const Testimonials = dynamic(() => import("@/components/testimonials"), { ssr: false })

export default function HomePage() {
  const [isDay, setIsDay] = useState(true)
  const [city, setCity] = useState<string | null>(null)
  useEffect(() => {
    const h = new Date().getHours()
    setIsDay(h >= 6 && h < 18)
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setCity("your area"),
        () => undefined,
        { maximumAge: 60_000 }
      )
    }
  }, [])
  return (
    <div className="gradient-bg">
      {/* Applied gradient background */}
      <CounterInit />
      {/* UX Effects: cursor glow/ripple + parallax (medium intensity) */}

      <EffectsLayer intensity={1} />
      {/* Navigation Header */}
      <header className="glass-card sticky top-0 z-50">
        {" "}
        {/* Applied glass morphism effect */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center pulse-glow emergency-aura">
                <Shield className="w-7 h-7 text-primary-foreground icon-hover-glow" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SurakshaConnect</h1>
                <p className="text-sm text-muted-foreground">सुरक्षा कनेक्ट - भारत की आपातकालीन प्रबंधन प्रणाली</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-sm">
                  Dashboard
                  <span className="text-xs text-muted-foreground ml-1">डैशबोर्ड</span>
                </Button>
              </Link>
              <Link href="/voice">
                <Button variant="ghost" className="text-sm">
                  Voice Emergency
                  <span className="text-xs text-muted-foreground ml-1">आवाज़ आपातकाल</span>
                </Button>
              </Link>
              <Link href="/communication">
                <Button variant="ghost" className="text-sm">
                  Team Chat
                  <span className="text-xs text-muted-foreground ml-1">टीम चैट</span>
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="ghost" className="text-sm">
                  Analytics
                  <span className="text-xs text-muted-foreground ml-1">एनालिटिक्स</span>
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="ghost" className="text-sm">
                  Resources
                  <span className="text-xs text-muted-foreground ml-1">संसाधन</span>
                </Button>
              </Link>
              <Link href="/triage">
                <Button className="text-sm">
                  AI Triage
                  <span className="text-xs ml-1">एआई ट्राइएज</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className={`px-4 hero-radial ${isDay ? "day-hero" : ""}`}>
        <div className="container mx-auto min-h-[85vh] flex items-center justify-center progressive-focus">
          <div className="w-full max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 shelter-gradient hover-lift px-6 py-2">
              <Award className="w-4 h-4 mr-2" />
              Quickly connect with 500+ emergency teams in India 🚨
            </Badge>

            <h2 className="text-6xl font-bold mb-4 text-balance bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 drop-shadow-md">
              SurakshaConnect
            </h2>

            <p className="text-2xl text-muted-foreground/80 mb-1 font-semibold">
              सुरक्षा कनेक्ट - भारत के लिए
            </p>
            <p className="text-lg text-muted-foreground/70 mb-8 leading-relaxed">
              India's Advanced Emergency Response & Crisis Management Platform
              <br />
              <span className="text-base text-muted-foreground/60">
                भारत की उन्नत आपातकालीन प्रतिक्रिया और संकट प्रबंधन प्लेटफॉर्म
              </span>
            </p>

            {/* Illustration: icon set representing features + emergency aura */}
            <div className="flex items-center justify-center gap-6 mb-8 text-white/90">
              <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-2 will-change-transform emergency-aura">
                <Shield className="w-5 h-5 animate-pulse-soft" />
                <Zap className="w-5 h-5" />
                <span className="text-sm">Safety • Emergency</span>
              </div>
              <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-2 emergency-aura">
                <Mic className="w-5 h-5 animate-pulse-soft" />
                <span className="text-sm">AI Voice Assistant</span>
              </div>
              <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <Users className="w-5 h-5" />
                <span className="text-sm">500+ cities connected</span>
              </div>
            </div>

            {/* CTAs in one centered row */}
            <div className="flex flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-10 py-6 hover-lift hover-glow brand-gradient transition-transform hover:scale-[1.02]">
                  <Shield className="w-6 h-6 mr-2" />
                  Access Dashboard
                  <span className="text-sm ml-2">डैशबोर्ड एक्सेस करें</span>
                </Button>
              </Link>
              <Link href="/voice">
                <Button size="lg" className="text-lg px-10 py-6 hover-lift hover-glow brand-gradient transition-transform hover:scale-[1.02]">
                  <Mic className="w-6 h-6 mr-2 animate-pulse-soft" />
                  Voice Emergency
                  <span className="text-sm ml-2">आवाज़ आपातकाल</span>
                </Button>
              </Link>
            </div>

            {/* Live Operator CTA */}
            <div className="mt-6 flex justify-center">
              <LiveOperatorButton />
            </div>

            {/* Hotline */}
            <div className="mt-4 text-center text-sm text-muted-foreground/80">
              <span role="img" aria-label="phone">📞</span> 24x7 Helpline: <strong>1800-XXXX-XXX</strong>
            </div>

            {/* Trusted by strip */}
            <div className="mt-10 mb-2">
              <div className="glass-card rounded-xl py-3 px-4 max-w-3xl mx-auto text-sm text-muted-foreground/90">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="font-medium text-foreground">Trusted by 500+ Indian Emergency Teams</span>
                  <span className="opacity-60">•</span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Mumbai
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Delhi
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Bengaluru
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Chennai
                  </span>
                </div>
              </div>
            </div>

            {/* Impact Counter (real-time) */}
            <div className="mt-6">
              <div className="glass-card rounded-xl py-4 px-5 mx-auto text-center max-w-md">
                {/* Live value with graceful fallback animation */}
                {/* @ts-expect-error: component used without explicit import in this snippet; imported above */}
                <ImpactCounter initial={12543} />
                <div className="text-sm text-muted-foreground">Lives saved</div>
                <div className="text-xs text-muted-foreground/70">अब तक बचाई गई ज़िंदगियाँ</div>
              </div>
            </div>

            {/* Enhanced Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto my-10">
              <div className="text-center glass-card p-5 md:p-6 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path></svg>
                  <div className="text-4xl font-bold text-primary" data-animate-counter data-target="99.8%">0%</div>
                </div>
                <div className="text-sm text-muted-foreground">Uptime</div>
                <div className="text-xs text-muted-foreground/70">अपटाइम</div>
              </div>
              <div className="text-center glass-card p-5 md:p-6 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3"></path><circle cx="12" cy="12" r="9"></circle></svg>
                  <div className="text-4xl font-bold text-secondary" data-animate-counter data-target="2.1min">0.0min</div>
                </div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
                <div className="text-xs text-muted-foreground/70">औसत प्रतिक्रिया</div>
              </div>
              <div className="text-center glass-card p-5 md:p-6 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21v-4a4 4 0 014-4h10a4 4 0 014 4v4"></path><circle cx="8.5" cy="7" r="3.5"></circle><circle cx="17.5" cy="7" r="3.5"></circle></svg>
                  <div className="text-4xl font-bold text-accent" data-animate-counter data-target="500+">0+</div>
                </div>
                <div className="text-sm text-muted-foreground">Indian Cities</div>
                <div className="text-xs text-muted-foreground/70">भारतीय शहर</div>
              </div>
              <div className="text-center glass-card p-5 md:p-6 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20M12 2v20"></path></svg>
                  <div className="text-4xl font-bold text-primary" data-animate-counter data-target="24/7">0/7</div>
                </div>
                <div className="text-sm text-muted-foreground">Support</div>
                <div className="text-xs text-muted-foreground/70">सहायता</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating quick actions */}
      <div className="fixed bottom-6 right-4 z-[95] flex flex-col gap-3">
        {/* SOS = urgency (Red), bigger target, high contrast */}
        <Link href="/triage" aria-label="SOS">
          <Button
            className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700 text-white hover-lift shadow-lg focus-visible:ring-2 focus-visible:ring-red-400"
            size="icon"
          >
            <AlertTriangle className="w-6 h-6" />
          </Button>
        </Link>

        {/* Voice = trust (Blue), equally large target */}
        <Link href="/voice" aria-label="Voice Alert">
          <Button
            className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white hover-lift shadow-lg focus-visible:ring-2 focus-visible:ring-blue-400"
            size="icon"
          >
            <Mic className="w-6 h-6" />
          </Button>
        </Link>

        {/* Keep Map, but remove from mobile to reduce cognitive load */}
        <div className="hidden md:block">
          <Link href="/map" aria-label="Share Location">
            <Button
              className="rounded-full w-12 h-12 bg-blue-600/80 hover:bg-blue-700 text-white hover-lift shadow-lg"
              size="icon"
            >
              <MapPin className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Floating Emergency Assistant Widget */}
      <VoiceAssistantWidget />

      {/* Exit Intent Modal */}
      <ExitIntent />

      {/* Live stats ticker */}

      {/* Mid-page CTA repeat with trust seals */}
      <section className="py-10 px-4 section-darker">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>🛡️ Secure</span><span>•</span><span>✅ Verified</span><span>•</span><span>📞 24x7 Support</span>
          </div>
          <Link href="/dashboard">
            <Button size="lg" className="brand-gradient hover-lift button-press">Access Dashboard</Button>
          </Link>
        </div>
      </section>

      <div className="w-full overflow-hidden">
        <div className="whitespace-nowrap animate-[scroll_15s_linear_infinite] py-3 text-center text-sm text-muted-foreground border-y border-border bg-white/10 dark:bg-black/30 backdrop-blur">
          <span className="mx-6">👉 2,134 active responses handled today</span>
          <span className="mx-6">👉 Avg response time 2.1 mins</span>
          <span className="mx-6">👉 500+ cities covered</span>
        </div>
      </div>

      {/* Trusted badges + India coverage map */}
      <section className="py-12 px-4 section-dark">
        <div className="container mx-auto space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">Trusted Partners & Certifications</h3>
            <p className="text-sm text-muted-foreground">Building trust with citizens and responders</p>
          </div>
          <div className="space-y-8">
            <div className="mb-2"><TrustedBadges /></div>
            <PartnersCarousel
              logos={[
                { src: "/placeholder-logo.png", alt: "Police" },
                { src: "/placeholder-logo.png", alt: "Hospitals" },
                { src: "/placeholder-logo.png", alt: "NGO" },
                { src: "/placeholder-logo.png", alt: "Fire Dept" },
              ]}
            />
            <IndiaCoverageMap />
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4 section-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Quick Access Portal</h3>
            <p className="text-lg text-muted-foreground mb-2">त्वरित पहुंच पोर्टल</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access all emergency management tools instantly with multilingual support
              <br />
              <span className="text-lg text-muted-foreground/80">
                बहुभाषी सहायता के साथ सभी आपातकालीन प्रबंधन उपकरणों तक तुरंत पहुंच
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/voice">
              <Card className="glass-card hover-lift cursor-pointer group h-full">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Mic className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">Voice Emergency</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">आवाज़ आपातकाल</p>
                  <CardDescription className="text-sm leading-relaxed">
                    Speak in any language for instant AI-powered emergency processing with real-time translation
                    <br />
                    <span className="text-xs text-muted-foreground/70 mt-2 block">
                      तत्काल एआई-संचालित आपातकालीन प्रसंस्करण के लिए किसी भी भाषा में बोलें
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/triage">
              <Card className="glass-card hover-lift cursor-pointer group h-full">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">AI Triage System</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">एआई ट्राइएज सिस्टम</p>
                  <CardDescription className="text-sm leading-relaxed">
                    Intelligent emergency classification and response coordination with priority management
                    <br />
                    <span className="text-xs text-muted-foreground/70 mt-2 block">
                      प्राथमिकता प्रबंधन के साथ बुद्धिमान आपातकालीन वर्गीकरण
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard">
              <Card className="glass-card hover-lift cursor-pointer group h-full">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">Control Dashboard</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">नियंत्रण डैशबोर्ड</p>
                  <CardDescription className="text-sm leading-relaxed">
                    Comprehensive emergency management and team coordination with real-time analytics
                    <br />
                    <span className="text-xs text-muted-foreground/70 mt-2 block">
                      रीयल-टाइम एनालिटिक्स के साथ व्यापक आपातकालीन प्रबंधन
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/guides">
              <Card className="glass-card hover-lift cursor-pointer group h-full">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">Visual Guides</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">दृश्य गाइड</p>
                  <CardDescription className="text-sm leading-relaxed">
                    AI-generated survival instructions and emergency protocols with step-by-step guidance
                    <br />
                    <span className="text-xs text-muted-foreground/70 mt-2 block">
                      चरणबद्ध मार्गदर्शन के साथ एआई-जनरेटेड सर्वाइवल निर्देश
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Emergency Mic Button */}
      <Link href="/voice" className="fixed right-4 bottom-20 z-[95] md:bottom-4">
        <button className="rounded-full size-14 flex items-center justify-center bg-red-600 text-white shadow-lg hover:bg-red-500 focus:outline-none border-2 border-white/70">
          <Mic className="w-6 h-6" />
        </button>
      </Link>

      {/* PWA Install Prompt */}
      <InstallPrompt />

      {/* Bottom Navigation (mobile) */}
      <BottomNav />

      {/* Features Section */}
      <section className="py-24 px-4 section-darker">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-bold text-foreground mb-4">Complete Crisis Management Solution</h3>
            <p className="text-lg text-muted-foreground mb-2">संपूर्ण संकट प्रबंधन समाधान</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage emergencies effectively, from initial alert to resolution
              <br />
              <span className="text-lg text-muted-foreground/80">
                प्रारंभिक अलर्ट से समाधान तक आपातकाल को प्रभावी रूप से प्रबंधित करने के लिए आवश्यक सब कुछ
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="glass-card hover-lift h-full">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Multi-Language Voice Processing</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">बहुभाषी आवाज़ प्रसंस्करण</p>
                <CardDescription className="leading-relaxed">
                  Advanced AI voice recognition supporting 15+ languages including Hindi, English, and regional dialects
                  with real-time transcription and emergency classification for global accessibility.
                  <br />
                  <span className="text-sm text-muted-foreground/70 mt-3 block">
                    हिंदी, अंग्रेजी और क्षेत्रीय बोलियों सहित 15+ भाषाओं का समर्थन करने वाली उन्नत एआई आवाज़ पहचान।
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift h-full">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mb-6">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">AI-Powered Triage System</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">एआई-संचालित ट्राइएज सिस्टम</p>
                <CardDescription className="leading-relaxed">
                  Intelligent emergency classification with automated priority assignment, duplicate detection, and spam
                  filtering for efficient response coordination across multiple agencies.
                  <br />
                  <span className="text-sm text-muted-foreground/70 mt-3 block">
                    स्वचालित प्राथमिकता असाइनमेंट और कुशल प्रतिक्रिया समन्वय के साथ बुद्धिमान आपातकालीन वर्गीकरण।
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift h-full">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Professional Dashboard</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">पेशेवर डैशबोर्ड</p>
                <CardDescription className="leading-relaxed">
                  Comprehensive control center with real-time statistics, team management, alert monitoring, and
                  response coordination tools with multilingual interface support.
                  <br />
                  <span className="text-sm text-muted-foreground/70 mt-3 block">
                    बहुभाषी इंटरफ़ेस सहायता के साथ रीयल-टाइम आंकड़े और टीम प्रबंधन के साथ व्यापक नियंत्रण केंद्र।
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift h-full">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Real-Time Location Services</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">रीयल-टाइम स्थान सेवाएं</p>
                <CardDescription className="leading-relaxed">
                  GPS-powered location tracking with automatic emergency service routing and geographic incident mapping
                  for precise response deployment across India.
                  <br />
                  <span className="text-sm text-muted-foreground/70 mt-3 block">
                    भारत भर में सटीक प्रतिक्रिया तैनाती के लिए जीपीएस-संचालित स्थान ट्रैकिंग और भौगोलिक घटना मैपिंग।
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift h-full">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Visual Survival Guides</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">दृश्य सर्वाइवल गाइड</p>
                <CardDescription className="leading-relaxed">
                  AI-generated emergency instructions with step-by-step visual guides, safety protocols, and
                  situation-specific survival information in multiple Indian languages.
                  <br />
                  <span className="text-sm text-muted-foreground/70 mt-3 block">
                    कई भारतीय भाषाओं में चरणबद्ध दृश्य गाइड और सुरक्षा प्रोटोकॉल के साथ एआई-जनरेटेड आपातकालीन निर्देश।
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift h-full">
              <CardHeader className="pb-6">
                <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mb-6">
                  <HeartHandshake className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">24/7 Monitoring & Support</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">24/7 निगरानी और सहायता</p>
                <CardDescription className="leading-relaxed">
                  Round-the-clock emergency monitoring with instant alerts, automated escalation procedures, and
                  comprehensive incident tracking with dedicated Indian support team.
                  <br />
                  <span className="text-sm text-muted-foreground/70 mt-3 block">
                    समर्पित भारतीय सहायता टीम के साथ चौबीसों घंटे आपातकालीन निगरानी और व्यापक घटना ट्रैकिंग।
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      {/* Emergency Shelter Network */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 shelter-gradient opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Emergency Shelter Network</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive shelter management system providing real-time capacity tracking, resource coordination, and
              seamless placement services for emergency situations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 brand-tile rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">Real-Time Capacity Tracking</h4>
                  <p className="text-muted-foreground">
                    Monitor shelter availability across your network with live updates on occupancy, available beds, and
                    resource levels. Automated alerts when capacity thresholds are reached.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 brand-tile rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">Automated Placement System</h4>
                  <p className="text-muted-foreground">
                    AI-powered placement algorithm that matches individuals and families with appropriate shelter
                    facilities based on needs, location, and availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 brand-tile rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bed className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">Resource Management</h4>
                  <p className="text-muted-foreground">
                    Complete inventory tracking for food, medical supplies, bedding, and other essential resources with
                    automated reorder alerts and distribution planning.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 shelter-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-foreground">Shelter Network Dashboard</h4>
                <p className="text-muted-foreground">
                  Access comprehensive shelter management tools and real-time analytics
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Available Beds</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">89</div>
                  <div className="text-sm text-muted-foreground">Active Shelters</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Placement Rate</div>
                </div>
              </div>

              <Link href="/shelters">
                <Button className="w-full shelter-gradient text-white" size="lg">
                  Access Shelter Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Professional Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold text-foreground mb-4">Professional Features</h4>
            <p className="text-lg text-muted-foreground mb-2">पेशेवर सुविधाएं</p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced tools for comprehensive emergency management and team coordination
              <br />
              <span className="text-lg text-muted-foreground/80">
                व्यापक आपातकालीन प्रबंधन और टीम समन्वय के लिए उन्नत उपकरण
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/communication">
              <Card className="glass-card hover-lift cursor-pointer group h-full">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">Team Communication</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">टीम संचार</p>
                  <CardDescription className="text-sm leading-relaxed">
                    Real-time chat, voice calls, and video conferencing for seamless team coordination
                    <br />
                    <span className="text-xs text-muted-foreground/70 mt-2 block">
                      निर्बाध टीम समन्वय के लिए रीयल-टाइम चैट, वॉयस कॉल और वीडियो कॉन्फ्रेंसिंग
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/analytics">
              <Card className="glass-card hover-lift cursor-pointer group h-full">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">Advanced Analytics</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">उन्नत एनालिटिक्स</p>
                  <CardDescription className="text-sm leading-relaxed">
                    Comprehensive performance metrics, predictive analytics, and detailed reporting
                    <br />
                    <span className="text-xs text-muted-foreground/70 mt-2 block">
                      व्यापक प्रदर्शन मेट्रिक्स, भविष्यसूचक एनालिटिक्स और विस्तृत रिपोर्टिंग
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/resources">
              <Card className="glass-card hover-lift cursor-pointer group h-full">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 brand-tile rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">Resource Management</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">संसाधन प्रबंधन</p>
                  <CardDescription className="text-sm leading-relaxed">
                    Track equipment, personnel, and supplies with automated inventory management
                    <br />
                    <span className="text-xs text-muted-foreground/70 mt-2 block">
                      स्वचालित इन्वेंटरी प्रबंधन के साथ उपकरण, कर्मचारी और आपूर्ति को ट्रैक करें
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Why Choose SurakshaConnect?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Enterprise Security</h4>
                    <p className="text-muted-foreground">
                      Bank-level encryption, HIPAA compliance, and secure data handling for sensitive emergency
                      information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Scalable Infrastructure</h4>
                    <p className="text-muted-foreground">
                      Cloud-based architecture that scales from small teams to city-wide emergency management systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Expert Support</h4>
                    <p className="text-muted-foreground">
                      Dedicated emergency management specialists available 24/7 for technical support and crisis
                      consultation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-border">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-foreground">Ready to Get Started?</h4>
                <p className="text-muted-foreground">
                  Join hundreds of emergency response teams already using SurakshaConnect
                </p>
              </div>

              <div className="space-y-4">
                <Link href="/register">
                  <Button className="w-full" size="lg">
                    Start Free 30-Day Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Schedule Demo
                </Button>
              </div>

              <div className="text-center mt-6 text-sm text-muted-foreground">
                No credit card required • Setup in 5 minutes
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 px-4 section-darker">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">Trusted by Indian Emergency Professionals</h3>
            <p className="text-lg text-muted-foreground mb-2">भारतीय आपातकालीन पेशेवरों द्वारा विश्वसनीय</p>
            <p className="text-xl text-muted-foreground">
              See what Indian crisis management teams are saying about SurakshaConnect
              <br />
              <span className="text-lg text-muted-foreground/80">
                देखें कि भारतीय संकट प्रबंधन टीमें सुरक्षा कनेक्ट के बारे में क्या कह रही हैं
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "SurakshaConnect ने हमारे आपातकालीन प्रतिक्रिया समय में क्रांति ला दी है। The real-time location tracking और
                  police integration features are game-changers for Mumbai's emergency services."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">AS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Arjun Sharma</div>
                    <div className="text-sm text-muted-foreground">Emergency Coordinator, Mumbai Police</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The user dashboard gives us complete visibility into all active emergencies across Delhi NCR. हमारी
                  response efficiency 45% तक बेहतर हुई है since implementation."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">PK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Priya Kapoor</div>
                    <div className="text-sm text-muted-foreground">Fire Chief, Delhi Fire Service</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Professional, reliable, और बहुत intuitive। SurakshaConnect handles our Bangalore city-wide emergency
                  management with ease. Highly recommended for Indian cities."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">RN</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Rajesh Nair</div>
                    <div className="text-sm text-muted-foreground">City Emergency Manager, Bangalore</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="glass-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center pulse-glow">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-bold text-xl text-foreground">SurakshaConnect</span>
                  <p className="text-sm text-muted-foreground">सुरक्षा कनेक्ट</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                India's professional crisis management platform trusted by emergency response teams across the country.
                <br />
                <span className="text-xs text-muted-foreground/70 mt-2 block">
                  भारत की पेशेवर संकट प्रबंधन प्लेटफॉर्म जो देश भर की आपातकालीन प्रतिक्रिया टीमों द्वारा विश्वसनीय है।
                </span>
              </p>
              <p className="text-muted-foreground/70 text-xs">
                &copy; 2024 SurakshaConnect. All rights reserved. Made in India for India.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg text-foreground">
                Features
                <span className="text-sm text-muted-foreground ml-2">सुविधाएं</span>
              </h4>
              <div className="space-y-3 text-sm">
                <Link href="/voice" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Voice Emergency / आवाज़ आपातकाल
                </Link>
                <Link href="/triage" className="text-muted-foreground hover:text-foreground block transition-colors">
                  AI Triage / एआई ट्राइएज
                </Link>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Dashboard / डैशबोर्ड
                </Link>
                <Link href="/guides" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Visual Guides / दृश्य गाइड
                </Link>
                <Link
                  href="/communication"
                  className="text-muted-foreground hover:text-foreground block transition-colors"
                >
                  Team Chat / टीम चैट
                </Link>
                <Link href="/analytics" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Analytics / एनालिटिक्स
                </Link>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Resources / संसाधन
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg text-foreground">
                Support
                <span className="text-sm text-muted-foreground ml-2">सहायता</span>
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+91-1800-SURAKSHA (787-2574)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span>Hindi, English + 20 Indian Languages</span>
                </div>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Contact Support / संपर्क सहायता
                </Link>
                <Link href="/help" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Help Center / सहायता केंद्र
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg text-foreground">
                Company
                <span className="text-sm text-muted-foreground ml-2">कंपनी</span>
              </h4>
              <div className="space-y-3 text-sm">
                <Link href="/about" className="text-muted-foreground hover:text-foreground block transition-colors">
                  About Us / हमारे बारे में
                </Link>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Careers / करियर
                </Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Privacy Policy / गोपनीयता नीति
                </Link>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground block transition-colors">
                  Terms of Service / सेवा की शर्तें
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              &copy; 2024 SurakshaConnect. All rights reserved. Made in India for Indian emergency services.
            </p>
            <p className="text-xs text-muted-foreground/70 mb-4">
              &copy; 2024 सुरक्षा कनेक्ट। सभी अधिकार सुरक्षित। भारतीय आपातकालीन सेवाओं के लिए भारत में निर्मित।
            </p>
            {/* Developer Credits Section */}
            <div className="developer-credits mt-8 pt-6 rounded-lg">
              <h5 className="font-semibold text-foreground mb-3">Developed by</h5>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium">Mousoom Samanta</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="font-medium">Anwesa Banerjee</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="font-medium">Titli Dutta</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="font-medium">Dipanjan Basak</span>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Dedicated to building technology for emergency response and public safety
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
