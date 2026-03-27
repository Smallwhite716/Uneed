"use client"

import { Home, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/home", icon: Home, label: "首页" },
  { href: "/chat", icon: MessageCircle, label: "消息" },
  { href: "/profile", icon: User, label: "我的" }
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 px-4 pt-2 pb-2 z-50">
      <div className="flex items-center justify-around h-12">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
