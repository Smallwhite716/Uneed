"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle } from "lucide-react"
import { mockPosts } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const ratingLabels = ["很差", "较差", "一般", "满意", "非常满意"]

function RatingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get("postId")

  const post = mockPosts.find(p => p.id === postId)
  const targetUser = post?.acceptedBy || post?.publisher

  const [rating, setRating] = useState(5)
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const commonTags = ["响应及时", "态度很好", "沟通顺畅", "准时完成", "物品完好", "值得推荐"]

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag))
    } else if (tags.length < 3) {
      setTags([...tags, tag])
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
        <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center mb-6 animate-in zoom-in duration-300">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">评价成功！</h2>
          <p className="text-muted-foreground text-center mb-8">
            感谢您的反馈<br />
            希望您有愉快的使用体验
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => router.push("/home")}
            >
              返回首页
            </Button>
            <Button
              className="rounded-xl bg-gradient-to-r from-primary to-primary/90"
              onClick={() => router.push("/profile")}
            >
              查看评价
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50 px-4 pt-safe">
        <div className="max-w-md mx-auto flex items-center justify-center h-14">
          <h1 className="text-lg font-semibold">评价</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* User Info */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 ring-4 ring-primary/10">
                <AvatarImage src={targetUser?.avatar} alt={targetUser?.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xl font-bold">
                  {targetUser?.name?.slice(0, 1) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-lg">{targetUser?.name}</p>
                <p className="text-sm text-muted-foreground">已完成订单</p>
              </div>
              <Badge className="bg-green-500/10 text-green-600 border-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                已完成
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Rating Stars */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-3">请为本次服务评分</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "w-10 h-10 transition-colors",
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-medium text-yellow-600 mt-2">{ratingLabels[rating - 1]}</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tags */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">选择标签（可选，最多3个）</p>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    tags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comment */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">详细评价（选填）</p>
            <Textarea
              placeholder="分享您的使用体验..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] rounded-xl bg-secondary/50 border-0 resize-none"
            />
            <p className="text-xs text-muted-foreground text-right mt-2">{content.length}/200</p>
          </CardContent>
        </Card>

        {/* Submit */}
        <Button
          className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20"
          onClick={handleSubmit}
        >
          提交评价
        </Button>

        {/* Skip */}
        <button
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => router.back()}
        >
          稍后评价
        </button>
      </main>
    </div>
  )
}

function RatingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">加载中...</p>
      </div>
    </div>
  )
}

export default function RatingPage() {
  return (
    <Suspense fallback={<RatingLoading />}>
      <RatingContent />
    </Suspense>
  )
}
