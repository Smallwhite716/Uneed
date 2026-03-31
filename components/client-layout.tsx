"use client"

import { usePathname } from "next/navigation"
import { FloatingButton } from "@/components/floating-button"
import { BottomNav } from "@/components/bottom-nav"

const noNavPages = ["/chat/", "/post/", "/login", "/splash"]

export function ClientLayout() {
  const pathname = usePathname()

  // Check if current page should hide nav/fab
  const shouldHideNav = noNavPages.some(path => pathname.startsWith(path))

  if (shouldHideNav) {
    return null
  }

  return (
    <>
      <FloatingButton />
      <BottomNav />
    </>
  )
}
