"use client"

import type { OnboardingProfile } from "@/lib/types"

const PROFILE_KEY = "uneed_profile"
const PROFILE_DONE_KEY = "uneed_profile_done"

export function isProfileCompleted() {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(PROFILE_DONE_KEY) === "1"
}

export function saveProfile(profile: OnboardingProfile) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  window.localStorage.setItem(PROFILE_DONE_KEY, "1")
}

export function getProfile(): OnboardingProfile | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(PROFILE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as OnboardingProfile
  } catch {
    return null
  }
}
