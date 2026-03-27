"use client"

import Link from "next/link"
import { ChevronRight, HelpCircle, MessageSquareWarning, Shield, UserCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="设置" />
      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        <Card>
          <CardContent className="p-0">
            <Link href="/onboarding" className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <UserCircle className="w-5 h-5 text-muted-foreground" />
                <span>编辑个人资料</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
            <button className="w-full flex items-center justify-between p-4 border-b border-border text-left">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <span>帮助中心</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border-b border-border text-left">
              <div className="flex items-center gap-3">
                <MessageSquareWarning className="w-5 h-5 text-muted-foreground" />
                <span>反馈建议</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span>隐私与账号</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
