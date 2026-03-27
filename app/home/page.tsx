"use client"

import { useState } from "react"
import { PostCard } from "@/components/post-card"
import { mockPosts } from "@/lib/mock-data"
import type { PostCategory } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const tabs: { key: PostCategory; label: string; emoji: string }[] = [
  { key: "express", label: "快递代取", emoji: "📦" },
  { key: "lostfound", label: "失物招领", emoji: "🔍" },
  { key: "secondhand", label: "二手交易", emoji: "🛒" }
]

const sortOptions = [
  { key: "latest", label: "最新发布" },
  { key: "nearest", label: "离我最近" }
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<PostCategory>("express")
  const [sortBy, setSortBy] = useState("latest")
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = post.category === activeTab
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // 模拟距离排序
  const sortedPosts = sortBy === "nearest"
    ? [...filteredPosts].sort((a, b) => {
        const distA = parseFloat(a.location.replace(/[^0-9.]/g, '')) || 999
        const distB = parseFloat(b.location.replace(/[^0-9.]/g, '')) || 999
        return distA - distB
      })
    : filteredPosts

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 via-background to-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50 px-4 pt-safe">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">U</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Uneed
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary/80 transition-colors"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className={cn("w-5 h-5 transition-transform", showSearch && "rotate-12")} />
              </Button>
              <Button variant="ghost" size="icon" className="relative hover:bg-secondary/80 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              </Button>
            </div>
          </div>

          {/* 搜索框 - 点击搜索按钮展开 */}
          {showSearch && (
            <div className="pb-3 animate-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="搜索标题或描述..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary/50 border-0 rounded-xl h-10"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 分类导航 - 玻璃态风格 */}
      <div className="sticky top-[calc(env(safe-area-inset-top)+56px)] z-30 bg-card/60 backdrop-blur-xl">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex gap-2 p-1 rounded-2xl bg-secondary/50">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  activeTab === tab.key
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-base">{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 排序选项 */}
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full transition-all duration-200",
                sortBy === option.key
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-secondary/50"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 帖子列表 */}
      <main className="max-w-md mx-auto px-4 pb-4">
        <div className="space-y-4 pt-2">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
              <p className="text-muted-foreground">暂无相关内容</p>
              <p className="text-xs text-muted-foreground/70 mt-1">试试其他分类或关键词</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
