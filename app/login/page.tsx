import { LoginForm } from "@/components/auth/login-form"
import TrustedBadges from "@/components/trusted-badges"

export default function LoginPage() {
  return (
    <div className="hero-radial">
      {/* Live stats ticker */}
      <div className="w-full overflow-hidden">
        <div className="whitespace-nowrap animate-[scroll_15s_linear_infinite] py-3 text-center text-sm text-muted-foreground border-y border-border bg-white/10 dark:bg-black/30 backdrop-blur">
          <span className="mx-6">👉 2,134 active responses handled today</span>
          <span className="mx-6">👉 Avg response time 2.1 mins</span>
          <span className="mx-6">👉 500+ cities covered</span>
        </div>
      </div>

      {/* Login card centered */}
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md glass-card rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-1 text-center">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-6 text-center">Secure access to SurakshaConnect</p>
          <LoginForm />
          <div className="mt-6">
            <TrustedBadges />
          </div>
        </div>
      </section>
    </div>
  )
}
