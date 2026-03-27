"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { mockConversations } from "@/lib/mock-data"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ChatListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50 px-4 pt-safe">
        <div className="max-w-md mx-auto flex items-center justify-center h-14">
          <h1 className="text-lg font-semibold">消息</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {mockConversations.length > 0 ? (
          <div className="py-2">
            {mockConversations.map((chat) => (
              <Link key={chat.id} href={`/chat/${chat.id}`}>
                <Card className="mx-4 my-2 rounded-2xl border-0 shadow-sm hover:shadow-md hover:bg-card/90 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12 ring-2 ring-primary/10">
                          <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold">
                            {chat.user.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.unread > 0 && (
                          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{chat.user.name}</span>
                          <span className="text-xs text-muted-foreground">{chat.lastTime}</span>
                        </div>
                        <p className={cn(
                          "text-sm truncate",
                          chat.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                        )}>
                          {chat.lastMessage}
                        </p>
                        {chat.relatedPost && (
                          <p className="text-xs text-muted-foreground/70 mt-1 truncate">
                            相关订单：{chat.relatedPost.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">暂无消息</p>
            <p className="text-xs text-muted-foreground/70 mt-1">快去首页看看有什么可以帮忙的吧</p>
          </div>
        )}
      </main>
    </div>
  )
}
