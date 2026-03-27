"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

export function FloatingButton() {
  return (
    <Link
      href="/create"
      className="absolute right-4 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all z-50"
      style={{ bottom: '72px' }}
    >
      <Plus className="w-6 h-6" />
    </Link>
  )
}
