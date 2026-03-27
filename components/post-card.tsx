"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock } from "lucide-react"
import type { Post } from "@/lib/types"
import { creditLevelLabels, creditLevelColors } from "@/lib/mock-data"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
  express: "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-0",
  lostfound: "bg-gradient-to-r from-accent/20 to-accent/10 text-accent-foreground border-0",
  secondhand: "bg-gradient-to-r from-chart-3/20 to-chart-3/10 text-chart-3 border-0"
}

const categoryGradients = {
  express: "from-primary/5",
  lostfound: "from-accent/5",
  secondhand: "from-chart-3/5"
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  // 只显示进行中的帖子
  if (post.status !== "active") return null

  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5",
      "bg-gradient-to-br from-card to-card/80"
    )}>
      <CardContent className="p-4">
        {/* Header with category badge and price */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={cn("font-medium", categoryColors[post.category])}>
              {categoryLabels[post.category]}
            </Badge>
            {post.subType && (
              <Badge variant="outline" className="text-xs font-medium">
                {subTypeLabels[post.subType]}
              </Badge>
            )}
          </div>
          {(post.reward || post.price) && (
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent whitespace-nowrap">
              {post.category === "secondhand" && post.subType === "buy" ? "预算 " : ""}
              ¥{post.reward || post.price}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/post/${post.id}`}>
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-balance hover:bg-gradient-to-r hover:from-primary hover:to-primary/70 hover:bg-clip-text hover:text-transparent transition-all cursor-pointer">
            {post.title}
          </h3>
        </Link>

        {/* Description preview */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {post.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-full">
            <MapPin className="w-3 h-3" />
            {post.location}
          </span>
          <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {post.time}
          </span>
        </div>

        {/* Publisher info */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7 ring-2 ring-primary/10">
              <AvatarImage src={post.publisher.avatar} alt={post.publisher.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-bold">
                {post.publisher.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{post.publisher.name}</span>
          </div>
          <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r", creditLevelColors[post.publisher.creditLevel], "from-current/10 to-current/5")}>
            {creditLevelLabels[post.publisher.creditLevel]}
          </span>
        </div>

      </CardContent>
    </Card>
  )
}
