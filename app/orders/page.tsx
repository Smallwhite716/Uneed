"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"
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
  pending: "bg-chart-3/10 text-chart-3",
  accepted: "bg-primary/10 text-primary",
  completed: "bg-accent/10 text-accent",
  cancelled: "bg-muted text-muted-foreground"
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
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="我的订单" />

      {/* Tabs */}
      <div className="sticky top-14 z-30 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "posted" | "accepted")}
                className={cn(
                  "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
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
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/post/${order.post.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[order.post.category]}
                          </Badge>
                          <Badge className={statusColors[order.status]}>
                            {statusLabels[order.status]}
                          </Badge>
                        </div>
                        <h3 className="font-medium line-clamp-1">{order.post.title}</h3>
                      </div>
                      {(order.post.reward || order.post.price) && (
                        <span className="text-primary font-bold whitespace-nowrap">
                          ¥{order.post.reward || order.post.price}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {order.post.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {order.createdAt}
                      </span>
                    </div>

                    {/* Actions based on status */}
                    {order.status === "pending" && activeTab === "posted" && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <Button variant="outline" size="sm" className="w-full">
                          取消订单
                        </Button>
                      </div>
                    )}
                    {order.status === "accepted" && (
                      <div className="mt-3 pt-3 border-t border-border flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          联系对方
                        </Button>
                        <Button size="sm" className="flex-1">
                          确认完成
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">暂无订单</p>
            <Link href="/home">
              <Button>去首页看看</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
