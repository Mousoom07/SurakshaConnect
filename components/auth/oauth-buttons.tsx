"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"

export function OAuthButtons() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" onClick={() => signIn("google")}>
        <Mail className="mr-2 h-4 w-4" /> Continue with Google
      </Button>
      <Button variant="outline" onClick={() => signIn("github")}>
        <Github className="mr-2 h-4 w-4" /> Continue with GitHub
      </Button>
    </div>
  )
}