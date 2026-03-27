"use client"

import Link from "next/link"
import { ChevronRight, HelpCircle, MessageSquareWarning, Shield, UserCircle, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
      <PageHeader title="设置" />
      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Profile Section */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur overflow-hidden">
          <CardContent className="p-0">
            <Link href="/settings/profile" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <UserCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">编辑个人资料</p>
                  <p className="text-xs text-muted-foreground">修改昵称、学校等信息</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur overflow-hidden">
          <CardContent className="p-0">
            <Link href="/settings/help" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">帮助中心</p>
                  <p className="text-xs text-muted-foreground">常见问题与解答</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="/settings/feedback" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chart-3/20 to-chart-3/10 flex items-center justify-center">
                  <MessageSquareWarning className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="font-medium">反馈建议</p>
                  <p className="text-xs text-muted-foreground">告诉我们您的想法</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="/settings/privacy" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">隐私与账号</p>
                  <p className="text-xs text-muted-foreground">通知设置与安全选项</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur overflow-hidden">
          <CardContent className="p-0">
            <Link href="#" className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                  <Info className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">关于我们</p>
                  <p className="text-xs text-muted-foreground">了解 Uneed</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>

        {/* Version */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">Uneed v1.0.0 Demo</p>
        </div>
      </main>
    </div>
  )
}
