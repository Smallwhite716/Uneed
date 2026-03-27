"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock } from "lucide-react"
import type { Post } from "@/lib/types"
import { creditLevelLabels, creditLevelColors } from "@/lib/mock-data"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const categoryLabels = {
  express: "快递代取",
  lostfound: "失物招领",
  secondhand: "二手交易"
}

const subTypeLabels = {
  lost: "丢失",
  found: "捡到",
  sell: "出售",
  buy: "求购"
}

const categoryColors = {
  express: "bg-primary/10 text-primary",
  lostfound: "bg-accent/10 text-accent",
  secondhand: "bg-chart-3/10 text-chart-3"
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  // 只显示进行中的帖子
  if (post.status !== "active") return null

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
          {/* Header with category badge and price */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={categoryColors[post.category]}>
                {categoryLabels[post.category]}
              </Badge>
              {post.subType && (
                <Badge variant="outline" className="text-xs">
                  {subTypeLabels[post.subType]}
                </Badge>
              )}
            </div>
            {(post.reward || post.price) && (
              <span className="text-lg font-bold text-primary whitespace-nowrap">
                {post.category === "secondhand" && post.subType === "buy" ? "预算 " : ""}
                ¥{post.reward || post.price}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/post/${post.id}`}>
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-balance hover:text-primary">
              {post.title}
            </h3>
          </Link>

          {/* Description preview */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {post.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {post.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.time}
            </span>
          </div>

          {/* Publisher info */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={post.publisher.avatar} alt={post.publisher.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {post.publisher.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{post.publisher.name}</span>
            </div>
            <span className={cn("text-xs font-medium", creditLevelColors[post.publisher.creditLevel])}>
              {creditLevelLabels[post.publisher.creditLevel]}
            </span>
          </div>

          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href="/chat/conv-1">私聊</Link>
            </Button>
            {post.category === "express" && (
              <Button size="sm" className="flex-1" asChild>
                <Link href={`/post/${post.id}`}>接单</Link>
              </Button>
            )}
          </div>
      </CardContent>
    </Card>
  )
}
