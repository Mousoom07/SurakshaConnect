export default function TrustedBadges() {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-muted-foreground/90">
      <div className="flex items-center gap-2 glass-card rounded-md px-3 py-2">
        <span className="w-2 h-2 bg-green-500 rounded-full" />
        ISO Certified
      </div>
      <div className="flex items-center gap-2 glass-card rounded-md px-3 py-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full" />
        Govt Approved
      </div>
      <div className="flex items-center gap-2 glass-card rounded-md px-3 py-2">
        <span className="w-2 h-2 bg-pink-500 rounded-full" />
        AI Powered
      </div>
      <div className="flex items-center gap-2 glass-card rounded-md px-3 py-2">
        <span className="w-2 h-2 bg-yellow-500 rounded-full" />
        Privacy-first
      </div>
    </div>
  )
}