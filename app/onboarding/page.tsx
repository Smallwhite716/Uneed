"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Camera, User, GraduationCap, MapPin, Sparkles } from "lucide-react"
import { saveProfile } from "@/lib/demo-storage"

export default function OnboardingPage() {
  const router = useRouter()
  const [nickname, setNickname] = useState("")
  const [university, setUniversity] = useState("")
  const [college, setCollege] = useState("")
  const [grade, setGrade] = useState("")
  const [avatar, setAvatar] = useState("")

  const canSubmit = nickname && university && college && grade

  const handleSubmit = () => {
    if (!canSubmit) return
    saveProfile({ nickname, university, college, grade, avatar })
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 mb-4">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">欢迎加入 Uneed</h1>
          <p className="text-muted-foreground text-sm">请完善您的个人信息</p>
        </div>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Avatar className="w-24 h-24 ring-4 ring-primary/10">
              {avatar ? (
                <img src={avatar} alt={nickname} className="w-full h-full object-cover rounded-full" />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-3xl font-bold">
                  {nickname?.slice(0, 1) || "?"}
                </AvatarFallback>
              )}
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                昵称 <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="请输入昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                学校 <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="请输入学校名称"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                学院 <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="请输入学院"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <span className="w-4 h-4 text-muted-foreground flex items-center justify-center text-xs font-bold">级</span>
                年级 <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="如：2023级"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>

            <Button
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20 text-base font-medium mt-6"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              开始使用 Uneed
            </Button>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-6">
          点击"开始使用"即表示您同意我们的<br />
          <span className="text-primary cursor-pointer font-medium">《用户协议》</span> 和 <span className="text-primary cursor-pointer font-medium">《隐私政策》</span>
        </p>
      </div>
    </div>
  )
}
