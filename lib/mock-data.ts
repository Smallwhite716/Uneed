import type { Post, User, Message, ChatConversation, CreditLevel, Order, Rating } from "./types"

export const creditLevelLabels: Record<CreditLevel, string> = {
  excellent: "信用优秀",
  good: "信用良好",
  fair: "信用及格",
  poor: "信用较差"
}

export const creditLevelColors: Record<CreditLevel, string> = {
  excellent: "text-accent",
  good: "text-primary",
  fair: "text-chart-3",
  poor: "text-destructive"
}

export const mockUser: User = {
  id: "user-1",
  name: "张小明",
  avatar: "/avatars/user1.jpg",
  phone: "138****8888",
  university: "北京大学",
  creditLevel: "good",
  publishedCount: 2,
  completedCount: 0,
  receivedRatings: 2
}

export const mockPosts: Post[] = [
  {
    id: "post-1",
    category: "express",
    title: "顺丰快递代取 - 东门菜鸟驿站",
    description: "帮忙取一个中等大小的包裹，东门菜鸟驿站，取件码稍后私聊发送。",
    location: "东门菜鸟驿站",
    time: "10分钟前",
    reward: 5,
    images: [],
    status: "active",
    publisher: {
      id: "user-2",
      name: "李小红",
      avatar: "/avatars/user2.jpg",
      university: "北京大学",
      creditLevel: "excellent"
    }
  },
  {
    id: "post-2",
    category: "lostfound",
    subType: "lost",
    title: "寻找丢失的校园卡",
    description: "今天下午在图书馆三楼自习区丢失校园卡一张，上面有我的照片和姓名，如有拾到请联系我，必有酬谢！",
    location: "图书馆三楼",
    time: "30分钟前",
    reward: 20,
    images: [],
    status: "active",
    publisher: {
      id: "user-3",
      name: "王小华",
      avatar: "/avatars/user3.jpg",
      university: "北京大学",
      creditLevel: "good"
    }
  },
  {
    id: "post-3",
    category: "secondhand",
    subType: "sell",
    title: "95新 MacBook Pro 2023款",
    description: "自用MacBook Pro 14寸，M3芯片，16GB内存，512GB存储，配件齐全，有原装充电器和保护壳。因换新出售。",
    location: "西门宿舍楼",
    time: "1小时前",
    price: 12000,
    images: [],
    status: "active",
    publisher: {
      id: "user-4",
      name: "赵小刚",
      avatar: "/avatars/user4.jpg",
      university: "北京大学",
      creditLevel: "excellent"
    }
  },
  {
    id: "post-4",
    category: "express",
    title: "京东快递代取 - 南门快递柜",
    description: "南门快递柜有个大件包裹，本人有事走不开，求帮忙代取。",
    location: "南门快递柜",
    time: "2小时前",
    reward: 8,
    images: [],
    status: "active",
    publisher: {
      id: "user-5",
      name: "孙小芳",
      avatar: "/avatars/user5.jpg",
      university: "北京大学",
      creditLevel: "good"
    }
  },
  {
    id: "post-5",
    category: "lostfound",
    subType: "found",
    title: "捡到一把钥匙",
    description: "在食堂门口捡到一串钥匙，有三把钥匙和一个小挂件，失主请联系认领。",
    location: "第一食堂门口",
    time: "3小时前",
    images: [],
    status: "active",
    publisher: {
      id: "user-6",
      name: "周小雨",
      avatar: "/avatars/user6.jpg",
      university: "北京大学",
      creditLevel: "good"
    }
  },
  {
    id: "post-6",
    category: "secondhand",
    subType: "sell",
    title: "全新未拆封 AirPods Pro 2",
    description: "全新未拆封，官网购入有发票，因为已经有一个了所以转让。",
    location: "北门附近",
    time: "4小时前",
    price: 1500,
    images: [],
    status: "active",
    publisher: {
      id: "user-7",
      name: "吴小梅",
      avatar: "/avatars/user7.jpg",
      university: "北京大学",
      creditLevel: "excellent"
    }
  },
  {
    id: "post-7",
    category: "secondhand",
    subType: "buy",
    title: "求购二手自行车",
    description: "求购一辆二手自行车，代步用，价格合适就行，最好是山地车或者公路车。",
    location: "全校区",
    time: "5小时前",
    price: 300,
    images: [],
    status: "active",
    publisher: {
      id: "user-8",
      name: "郑小龙",
      avatar: "/avatars/user8.jpg",
      university: "北京大学",
      creditLevel: "fair"
    }
  },
  // 用户自己发布的帖子
  {
    id: "post-my-1",
    category: "express",
    title: "中通快递代取 - 西门驿站",
    description: "西门驿站有个快递，下午6点前需要取到。",
    location: "西门驿站",
    time: "昨天",
    reward: 5,
    images: [],
    status: "accepted",
    publisher: {
      id: "user-1",
      name: "张小明",
      avatar: "/avatars/user1.jpg",
      university: "北京大学",
      creditLevel: "good"
    },
    acceptedBy: {
      id: "user-2",
      name: "李小红",
      avatar: "/avatars/user2.jpg"
    }
  },
  {
    id: "post-my-2",
    category: "lostfound",
    subType: "lost",
    title: "寻找丢失的耳机",
    description: "在操场丢失一副黑色无线耳机。",
    location: "操场",
    time: "2天前",
    reward: 30,
    images: [],
    status: "completed",
    publisher: {
      id: "user-1",
      name: "张小明",
      avatar: "/avatars/user1.jpg",
      university: "北京大学",
      creditLevel: "good"
    }
  }
]

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "user-2",
    content: "你好，我接了你的快递代取订单",
    timestamp: "14:30",
    isMe: false
  },
  {
    id: "msg-2",
    senderId: "user-1",
    content: "好的，取件码是 3-5-8-2-1",
    timestamp: "14:31",
    isMe: true
  },
  {
    id: "msg-3",
    senderId: "user-2",
    content: "收到，我现在就去取",
    timestamp: "14:32",
    isMe: false
  },
  {
    id: "msg-4",
    senderId: "user-1",
    content: "谢谢！",
    timestamp: "14:33",
    isMe: true
  },
  {
    id: "msg-5",
    senderId: "user-2",
    content: "已经取到了，你在哪里？我送过去",
    timestamp: "14:45",
    isMe: false
  }
]

export const mockConversations: ChatConversation[] = [
  {
    id: "conv-1",
    user: {
      id: "user-2",
      name: "李小红",
      avatar: "/avatars/user2.jpg"
    },
    lastMessage: "已经取到了，你在哪里？我送过去",
    lastTime: "14:45",
    unread: 1,
    relatedPost: mockPosts.find(p => p.id === "post-my-1")
  },
  {
    id: "conv-2",
    user: {
      id: "user-4",
      name: "赵小刚",
      avatar: "/avatars/user4.jpg"
    },
    lastMessage: "MacBook 还在吗？",
    lastTime: "昨天",
    unread: 0
  },
  {
    id: "conv-3",
    user: {
      id: "user-6",
      name: "周小雨",
      avatar: "/avatars/user6.jpg"
    },
    lastMessage: "好的，谢谢你找到我的钥匙！",
    lastTime: "3天前",
    unread: 0
  }
]

// 用户接的单（帮别人完成的）
export const mockAcceptedPosts: Post[] = [
  {
    ...mockPosts[0],
    id: "accepted-1",
    status: "completed",
    acceptedBy: {
      id: "user-1",
      name: "张小明",
      avatar: "/avatars/user1.jpg"
    }
  },
  {
    ...mockPosts[3],
    id: "accepted-2",
    status: "accepted",
    acceptedBy: {
      id: "user-1",
      name: "张小明",
      avatar: "/avatars/user1.jpg"
    }
  }
]

export const mockOrders: Order[] = [
  {
    id: "order-1",
    post: mockPosts.find((p) => p.id === "post-my-1")!,
    status: "accepted",
    createdAt: "今天 14:30",
    role: "publisher"
  },
  {
    id: "order-2",
    post: mockPosts.find((p) => p.id === "post-my-2")!,
    status: "completed",
    createdAt: "2天前",
    role: "publisher"
  },
  {
    id: "order-3",
    post: mockAcceptedPosts[0],
    status: "completed",
    createdAt: "昨天 16:20",
    role: "accepter"
  },
  {
    id: "order-4",
    post: mockAcceptedPosts[1],
    status: "accepted",
    createdAt: "今天 09:10",
    role: "accepter"
  }
]

export const mockRatings: Rating[] = [
  {
    id: "rating-1",
    fromUser: {
      id: "user-2",
      name: "李小红",
      avatar: "/avatars/user2.jpg"
    },
    content: "沟通很顺畅，描述清晰，交接很快。",
    rating: 5,
    createdAt: "昨天"
  },
  {
    id: "rating-2",
    fromUser: {
      id: "user-6",
      name: "周小雨",
      avatar: "/avatars/user6.jpg"
    },
    content: "人很好，位置说得很清楚，五星好评。",
    rating: 5,
    createdAt: "3天前"
  }
]
