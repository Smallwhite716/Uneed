"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, Bell, Smartphone, LogOut, ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"

export default function PrivacyPage() {
  const [notifications, setNotifications] = useState({
    push: true,
    chat: true,
    order: true,
    marketing: false
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
      <PageHeader title="隐私与账号" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Privacy & Security */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground px-1">隐私与安全</label>
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur overflow-hidden">
            <CardContent className="p-0 divide-y divide-border/50">
              <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">账号安全</p>
                    <p className="text-xs text-muted-foreground">绑定手机号修改密码</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">隐私设置</p>
                    <p className="text-xs text-muted-foreground">控制谁可以看到您的信息</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-chart-3/10 flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-chart-3" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">设备管理</p>
                    <p className="text-xs text-muted-foreground">查看登录设备</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground px-1">通知设置</label>
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur overflow-hidden">
            <CardContent className="p-0 divide-y divide-border/50">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">推送通知</p>
                    <p className="text-xs text-muted-foreground">接收系统通知</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">消息通知</p>
                    <p className="text-xs text-muted-foreground">新聊天消息提醒</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.chat}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, chat: checked }))}
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-chart-3/10 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-chart-3" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">订单通知</p>
                    <p className="text-xs text-muted-foreground">订单状态变更提醒</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.order}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, order: checked }))}
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">优惠活动</p>
                    <p className="text-xs text-muted-foreground">促销和优惠信息</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground px-1">法律条款</label>
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur overflow-hidden">
            <CardContent className="p-0 divide-y divide-border/50">
              <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                <span className="font-medium text-sm">用户协议</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                <span className="font-medium text-sm">隐私政策</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                <span className="font-medium text-sm">第三方信息共享</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Account */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground px-1">账号管理</label>
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur overflow-hidden">
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors text-destructive">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-destructive" />
                  </div>
                  <p className="font-medium text-sm">退出登录</p>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <Badge variant="outline" className="text-xs">Uneed v1.0.0 Demo</Badge>
        </div>
      </main>
    </div>
  )
}
