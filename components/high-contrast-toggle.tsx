"use client"

import React, { useEffect, useState } from "react"

export default function HighContrastToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [enabled])

  return (
    <button
      aria-pressed={enabled}
      onClick={() => setEnabled(!enabled)}
      className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {enabled ? "Disable High Contrast" : "Enable High Contrast"}
    </button>
  )
}
