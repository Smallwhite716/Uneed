"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Smartphone, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { isProfileCompleted } from "@/lib/demo-storage"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleGetCode = () => {
    if (phone.length === 11) {
      setCodeSent(true)
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const handleLogin = () => {
    if (code.length < 4) return
    router.push(isProfileCompleted() ? "/home" : "/onboarding")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 mb-4">
            <span className="text-3xl font-bold text-primary-foreground">U</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Uneed
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">校园互助平台</p>
        </div>

        <Card className="border-0 shadow-xl shadow-black/5 bg-card/80 backdrop-blur">
          <CardHeader className="pb-4">
            <h2 className="text-xl font-semibold text-center">登录 / 注册</h2>
            <p className="text-xs text-center text-muted-foreground">首次登录即自动注册</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Phone Input */}
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl"
                maxLength={11}
              />
            </div>

            {/* Verification Code */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl"
                  maxLength={6}
                />
              </div>
              <Button
                variant="outline"
                className="h-12 px-4 whitespace-nowrap rounded-xl border-2 hover:border-primary hover:bg-primary/5"
                onClick={handleGetCode}
                disabled={phone.length !== 11 || countdown > 0}
              >
                {countdown > 0 ? `${countdown}s` : "获取验证码"}
              </Button>
            </div>

            {/* Login Button */}
            <Button
              className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20"
              onClick={handleLogin}
              disabled={phone.length !== 11 || code.length < 4}
            >
              登录 / 注册 (Demo)
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground mt-4">
              登录即表示您同意
              <span className="text-primary cursor-pointer font-medium">《用户协议》</span>
              和
              <span className="text-primary cursor-pointer font-medium">《隐私政策》</span>
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card/50 backdrop-blur">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">快递代取</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card/50 backdrop-blur">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">失物招领</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card/50 backdrop-blur">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-chart-3/20 to-chart-3/5 flex items-center justify-center">
              <span className="text-2xl">🛒</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">二手交易</span>
          </div>
        </div>
      </div>
    </div>
  )
}
