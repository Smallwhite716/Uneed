"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, MessageCircle, ChevronLeft, Share2, CheckCircle } from "lucide-react"
import { mockPosts, creditLevelLabels, creditLevelColors } from "@/lib/mock-data"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const categoryLabels = {
  express: "快递代取",
  lostfound: "失物招领",
  secondhand: "二手交易"
}

const subTypeLabels = {
  lost: "我丢失了",
  found: "我捡到了",
  sell: "出售",
  buy: "求购"
}

const categoryColors = {
  express: "bg-primary text-primary-foreground",
  lostfound: "bg-accent text-accent-foreground",
  secondhand: "bg-chart-3 text-foreground"
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

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isAccepting, setIsAccepting] = useState(false)
  const [postStatus, setPostStatus] = useState<string | null>(null)
  
  const post = mockPosts.find(p => p.id === id)
  const currentStatus = postStatus || post?.status || "active"

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">帖子不存在</p>
          <Button onClick={() => router.back()}>返回</Button>
        </div>
      </div>
    )
  }

  // 只有快递代取才有接单功能
  const canAccept = post.category === "express" && currentStatus === "active"

  const handleAcceptOrder = () => {
    setIsAccepting(true)
    // 模拟接单操作
    setTimeout(() => {
      setPostStatus("accepted")
      setIsAccepting(false)
      // 接单后跳转到聊天页面
      router.push("/chat/conv-1?postId=" + post.id)
    }, 500)
  }

  const handleConfirmComplete = () => {
    setPostStatus("completed")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 pt-safe">
        <div className="max-w-md mx-auto flex items-center justify-between h-14">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">详情</h1>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-4">
        {/* Category & Status Badges */}
        <div className="flex items-center gap-2 mb-3">
          <Badge className={categoryColors[post.category]}>
            {categoryLabels[post.category]}
          </Badge>
          {post.subType && (
            <Badge variant="outline">
              {subTypeLabels[post.subType]}
            </Badge>
          )}
          <Badge className={statusColors[currentStatus as keyof typeof statusColors]}>
            {statusLabels[currentStatus as keyof typeof statusLabels]}
          </Badge>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-3 text-balance leading-tight">{post.title}</h2>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {post.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.time}
          </span>
        </div>

        {/* Price or Reward */}
        {(post.reward || post.price) && (
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-3">
            <span className="text-2xl font-bold text-primary tracking-tight">
              {post.category === "express" && post.reward ? `赏金 ¥${post.reward}` : 
               post.category === "lostfound" && post.reward ? `酬谢 ¥${post.reward}` :
               post.subType === "buy" ? `预算 ¥${post.price}` : `¥${post.price}`}
            </span>
          </div>
        )}

        <section className="mb-6">
          <h3 className="font-semibold mb-2 text-sm text-muted-foreground">详细描述</h3>
          <p className="leading-relaxed">{post.description}</p>
        </section>

        {/* Images Placeholder */}
        {post.images.length > 0 && (
          <section className="mb-6">
            <h3 className="font-semibold mb-2 text-sm text-muted-foreground">图片</h3>
            <div className="grid grid-cols-3 gap-2">
              {post.images.map((_, i) => (
                <div key={i} className="aspect-square bg-secondary rounded-xl" />
              ))}
            </div>
          </section>
        )}

        {/* Accepted By Info - 已被接单时显示 */}
        {post.acceptedBy && currentStatus !== "active" && (
          <section className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              接单人信息
            </h3>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.acceptedBy.avatar} alt={post.acceptedBy.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {post.acceptedBy.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{post.acceptedBy.name}</p>
              </div>
              <Link href={`/chat/${post.acceptedBy.id}`}>
                <Button size="sm" variant="outline" className="gap-1 rounded-full">
                  <MessageCircle className="w-4 h-4" />
                  联系
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* Publisher Info */}
        <section className="border-t border-border pt-4">
          <h3 className="font-semibold mb-3">发布者信息</h3>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={post.publisher.avatar} alt={post.publisher.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {post.publisher.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{post.publisher.name}</p>
              <p className="text-sm text-muted-foreground">{post.publisher.university}</p>
            </div>
            <span className={cn("text-sm font-medium", creditLevelColors[post.publisher.creditLevel])}>
              {creditLevelLabels[post.publisher.creditLevel]}
            </span>
          </div>
        </section>
      </main>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 pb-safe">
        <div className="max-w-md mx-auto flex gap-3">
          {/* 已完成状态：显示评价按钮 */}
          {currentStatus === "completed" && (
            <Button className="flex-1">
              查看评价
            </Button>
          )}
          
          {/* 已接单状态：显示确认完成按钮 */}
          {currentStatus === "accepted" && (
            <>
              <Link href="/chat/conv-1" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="w-4 h-4" />
                  联系对方
                </Button>
              </Link>
              <Button className="flex-1" onClick={handleConfirmComplete}>
                确认完成
              </Button>
            </>
          )}
          
          {/* 进行中状态 */}
          {currentStatus === "active" && (
            <>
              <Link href="/chat/conv-1" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="w-4 h-4" />
                  私聊
                </Button>
              </Link>
              {/* 只有快递代取显示接单按钮 */}
              {canAccept && (
                <Button 
                  className="flex-1" 
                  onClick={handleAcceptOrder}
                  disabled={isAccepting}
                >
                  {isAccepting ? "接单中..." : "接单"}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
