"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center animate-bounce">
          <span className="text-5xl font-bold text-primary-foreground">U</span>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-4xl font-bold text-primary-foreground mb-2 tracking-tight">
        Uneed
      </h1>
      <p className="text-primary-foreground/80 text-sm mb-4">校园互助平台</p>

      {/* Tagline */}
      <p className="text-primary-foreground/60 text-sm">
        校园想要的，都在这里
      </p>

      {/* Loading dots */}
      <div className="absolute bottom-24">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-bounce" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  )
}
