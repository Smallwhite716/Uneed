export type PostCategory = "express" | "lostfound" | "secondhand"

// 失物招领子类型
export type LostFoundSubType = "lost" | "found"

// 二手交易子类型
export type SecondhandSubType = "sell" | "buy"

// 帖子状态
export type PostStatus = "active" | "accepted" | "completed" | "cancelled"

// 信用等级
export type CreditLevel = "excellent" | "good" | "fair" | "poor"

export interface Post {
  id: string
  category: PostCategory
  subType?: LostFoundSubType | SecondhandSubType
  title: string
  description: string
  location: string
  time: string
  reward?: number
  price?: number
  images: string[]
  status: PostStatus
  publisher: {
    id: string
    name: string
    avatar: string
    university: string
    creditLevel: CreditLevel
  }
  acceptedBy?: {
    id: string
    name: string
    avatar: string
  }
}

export interface User {
  id: string
  name: string
  avatar: string
  phone: string
  university: string
  creditLevel: CreditLevel
  publishedCount: number
  completedCount: number
  receivedRatings: number
}

export type OrderStatus = "pending" | "accepted" | "completed" | "cancelled"

export interface Order {
  id: string
  post: Post
  status: OrderStatus
  createdAt: string
  role: "publisher" | "accepter"
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  isMe: boolean
}

export interface ChatConversation {
  id: string
  user: {
    id: string
    name: string
    avatar: string
  }
  lastMessage: string
  lastTime: string
  unread: number
  relatedPost?: Post
}

export interface Rating {
  id: string
  fromUser: {
    id: string
    name: string
    avatar: string
  }
  content: string
  rating: number
  createdAt: string
}

export interface OnboardingProfile {
  nickname: string
  university: string
  college: string
  grade: string
  avatar?: string
}
