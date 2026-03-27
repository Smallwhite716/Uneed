"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail, HelpCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "如何发布快递代取任务？",
    a: "点击首页右下角的 + 按钮，选择「快递代取」，填写取件地点、派送地点、时间要求和报酬金额后提交即可。"
  },
  {
    q: "如何接别人的单？",
    a: "在首页信息流中找到快递代取任务，点击进入详情页，然后点击「接单」按钮即可。接单后，双方会自动进入聊天页面。"
  },
  {
    q: "如何发布失物招领？",
    a: "点击 + 按钮，选择「失物招领」，选择「我丢失了」或「我捡到了」，填写物品描述、地点等信息后提交。"
  },
  {
    q: "如何出售或求购二手物品？",
    a: "点击 + 按钮，选择「二手交易」，选择「我要出售」或「我要求购」，填写商品名称、价格、描述等信息后提交。"
  },
  {
    q: "订单完成后如何评价？",
    a: "当订单状态变为「已完成」时，会弹出评价页面。您可以对对方进行 1-5 星评分，并留下文字评价。"
  },
  {
    q: "信用评分是如何计算的？",
    a: "信用评分基于您的订单完成情况、评价得分、违规记录等因素综合计算。信用优秀用户会获得更多信任。"
  },
  {
    q: "可以取消已接的订单吗？",
    a: "在订单进行中（未完成）时，您可以联系发布者说明情况后取消订单。但频繁取消会影响您的信用评分。"
  },
  {
    q: "如何联系客服？",
    a: "您可以通过页面底部的「反馈建议」功能联系我们，或发送邮件至 help@uneed.app"
  }
]

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
      <PageHeader title="帮助中心" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Quick Contact */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">遇到问题？</h3>
                <p className="text-xs text-muted-foreground">我们随时为您提供帮助</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 p-3 rounded-xl bg-card/80 backdrop-blur text-sm font-medium hover:bg-card transition-colors">
                <MessageCircle className="w-4 h-4 text-primary" />
                在线客服
              </button>
              <button className="flex items-center gap-2 p-3 rounded-xl bg-card/80 backdrop-blur text-sm font-medium hover:bg-card transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                电话客服
              </button>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground px-1">常见问题</h3>
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur overflow-hidden">
            <CardContent className="p-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={cn(
                    "border-b border-border/50 last:border-0",
                    openIndex === index && "bg-secondary/30"
                  )}
                >
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="font-medium pr-4">{faq.q}</span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed animate-in slide-in-from-top-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">联系我们</h3>
            <div className="space-y-3">
              <a href="mailto:help@uneed.app" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                help@uneed.app
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                400-888-8888 (工作日 9:00-18:00)
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
