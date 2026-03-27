"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { FloatingButton } from "@/components/floating-button"
import { mockConversations } from "@/lib/mock-data"
import Link from "next/link"

export default function ChatListPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 pt-safe">
        <div className="max-w-md mx-auto flex items-center justify-center h-14">
          <h1 className="text-lg font-semibold">消息</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {mockConversations.length > 0 ? (
          <div>
            {mockConversations.map((chat) => (
              <Link key={chat.id} href={`/chat/${chat.id}`}>
                <Card className="rounded-none border-x-0 border-t-0 hover:bg-secondary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {chat.user.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.unread > 0 && (
                          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{chat.user.name}</span>
                          <span className="text-xs text-muted-foreground">{chat.lastTime}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无消息</p>
          </div>
        )}
      </main>

      <FloatingButton />
      <BottomNav />
    </div>
  )
}
