"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Send, Phone, MoreVertical } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { mockMessages, mockConversations } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function ChatDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [messages, setMessages] = useState(mockMessages)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = mockConversations.find((item) => item.id === params.id)
  const otherUser = conversation?.user || mockConversations[0].user

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: "user-1",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      isMe: true
    }

    setMessages([...messages, newMessage])
    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50 px-4 pt-safe">
        <div className="max-w-md mx-auto flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-secondary/80" onClick={() => router.back()}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="w-9 h-9 ring-2 ring-primary/10">
                <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-bold">
                  {otherUser.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{otherUser.name}</p>
                <p className="text-xs text-green-500 font-medium">在线</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hover:bg-secondary/80">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary/80">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.isMe ? "flex-row-reverse" : "flex-row"
              )}
            >
              {!message.isMe && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                  <AvatarFallback className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground text-sm font-bold">
                    {otherUser.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[75%] px-4 py-3 rounded-2xl shadow-sm",
                  message.isMe
                    ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md"
                    : "bg-card rounded-bl-md"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-card/80 backdrop-blur-xl border-t border-border/50 px-4 py-3 pb-safe">
        <div className="max-w-md mx-auto flex gap-3">
          <Input
            placeholder="输入消息..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-xl bg-secondary/50 border-0 h-11"
          />
          <Button
            size="icon"
            className="rounded-xl bg-gradient-to-br from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
