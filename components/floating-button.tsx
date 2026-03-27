"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

export function FloatingButton() {
  return (
    <Link
      href="/create"
      className="fixed bottom-24 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
    >
      <Plus className="w-7 h-7" />
    </Link>
  )
}
