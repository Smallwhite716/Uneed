"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  showBack?: boolean
  rightElement?: React.ReactNode
}

export function PageHeader({ title, showBack = true, rightElement }: PageHeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border px-4 pt-safe">
      <div className="max-w-md mx-auto flex items-center justify-between h-14">
        <div className="w-10">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-secondary"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
        </div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="w-10 flex justify-end">
          {rightElement}
        </div>
      </div>
    </header>
  )
}
