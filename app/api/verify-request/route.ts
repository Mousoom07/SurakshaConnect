import { type NextRequest, NextResponse } from "next/server"

interface VerificationResult {
  urgencyScore: number
  duplicateScore: number
  spamScore: number
  confidence: number
  status: "verified" | "flagged" | "duplicate" | "pending"
  aiAnalysis: string
  similarRequests: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { content, location, existingRequests } = await request.json()

    // Mock AI verification logic - in production, use actual AI models
    const urgencyKeywords = ["trapped", "bleeding", "collapsed", "fire", "drowning", "chest pain", "unconscious"]
    const spamKeywords = ["free", "money", "prize", "click", "link", "offer", "win"]

    // Calculate urgency score
    const urgencyScore = urgencyKeywords.reduce(
      (score, keyword) => {
        return content.toLowerCase().includes(keyword) ? score + 15 : score
      },
      Math.floor(Math.random() * 30) + 20,
    )

    // Calculate spam score
    const spamScore = spamKeywords.reduce(
      (score, keyword) => {
        return content.toLowerCase().includes(keyword) ? score + 20 : score
      },
      Math.floor(Math.random() * 10),
    )

    // Mock duplicate detection
    const duplicateScore = Math.floor(Math.random() * 30) + 10

    // Determine status
    let status: VerificationResult["status"] = "pending"
    if (spamScore > 70) status = "flagged"
    else if (duplicateScore > 80) status = "duplicate"
    else if (urgencyScore > 70 && spamScore < 20) status = "verified"

    const confidence = Math.floor(Math.random() * 20) + 80

    const result: VerificationResult = {
      urgencyScore: Math.min(urgencyScore, 100),
      duplicateScore: Math.min(duplicateScore, 100),
      spamScore: Math.min(spamScore, 100),
      confidence,
      status,
      aiAnalysis: generateAnalysis(urgencyScore, duplicateScore, spamScore, status),
      similarRequests: duplicateScore > 80 ? ["req-001", "req-003"] : [],
    }

    return NextResponse.json({ success: true, verification: result })
  } catch (error) {
    console.error("Error verifying request:", error)
    return NextResponse.json({ error: "Failed to verify request" }, { status: 500 })
  }
}

function generateAnalysis(urgency: number, duplicate: number, spam: number, status: string): string {
  if (status === "flagged") {
    return "High spam probability detected. Content contains promotional language or suspicious patterns unrelated to emergency situations."
  }

  if (status === "duplicate") {
    return "Likely duplicate request detected. Similar content and location match existing emergency reports in the system."
  }

  if (urgency > 90) {
    return "Critical emergency situation identified. High urgency keywords and patterns suggest immediate life-threatening scenario requiring priority response."
  }

  if (urgency > 70) {
    return "Significant emergency situation detected. Content indicates serious incident requiring prompt emergency response coordination."
  }

  return "Standard emergency request. Content appears legitimate but requires human verification for priority assessment."
}
