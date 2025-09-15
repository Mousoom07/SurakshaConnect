export default function Testimonials() {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        {
          quote: "Rapid coordination helped us save a family in under 10 minutes.",
          by: "Mumbai Fire Dept"
        },
        {
          quote: "2.1 min average response — our teams are more effective.",
          by: "Delhi Police"
        },
        {
          quote: "Secure, multilingual alerts improved trust with citizens.",
          by: "Bengaluru Health"
        },
      ].map((t, i) => (
        <div key={i} className="glass-card rounded-xl p-4">
          <p className="text-sm text-foreground">“{t.quote}”</p>
          <p className="text-xs mt-2 text-muted-foreground">— {t.by}</p>
        </div>
      ))}
    </div>
  )
}