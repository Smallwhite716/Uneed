"use client"

import { useState } from "react"
import { PostCard } from "@/components/post-card"
import { BottomNav } from "@/components/bottom-nav"
import { FloatingButton } from "@/components/floating-button"
import { mockPosts } from "@/lib/mock-data"
import type { PostCategory } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const tabs: { key: PostCategory; label: string }[] = [
  { key: "express", label: "快递代取" },
  { key: "lostfound", label: "失物招领" },
  { key: "secondhand", label: "二手交易" }
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header - 小红书风格 */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 pt-safe">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-xl font-bold text-primary">Uneed</h1>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </div>
          </div>

          {/* 搜索框 - 点击搜索按钮展开 */}
          {showSearch && (
            <div className="pb-3">
              <Input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary border-0"
                autoFocus
              />
            </div>
          )}
        </div>
      </header>

      {/* 分类导航 - 小红书风格 */}
      <div className="sticky top-[calc(env(safe-area-inset-top)+56px)] z-30 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="max-w-md mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 py-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-all",
                  activeTab === tab.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="border-b border-border" />
      </div>

      {/* 排序选项 */}
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key)}
              className={cn(
                "text-sm transition-colors",
                sortBy === option.key
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 帖子列表 */}
      <main className="max-w-md mx-auto px-4 pb-4">
        <div className="space-y-4">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">暂无相关内容</p>
            </div>
          )}
        </div>
      </main>

      <FloatingButton />
      <BottomNav />
    </div>
  )
}
