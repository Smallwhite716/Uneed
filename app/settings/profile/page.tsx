"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, User, GraduationCap, MapPin, Phone } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { getProfile, saveProfile } from "@/lib/demo-storage"

export default function EditProfilePage() {
  const router = useRouter()
  const profile = getProfile()

  const [nickname, setNickname] = useState(profile?.nickname || "")
  const [university, setUniversity] = useState(profile?.university || "")
  const [college, setCollege] = useState(profile?.college || "")
  const [grade, setGrade] = useState(profile?.grade || "")
  const [avatar, setAvatar] = useState(profile?.avatar || "")

  const canSubmit = nickname && university && college && grade

  const handleSubmit = () => {
    if (!canSubmit) return
    saveProfile({ nickname, university, college, grade, avatar })
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-8">
      <PageHeader title="编辑资料" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Avatar Section */}
        <div className="flex flex-col items-center py-6">
          <div className="relative">
            <Avatar className="w-24 h-24 ring-4 ring-primary/10">
              <AvatarImage src={avatar || "/placeholder-user.jpg"} alt={nickname} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-3xl font-bold">
                {nickname?.slice(0, 1) || "U"}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">点击更换头像</p>
        </div>

        {/* Form */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                昵称
              </label>
              <Input
                placeholder="请输入昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                学校
              </label>
              <Input
                placeholder="请输入学校名称"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                学院
              </label>
              <Input
                placeholder="请输入学院"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <span className="w-4 h-4 text-muted-foreground flex items-center justify-center text-xs">级</span>
                年级
              </label>
              <Input
                placeholder="如：2023级"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0"
              />
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          保存修改
        </Button>
      </main>
    </div>
  )
}
