export type Messages = { 
   role: 'user' | 'model' | 'error'
   content: string 
   type?: 'error'
}

export type Chat = {
  id: string
  title: string
  messages: Messages[]
  createdAt: number
}

export type DialogProps<T> = {
  title: string
  params: string
  value: T
  onSave: (val: T) => boolean | Promise<boolean>
  children: (value: T, setValue: (v: T) => void) => React.ReactNode
}