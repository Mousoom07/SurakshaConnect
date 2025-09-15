"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Wifi,
  Bluetooth,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Smartphone,
  Signal,
  Zap,
  Network,
} from "lucide-react"

interface PeerDevice {
  id: string
  name: string
  distance: number
  signalStrength: number
  batteryLevel: number
  lastSeen: Date
  isRelay: boolean
  hasInternet: boolean
}

interface P2PMessage {
  id: string
  type: "sos" | "relay" | "status" | "response"
  content: string
  sender: string
  timestamp: Date
  hops: number
  priority: "low" | "medium" | "high" | "critical"
  delivered: boolean
  location?: { lat: number; lng: number }
}

export default function P2PSOSNetwork() {
  const [isP2PEnabled, setIsP2PEnabled] = useState(false)
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false)
  const [isWiFiDirectEnabled, setIsWiFiDirectEnabled] = useState(false)
  const [nearbyDevices, setNearbyDevices] = useState<PeerDevice[]>([])
  const [messages, setMessages] = useState<P2PMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [networkStatus, setNetworkStatus] = useState<"offline" | "p2p-only" | "internet">("offline")
  const [meshConnections, setMeshConnections] = useState(0)
  const [messagesSent, setMessagesSent] = useState(0)
  const [messagesRelayed, setMessagesRelayed] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate nearby device discovery
  const mockDevices: PeerDevice[] = [
    {
      id: "1",
      name: "Emergency Phone A",
      distance: 50,
      signalStrength: 85,
      batteryLevel: 67,
      lastSeen: new Date(),
      isRelay: true,
      hasInternet: false,
    },
    {
      id: "2",
      name: "Rescue Team Alpha",
      distance: 120,
      signalStrength: 72,
      batteryLevel: 89,
      lastSeen: new Date(),
      isRelay: true,
      hasInternet: true,
    },
    {
      id: "3",
      name: "Survivor Device",
      distance: 80,
      signalStrength: 60,
      batteryLevel: 23,
      lastSeen: new Date(),
      isRelay: false,
      hasInternet: false,
    },
    {
      id: "4",
      name: "Base Station",
      distance: 200,
      signalStrength: 45,
      batteryLevel: 100,
      lastSeen: new Date(),
      isRelay: true,
      hasInternet: true,
    },
  ]

  const startP2PNetwork = async () => {
    setIsP2PEnabled(true)
    setIsScanning(true)

    // Simulate enabling Bluetooth and WiFi Direct
    setTimeout(() => setIsBluetoothEnabled(true), 1000)
    setTimeout(() => setIsWiFiDirectEnabled(true), 1500)

    // Start device discovery
    scanIntervalRef.current = setInterval(() => {
      const availableDevices = mockDevices.filter(() => Math.random() > 0.3)
      setNearbyDevices(availableDevices)
      setMeshConnections(availableDevices.length)

      // Update network status based on available devices
      const hasInternetDevice = availableDevices.some((d) => d.hasInternet)
      setNetworkStatus(hasInternetDevice ? "internet" : availableDevices.length > 0 ? "p2p-only" : "offline")
    }, 3000)

    setIsScanning(false)
  }

  const stopP2PNetwork = () => {
    setIsP2PEnabled(false)
    setIsBluetoothEnabled(false)
    setIsWiFiDirectEnabled(false)
    setNearbyDevices([])
    setMeshConnections(0)
    setNetworkStatus("offline")

    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
    }
  }

  const sendSOSMessage = () => {
    if (!isP2PEnabled || nearbyDevices.length === 0) return

    const sosMessage: P2PMessage = {
      id: Date.now().toString(),
      type: "sos",
      content: "EMERGENCY: Need immediate assistance. Location shared.",
      sender: "You",
      timestamp: new Date(),
      hops: 0,
      priority: "critical",
      delivered: false,
      location: { lat: 40.7128, lng: -74.006 }, // Mock location
    }

    setMessages((prev) => [...prev, sosMessage])
    setMessagesSent((prev) => prev + 1)

    // Simulate message propagation through mesh network
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === sosMessage.id ? { ...msg, delivered: true, hops: 2 } : msg)))

      // Simulate response from rescue team
      setTimeout(() => {
        const response: P2PMessage = {
          id: (Date.now() + 1).toString(),
          type: "response",
          content: "Rescue Team Alpha received your SOS. Help is on the way. ETA: 15 minutes.",
          sender: "Rescue Team Alpha",
          timestamp: new Date(),
          hops: 2,
          priority: "high",
          delivered: true,
        }
        setMessages((prev) => [...prev, response])
      }, 3000)
    }, 2000)
  }

  const sendCustomMessage = () => {
    if (!newMessage.trim() || !isP2PEnabled) return

    const message: P2PMessage = {
      id: Date.now().toString(),
      type: "status",
      content: newMessage,
      sender: "You",
      timestamp: new Date(),
      hops: 0,
      priority: "medium",
      delivered: false,
    }

    setMessages((prev) => [...prev, message])
    setMessagesSent((prev) => prev + 1)
    setNewMessage("")

    // Simulate delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, delivered: true, hops: 1 } : msg)))
    }, 1500)
  }

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            Peer-to-Peer SOS Network
            <Badge variant={isP2PEnabled ? "default" : "secondary"} className="ml-auto">
              {isP2PEnabled ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Create a mesh network with nearby devices when cell towers are down. Messages hop device-to-device until
            they reach internet connection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Network Control */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="p2p-toggle" className="font-medium">
                Enable P2P Network
              </Label>
              <p className="text-sm text-gray-500">Uses Bluetooth and WiFi Direct to connect with nearby devices</p>
            </div>
            <Switch
              id="p2p-toggle"
              checked={isP2PEnabled}
              onCheckedChange={isP2PEnabled ? stopP2PNetwork : startP2PNetwork}
              disabled={isScanning}
            />
          </div>

          {/* Network Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Bluetooth className={`h-5 w-5 ${isBluetoothEnabled ? "text-blue-500" : "text-gray-400"}`} />
                <div>
                  <p className="font-medium">Bluetooth</p>
                  <p className="text-sm text-gray-500">{isBluetoothEnabled ? "Connected" : "Disabled"}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Wifi className={`h-5 w-5 ${isWiFiDirectEnabled ? "text-green-500" : "text-gray-400"}`} />
                <div>
                  <p className="font-medium">WiFi Direct</p>
                  <p className="text-sm text-gray-500">{isWiFiDirectEnabled ? "Active" : "Disabled"}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Signal
                  className={`h-5 w-5 ${
                    networkStatus === "internet"
                      ? "text-green-500"
                      : networkStatus === "p2p-only"
                        ? "text-orange-500"
                        : "text-red-500"
                  }`}
                />
                <div>
                  <p className="font-medium">Network Status</p>
                  <p className="text-sm text-gray-500 capitalize">{networkStatus.replace("-", " ")}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Emergency SOS Button */}
          {isP2PEnabled && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-700 mb-2">Emergency SOS</h3>
                <p className="text-red-600 mb-4">Send emergency alert through mesh network to reach help</p>
                <Button
                  onClick={sendSOSMessage}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                  disabled={nearbyDevices.length === 0}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  SEND SOS
                </Button>
                {nearbyDevices.length === 0 && <p className="text-sm text-red-500 mt-2">No nearby devices found</p>}
              </CardContent>
            </Card>
          )}

          {/* Nearby Devices */}
          {isP2PEnabled && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Nearby Devices
                  <Badge variant="outline">{nearbyDevices.length} found</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isScanning ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">Scanning for nearby devices...</p>
                  </div>
                ) : nearbyDevices.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Smartphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No devices found nearby</p>
                    <p className="text-sm">Make sure other devices have P2P enabled</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {nearbyDevices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Smartphone className="h-6 w-6 text-gray-600" />
                            {device.hasInternet && <Wifi className="h-3 w-3 text-green-500 absolute -top-1 -right-1" />}
                          </div>
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{device.distance}m away</span>
                              <span>•</span>
                              <span>Battery: {device.batteryLevel}%</span>
                              {device.isRelay && (
                                <>
                                  <span>•</span>
                                  <Badge variant="secondary" className="text-xs">
                                    Relay
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Signal className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{device.signalStrength}%</span>
                          </div>
                          <Badge variant={device.hasInternet ? "default" : "secondary"}>
                            {device.hasInternet ? "Internet" : "P2P Only"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Message Interface */}
          {isP2PEnabled && nearbyDevices.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Mesh Messages</CardTitle>
                <CardDescription>Send messages through the mesh network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Message History */}
                <div className="h-48 overflow-y-auto space-y-2 p-3 border rounded bg-gray-50">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No messages yet</p>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 rounded-lg ${message.sender === "You" ? "bg-blue-100 ml-8" : "bg-white mr-8"}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <div className="flex items-center gap-1">
                            {message.type === "sos" && <AlertTriangle className="h-3 w-3 text-red-500" />}
                            <Badge
                              variant={
                                message.priority === "critical"
                                  ? "destructive"
                                  : message.priority === "high"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {message.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm mb-2">{message.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          <div className="flex items-center gap-1">
                            {message.delivered ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : (
                              <Clock className="h-3 w-3 text-orange-500" />
                            )}
                            <span>{message.hops} hops</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Send Message */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-12"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendCustomMessage()
                      }
                    }}
                  />
                  <Button onClick={sendCustomMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Network Statistics */}
          {isP2PEnabled && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Network Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{meshConnections}</div>
                    <div className="text-sm text-gray-500">Mesh Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{messagesSent}</div>
                    <div className="text-sm text-gray-500">Messages Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{messagesRelayed}</div>
                    <div className="text-sm text-gray-500">Messages Relayed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {nearbyDevices.filter((d) => d.hasInternet).length}
                    </div>
                    <div className="text-sm text-gray-500">Internet Gateways</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* How It Works */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-800">How P2P Network Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-blue-700">
                <div className="flex items-start gap-2">
                  <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p>Your device connects to nearby phones via Bluetooth and WiFi Direct</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p>Messages hop from device to device, creating a mesh network</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p>When a device with internet is reached, your message goes to emergency services</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <p>Works even when cell towers are down or damaged</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
