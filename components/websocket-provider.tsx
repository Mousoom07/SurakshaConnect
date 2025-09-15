"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface WebSocketContextType {
  socket: WebSocket | null
  isConnected: boolean
  sendMessage: (message: any) => void
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  sendMessage: () => {},
})

export const useWebSocket = () => useContext(WebSocketContext)

interface WebSocketProviderProps {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080")

    ws.onopen = () => {
      console.log("[v0] WebSocket connected")
      setIsConnected(true)
      setSocket(ws)
    }

    ws.onclose = () => {
      console.log("[v0] WebSocket disconnected")
      setIsConnected(false)
      setSocket(null)
    }

    ws.onerror = (error) => {
      console.error("[v0] WebSocket error:", error)
    }

    return () => {
      ws.close()
    }
  }, [])

  const sendMessage = (message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message))
    }
  }

  return <WebSocketContext.Provider value={{ socket, isConnected, sendMessage }}>{children}</WebSocketContext.Provider>
}
