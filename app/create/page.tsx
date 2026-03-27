"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, MapPin, X, Package, Search, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { PostCategory, LostFoundSubType, SecondhandSubType } from "@/lib/types"
import { PageHeader } from "@/components/page-header"

const categories: { key: PostCategory; label: string; emoji: string; description: string }[] = [
  { key: "express", label: "快递代取", emoji: "📦", description: "发布代取任务" },
  { key: "lostfound", label: "失物招领", emoji: "🔍", description: "寻物/拾物" },
  { key: "secondhand", label: "二手交易", emoji: "🛒", description: "买卖二手物品" }
]

const lostFoundSubTypes: { key: LostFoundSubType; label: string; icon: string }[] = [
  { key: "lost", label: "我丢失了", icon: "😢" },
  { key: "found", label: "我捡到了", icon: "🎉" }
]

const secondhandSubTypes: { key: SecondhandSubType; label: string; icon: string }[] = [
  { key: "sell", label: "我要出售", icon: "💰" },
  { key: "buy", label: "我要求购", icon: "🔎" }
]

export default function CreatePostPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null)
  const [lostFoundType, setLostFoundType] = useState<LostFoundSubType | null>(null)
  const [secondhandType, setSecondhandType] = useState<SecondhandSubType | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [timeRequirement, setTimeRequirement] = useState("")
  const [price, setPrice] = useState("")
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = () => {
    if (!selectedCategory || !title || !description || !location) return
    if (selectedCategory === "express" && !timeRequirement) return
    if (selectedCategory === "lostfound" && !lostFoundType) return
    if (selectedCategory === "secondhand" && !secondhandType) return
    // In a real app, this would submit to an API
    router.push("/home")
  }

  const getPriceLabel = () => {
    if (selectedCategory === "express") return "赏金"
    if (selectedCategory === "lostfound") return "酬谢金额"
    if (secondhandType === "buy") return "预算"
    return "价格"
  }

  const getPricePlaceholder = () => {
    if (selectedCategory === "express") return "请输入赏金金额"
    if (selectedCategory === "lostfound") return "请输入酬谢金额（选填）"
    if (secondhandType === "buy") return "请输入预算金额"
    return "请输入商品价格"
  }

  const isFormValid = () => {
    if (!selectedCategory || !title || !description || !location) return false
    if (selectedCategory === "express" && !timeRequirement) return false
    if (selectedCategory === "lostfound" && !lostFoundType) return false
    if (selectedCategory === "secondhand" && !secondhandType) return false
    if (selectedCategory === "secondhand" && !price) return false
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
      <PageHeader title="发布" />

      <main className="max-w-md mx-auto px-4 py-4">
        {/* Category Selection */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3 text-sm text-muted-foreground">选择发布类型</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <Card
                key={cat.key}
                className={cn(
                  "cursor-pointer transition-all duration-200 overflow-hidden",
                  selectedCategory === cat.key
                    ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                    : "hover:border-muted-foreground/30 hover:shadow-md"
                )}
                onClick={() => {
                  setSelectedCategory(cat.key)
                  setLostFoundType(null)
                  setSecondhandType(null)
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl mx-auto mb-2 flex items-center justify-center text-2xl",
                    selectedCategory === cat.key
                      ? "bg-gradient-to-br from-primary/20 to-primary/10"
                      : "bg-secondary"
                  )}>
                    {cat.emoji}
                  </div>
                  <span className="text-sm font-medium">{cat.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SubType Selection for Lost & Found */}
        {selectedCategory === "lostfound" && (
          <div className="mb-6 animate-in slide-in-from-top-2 duration-200">
            <h2 className="font-semibold mb-3 text-sm text-muted-foreground">
              选择标签 <span className="text-destructive">*</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {lostFoundSubTypes.map((type) => (
                <Card
                  key={type.key}
                  className={cn(
                    "cursor-pointer transition-all duration-200 overflow-hidden",
                    lostFoundType === type.key
                      ? "border-accent ring-2 ring-accent/20 bg-accent/5"
                      : "hover:border-muted-foreground/30 hover:shadow-md"
                  )}
                  onClick={() => setLostFoundType(type.key)}
                >
                  <CardContent className="p-4 text-center">
                    <span className="text-2xl mb-2 block">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* SubType Selection for Secondhand */}
        {selectedCategory === "secondhand" && (
          <div className="mb-6 animate-in slide-in-from-top-2 duration-200">
            <h2 className="font-semibold mb-3 text-sm text-muted-foreground">
              选择标签 <span className="text-destructive">*</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {secondhandSubTypes.map((type) => (
                <Card
                  key={type.key}
                  className={cn(
                    "cursor-pointer transition-all duration-200 overflow-hidden",
                    secondhandType === type.key
                      ? "border-chart-3 ring-2 ring-chart-3/20 bg-chart-3/5"
                      : "hover:border-muted-foreground/30 hover:shadow-md"
                  )}
                  onClick={() => setSecondhandType(type.key)}
                >
                  <CardContent className="p-4 text-center">
                    <span className="text-2xl mb-2 block">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && (
          <>
            {/* Title */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-sm">
                标题 <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="请输入标题（10-50字）"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                className="rounded-xl bg-card border-0 h-11"
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {title.length}/50
              </p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-sm">
                详细描述 <span className="text-destructive">*</span>
              </label>
              <Textarea
                placeholder="请详细描述物品或需求信息..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={500}
                className="rounded-xl bg-card border-0 resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {description.length}/500
              </p>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-sm">
                位置 <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="请输入位置信息"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-9 rounded-xl bg-card border-0 h-11"
                />
              </div>
            </div>

            {/* Price / Reward */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-sm">
                {getPriceLabel()}
                {selectedCategory === "secondhand" && <span className="text-destructive"> *</span>}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">¥</span>
                <Input
                  type="number"
                  placeholder={getPricePlaceholder()}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-8 rounded-xl bg-card border-0 h-11"
                />
              </div>
            </div>

            {selectedCategory === "express" && (
              <div className="mb-4">
                <label className="block font-semibold mb-2 text-sm">
                  时间要求 <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="例如：今晚 19:00 前"
                  value={timeRequirement}
                  onChange={(e) => setTimeRequirement(e.target.value)}
                  className="rounded-xl bg-card border-0 h-11"
                />
              </div>
            )}

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-sm">上传图片（选填，最多9张）</label>
              <div className="flex gap-3 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20">
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 rounded-xl" />
                    <button
                      className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {images.length < 9 && (
                  <button
                    className="w-20 h-20 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                    onClick={() => setImages([...images, "placeholder"])}
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-xs">{images.length}/9</span>
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20 text-base font-medium"
              disabled={!isFormValid()}
              onClick={handleSubmit}
            >
              发布
            </Button>
          </>
        )}
      </main>
    </div>
  )
}
