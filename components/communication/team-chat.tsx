"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Phone, Video, AlertTriangle, MapPin, Clock, Users, Mic, MicOff, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  userId: string
  userName: string
  userRole: string
  content: string
  timestamp: Date
  type: "text" | "alert" | "location" | "status"
  priority?: "low" | "medium" | "high" | "critical"
  location?: { lat: number; lng: number; address: string }
}

interface TeamMember {
  id: string
  name: string
  role: string
  status: "online" | "busy" | "away" | "offline"
  location?: string
  avatar?: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    role: "Emergency Coordinator",
    status: "online",
    location: "Mumbai Central",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Priya Kapoor",
    role: "Fire Chief",
    status: "busy",
    location: "Delhi NCR",
  },
  {
    id: "3",
    name: "Rajesh Nair",
    role: "Medical Team Lead",
    status: "online",
    location: "Bangalore",
  },
  {
    id: "4",
    name: "Sneha Patel",
    role: "Rescue Specialist",
    status: "away",
    location: "Ahmedabad",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    userId: "1",
    userName: "Arjun Sharma",
    userRole: "Emergency Coordinator",
    content: "Team Alpha, we have a critical situation at Main Street. Building collapse reported.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: "alert",
    priority: "critical",
  },
  {
    id: "2",
    userId: "2",
    userName: "Priya Kapoor",
    userRole: "Fire Chief",
    content: "Fire team en route. ETA 8 minutes. Medical support requested.",
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
    type: "status",
  },
  {
    id: "3",
    userId: "3",
    userName: "Rajesh Nair",
    userRole: "Medical Team Lead",
    content: "Medical team dispatched. Ambulance and trauma kit ready.",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    type: "status",
  },
  {
    id: "4",
    userId: "1",
    userName: "Arjun Sharma",
    userRole: "Emergency Coordinator",
    content: "Location confirmed: 19.0760° N, 72.8777° E - Main Street, Mumbai",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: "location",
    location: { lat: 19.076, lng: 72.8777, address: "Main Street, Mumbai" },
  },
]

export function TeamChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
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
      userRole: "Emergency Coordinator",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const sendAlert = (priority: "high" | "critical") => {
    const message: Message = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "You",
      userRole: "Emergency Coordinator",
      content: `${priority.toUpperCase()} ALERT: Immediate attention required`,
      timestamp: new Date(),
      type: "alert",
      priority,
    }

    setMessages([...messages, message])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-red-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "critical":
        return "border-l-red-500 bg-red-50 dark:bg-red-950/20"
      case "high":
        return "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      default:
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
    }
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Team Members Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members
          </CardTitle>
          <CardDescription>Active response team</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                        getStatusColor(member.status),
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                    {member.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Emergency Response Chat
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {mockTeamMembers.filter((m) => m.status === "online").length} Online
                </Badge>
              </CardTitle>
              <CardDescription>Real-time team coordination</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Voice Call
              </Button>
              <Button size="sm" variant="outline">
                <Video className="w-4 h-4 mr-2" />
                Video Call
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-[450px]">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "p-3 rounded-lg border-l-4",
                    message.type === "alert" ? getPriorityColor(message.priority) : "border-l-transparent bg-muted/30",
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {message.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{message.userName}</span>
                      <Badge variant="outline" className="text-xs">
                        {message.userRole}
                      </Badge>
                      {message.type === "alert" && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {message.priority?.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  {message.location && (
                    <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="font-medium">Location:</span>
                        {message.location.address}
                      </div>
                      <div className="text-muted-foreground">
                        {message.location.lat.toFixed(4)}°N, {message.location.lng.toFixed(4)}°E
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <Separator className="my-4" />

          {/* Message Input */}
          <div className="space-y-3">
            {/* Quick Alert Buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => sendAlert("high")}
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                High Alert
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => sendAlert("critical")}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                Critical Alert
              </Button>
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsRecording(!isRecording)}
                className={cn(isRecording && "bg-red-100 text-red-600")}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
