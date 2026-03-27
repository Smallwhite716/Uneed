"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  MapPin,
  Clock
} from "lucide-react"
import { mockUser, mockPosts, creditLevelLabels, mockRatings } from "@/lib/mock-data"
import type { PostCategory } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { getProfile } from "@/lib/demo-storage"

const categoryLabels = {
  express: "快递代取",
  lostfound: "失物招领",
  secondhand: "二手交易"
}

const statusLabels = {
  active: "进行中",
  accepted: "已接单",
  completed: "已完成",
  cancelled: "已取消"
}

const statusColors = {
  active: "bg-primary/10 text-primary",
  accepted: "bg-chart-3/10 text-chart-3",
  completed: "bg-accent/10 text-accent",
  cancelled: "bg-muted text-muted-foreground"
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"published" | "completed" | "ratings">("published")
  const [publishedCategory, setPublishedCategory] = useState<PostCategory>("express")
  const profile = getProfile()

  // 我发布的帖子
  const myPosts = mockPosts.filter(p => p.publisher.id === mockUser.id)
  // 我接的单（我完成的）
  const acceptedPosts = mockPosts.filter(p => p.acceptedBy?.id === mockUser.id)
  const publishedPosts = myPosts.filter(p => p.category === publishedCategory)

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部背景区域 */}
      <div className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-md mx-auto px-4 pt-safe">
          {/* 顶部操作栏 */}
          <div className="flex items-center justify-end py-3">
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* 用户信息卡片 */}
          <div className="flex items-center gap-4 pb-6">
            <Avatar className="w-20 h-20 border-2 border-primary-foreground/30">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className="bg-primary-foreground text-primary text-2xl font-bold">
                {mockUser.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{profile?.nickname || mockUser.name}</h2>
              <p className="text-primary-foreground/80 text-sm mt-0.5">
                {profile?.university || mockUser.university}
              </p>
              {profile?.college && <p className="text-primary-foreground/80 text-xs">{profile.college} · {profile.grade}</p>}
              <div className="mt-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-sm font-medium bg-primary-foreground/20",
                )}>
                  {creditLevelLabels[mockUser.creditLevel]}
                </span>
              </div>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-3 gap-2 pb-4">
            <div className="text-center py-2">
              <p className="text-2xl font-bold">{mockUser.publishedCount}</p>
              <p className="text-xs text-primary-foreground/80">发布</p>
            </div>
            <div className="text-center py-2">
              <p className="text-2xl font-bold">{mockUser.completedCount}</p>
              <p className="text-xs text-primary-foreground/80">完成</p>
            </div>
            <div className="text-center py-2">
              <p className="text-2xl font-bold">{mockUser.receivedRatings}</p>
              <p className="text-xs text-primary-foreground/80">收到评价</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 -mt-2">
        {/* 大 Tab：我发布的 / 我完成的 / 我的评价 */}
        <div className="mb-4">
          <div className="flex rounded-2xl bg-card border border-border p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab("published")}
              className={cn(
                "flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all",
                activeTab === "published"
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              我发布的
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={cn(
                "flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all",
                activeTab === "completed"
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              我完成的
            </button>
            <button
              onClick={() => setActiveTab("ratings")}
              className={cn(
                "flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all",
                activeTab === "ratings"
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              我的评价
            </button>
          </div>
        </div>

        {/* 我发布的：三个小导航 - 分类过滤 */}
        {activeTab === "published" && (
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {(["express", "lostfound", "secondhand"] as PostCategory[]).map((cat) => {
                const icons: Record<PostCategory, string> = {
                  express: "📦",
                  lostfound: "🔍",
                  secondhand: "🛒"
                }
                const isActive = publishedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setPublishedCategory(cat)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                      isActive
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-secondary/70 text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    <span className="text-base">{icons[cat]}</span>
                    <span>{categoryLabels[cat]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* 帖子信息流 */}
        <div className="space-y-3">
          {activeTab === "published" ? (
            publishedPosts.length > 0 ? (
              publishedPosts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[post.category]}
                          </Badge>
                          <Badge className={statusColors[post.status]}>
                            {statusLabels[post.status]}
                          </Badge>
                        </div>
                        {(post.reward || post.price) && (
                          <span className="text-primary font-bold whitespace-nowrap">
                            ¥{post.reward || post.price}
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium line-clamp-1 mb-2">{post.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {post.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.time}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">暂无帖子</p>
                <Link href="/create">
                  <Button>去发布</Button>
                </Link>
              </div>
            )
          ) : activeTab === "completed" ? (
            acceptedPosts.length > 0 ? (
              acceptedPosts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[post.category]}
                          </Badge>
                          <Badge className={statusColors[post.status]}>{statusLabels[post.status]}</Badge>
                        </div>
                        {(post.reward || post.price) && (
                          <span className="text-primary font-bold whitespace-nowrap">
                            ¥{post.reward || post.price}
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium line-clamp-1 mb-2">{post.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {post.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.time}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">暂无接过的单子</p>
                <Link href="/home">
                  <Button>去首页看看</Button>
                </Link>
              </div>
            )
          ) : (
            mockRatings.length > 0 ? (
              mockRatings.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={item.fromUser.avatar} alt={item.fromUser.name} />
                        <AvatarFallback>{item.fromUser.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.fromUser.name}</p>
                        <p className="text-xs text-muted-foreground">{item.createdAt}</p>
                      </div>
                      <Badge className="bg-accent/10 text-accent">好评 {item.rating}.0</Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">暂无评价</p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  )
}
