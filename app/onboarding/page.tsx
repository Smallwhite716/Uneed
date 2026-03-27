"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-xl font-semibold">完善个人资料</h1>
          <p className="text-sm text-muted-foreground">首次登录需填写以下信息</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="昵称*" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <Input placeholder="学校*" value={university} onChange={(e) => setUniversity(e.target.value)} />
          <Input placeholder="学院*" value={college} onChange={(e) => setCollege(e.target.value)} />
          <Input placeholder="年级*" value={grade} onChange={(e) => setGrade(e.target.value)} />
          <Input
            placeholder="头像 URL（选填）"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Button className="w-full" onClick={handleSubmit} disabled={!canSubmit}>
            保存并进入 Uneed
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
