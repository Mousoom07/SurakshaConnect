"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type CommunityStory = {
  title: string
  location: string
  excerpt: string
}

export default function CommunityStories({ stories }: { stories: CommunityStory[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stories.map((s, i) => (
        <Card key={i} className="hover-lift hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{s.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-1">{s.location}</p>
            <p className="text-sm text-foreground/90">{s.excerpt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}