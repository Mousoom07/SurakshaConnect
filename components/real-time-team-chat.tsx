"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Phone, Video, AlertTriangle, Users, MapPin, Clock } from "lucide-react"

interface Message {
  id: string
  userId: string
  userName: string
  userRole: string
  content: string
  timestamp: Date
  type: "text" | "alert" | "location" | "status"
  priority: "low" | "medium" | "high" | "critical"
  location?: { lat: number; lng: number; address: string }
}

interface TeamMember {
  id: string
  name: string
  role: string
  status: "online" | "busy" | "offline"
  location?: string
  avatar?: string
}

export default function RealTimeTeamChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "user1",
      userName: "Dr. Priya Sharma",
      userRole: "Medical Team Lead",
      content: "Medical team deployed to sector 7. Need immediate backup for triage.",
      timestamp: new Date(Date.now() - 300000),
      type: "alert",
      priority: "high",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Capt. Rajesh Kumar",
      userRole: "Fire & Rescue",
      content: "Building collapse at coordinates 28.6139, 77.2090. Requesting heavy machinery.",
      timestamp: new Date(Date.now() - 180000),
      type: "location",
      priority: "critical",
      location: { lat: 28.6139, lng: 77.209, address: "Connaught Place, New Delhi" },
    },
    {
      id: "3",
      userId: "user3",
      userName: "Inspector Meera Patel",
      userRole: "Police Coordinator",
      content: "Traffic routes cleared. Emergency vehicles have priority access.",
      timestamp: new Date(Date.now() - 120000),
      type: "status",
      priority: "medium",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [activeTeam, setActiveTeam] = useState("all")
  const [onlineMembers] = useState<TeamMember[]>([
    { id: "user1", name: "Dr. Priya Sharma", role: "Medical Lead", status: "online", location: "Sector 7" },
    { id: "user2", name: "Capt. Rajesh Kumar", role: "Fire & Rescue", status: "busy", location: "Connaught Place" },
    {
      id: "user3",
      name: "Inspector Meera Patel",
      role: "Police Coordinator",
      status: "online",
      location: "Control Room",
    },
    { id: "user4", name: "Eng. Amit Singh", role: "Infrastructure", status: "online", location: "Field Unit 3" },
    { id: "user5", name: "Dr. Sarah Johnson", role: "International Aid", status: "offline", location: "Base Camp" },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "You",
      userRole: "Incident Commander",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      priority: "medium",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Team Members Panel */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members ({onlineMembers.filter((m) => m.status === "online").length} online)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-2 p-4">
              {onlineMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-gray-500 truncate">{member.role}</p>
                    {member.location && (
                      <p className="text-xs text-blue-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {member.location}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Video className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Panel */}
      <Card className="lg:col-span-3">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Team Communication</CardTitle>
            <Tabs value={activeTeam} onValueChange={setActiveTeam} className="w-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="rescue">Rescue</TabsTrigger>
                <TabsTrigger value="police">Police</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback>
                      {message.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{message.userName}</span>
                      <Badge variant="outline" className="text-xs">
                        {message.userRole}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityColor(message.priority)} text-white`}>
                        {message.priority}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "alert"
                          ? "bg-red-50 border border-red-200"
                          : message.type === "location"
                            ? "bg-blue-50 border border-blue-200"
                            : message.type === "status"
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50"
                      }`}
                    >
                      {message.type === "alert" && (
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-red-700">Emergency Alert</span>
                        </div>
                      )}
                      {message.type === "location" && message.location && (
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-700">Location Update</span>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      {message.location && (
                        <div className="mt-2 p-2 bg-white rounded border">
                          <p className="text-xs text-gray-600">📍 {message.location.address}</p>
                          <p className="text-xs text-gray-500">
                            Coordinates: {message.location.lat}, {message.location.lng}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 bg-transparent">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Send Alert
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-transparent">
                <MapPin className="h-3 w-3 mr-1" />
                Share Location
              </Button>
              <Button variant="outline" size="sm" className="text-green-600 border-green-200 bg-transparent">
                Status Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
