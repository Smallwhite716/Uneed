"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, MessageSquareText, Bug, Lightbulb, Heart } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { cn } from "@/lib/utils"

const feedbackTypes = [
  { key: "suggestion", label: "功能建议", icon: Lightbulb, color: "text-yellow-500" },
  { key: "bug", label: "问题反馈", icon: Bug, color: "text-red-500" },
  { key: "other", label: "其他", icon: MessageSquareText, color: "text-blue-500" }
]

export default function FeedbackPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [content, setContent] = useState("")
  const [contact, setContact] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = selectedType && content.length >= 10

  const handleSubmit = () => {
    if (!canSubmit) return
    // 模拟提交
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
        <PageHeader title="反馈建议" />
        <main className="max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center mb-6 animate-in zoom-in duration-300">
            <Heart className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">感谢您的反馈！</h2>
          <p className="text-muted-foreground text-center mb-6">
            我们非常重视您的意见<br />
            会认真考虑并尽快处理
          </p>
          <Button
            className="rounded-xl bg-gradient-to-r from-primary to-primary/90"
            onClick={() => window.history.back()}
          >
            返回设置
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
      <PageHeader title="反馈建议" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                <MessageSquareText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">意见反馈</h3>
                <p className="text-xs text-muted-foreground">帮助我们做得更好</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium px-1">反馈类型</label>
          <div className="grid grid-cols-3 gap-2">
            {feedbackTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.key}
                  onClick={() => setSelectedType(type.key)}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                    selectedType === type.key
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-card hover:bg-secondary/50"
                  )}
                >
                  <Icon className={cn("w-5 h-5", selectedType === type.key ? type.color : "text-muted-foreground")} />
                  <span className={cn(
                    "text-xs font-medium",
                    selectedType === type.key ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {type.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="text-sm font-medium px-1">详细描述</label>
          <Textarea
            placeholder="请详细描述您的问题或建议（至少10个字）..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px] rounded-xl bg-card border-0 resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">{content.length}/500</p>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <label className="text-sm font-medium px-1">联系方式（选填）</label>
          <Input
            placeholder="手机号或邮箱"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="rounded-xl bg-card border-0"
          />
          <p className="text-xs text-muted-foreground">便于我们进一步了解情况</p>
        </div>

        <Button
          className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          <Send className="w-4 h-4 mr-2" />
          提交反馈
        </Button>
      </main>
    </div>
  )
}
