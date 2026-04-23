export type Messages = {
  role: "user" | "model"
  content: string
  type?: "error"
  image?: string // Base64 encoded image or image URL
}

export type Chat = {
  _id: string
  userId: string | null
  guestId: string | null
  title: string
  messages: Messages[]
}

export type ChatStore = {
  chats: Chat[]
  streaming: boolean
  newChatId: string | null 
  
  sendMessage: (
    message: string, 
    guestId: string, 
    model: string, 
    apiKey: string, 
    systemPrompt: string, 
    currentChatId: string | null, 
    signal?: AbortSignal
  ) => Promise<void>

  loadChat: () => void
  deleteChat: (chatId: string) => void
  renameChat: (chatId: string, title: string) => void
}

export type User = {
  _id: string
  name: string
  email: string
  profilePhoto?: string
}

export type AuthState = {
  user: User | null
  loading: boolean

  signup: (name: string, email: string, password: string) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  googleLogin: (idToken: string, user: { email: string; name: string; photoURL?: string }) => Promise<boolean>
  logout: () => Promise<void>
  me: () => Promise<void>
}