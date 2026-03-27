"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockOrders } from "@/lib/mock-data"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"

const tabs = [
  { key: "posted", label: "我发布的" },
  { key: "accepted", label: "我接的单" }
]

const statusLabels = {
  pending: "待接单",
  accepted: "进行中",
  completed: "已完成",
  cancelled: "已取消"
}

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-600 border-0",
  accepted: "bg-primary/10 text-primary border-0",
  completed: "bg-green-500/10 text-green-600 border-0",
  cancelled: "bg-muted text-muted-foreground border-0"
}

const categoryLabels = {
  express: "快递代取",
  lostfound: "失物招领",
  secondhand: "二手交易"
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"posted" | "accepted">("posted")

  // For demo purposes, show different orders based on tab
  const orders = activeTab === "posted"
    ? mockOrders
    : mockOrders.filter(o => o.status === "accepted" || o.status === "completed")

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
      <PageHeader title="我的订单" />

      {/* Tabs */}
      <div className="sticky top-14 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-md mx-auto px-4">
          <div className="flex rounded-xl p-1 bg-secondary/50 my-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "posted" | "accepted")}
                className={cn(
                  "flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  activeTab === tab.key
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <main className="max-w-md mx-auto px-4 py-4">
        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link key={order.id} href={`/post/${order.post.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all bg-card/80 backdrop-blur border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs font-medium">
                            {categoryLabels[order.post.category]}
                          </Badge>
                          <Badge className={cn("text-xs font-medium", statusColors[order.status])}>
                            {statusLabels[order.status]}
                          </Badge>
                        </div>
                        <h3 className="font-semibold line-clamp-1 text-foreground">{order.post.title}</h3>
                      </div>
                      {(order.post.reward || order.post.price) && (
                        <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent whitespace-nowrap">
                          ¥{order.post.reward || order.post.price}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />
                        {order.post.location}
                      </span>
                      <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        {order.createdAt}
                      </span>
                    </div>

                    {/* Actions based on status */}
                    {order.status === "pending" && activeTab === "posted" && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <Button variant="outline" size="sm" className="w-full rounded-xl text-destructive hover:text-destructive hover:bg-destructive/5">
                          取消订单
                        </Button>
                      </div>
                    )}
                    {order.status === "accepted" && (
                      <div className="mt-3 pt-3 border-t border-border/50 flex gap-2">
                        <Link href="/chat/conv-1" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full rounded-xl">
                            联系对方
                          </Button>
                        </Link>
                        <Link href="/rating" className="flex-1">
                          <Button size="sm" className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/20">
                            确认完成
                          </Button>
                        </Link>
                      </div>
                    )}
                    {order.status === "completed" && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <Link href="/rating">
                          <Button variant="outline" size="sm" className="w-full rounded-xl">
                            查看评价
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">暂无订单</p>
            <Link href="/home">
              <Button className="rounded-xl bg-gradient-to-r from-primary to-primary/90">去首页看看</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
