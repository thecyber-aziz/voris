import { useEffect, useRef, useState } from 'react'
import { Image } from 'lucide-react'
import { MODELS } from '../constants/models'

export default function InputBox({ inputValue, setInputValue, handleSend, handleAbort, model, setModel, activeMessages, isLoading }: any) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [hasImage, setHasImage] = useState(false)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024
      if (file.size > maxSizeInBytes) {
        alert('Image size must be less than 5MB')
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }

      // Convert to base64
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64Image = event.target?.result as string
        // Store in a temporary state or directly add to message
        // For now, we'll prepend it to the input as a way to send with the next message
        sessionStorage.setItem('pendingImage', base64Image)
        setHasImage(true)
        console.log('Image uploaded and ready to send')
      }
      reader.readAsDataURL(file)
    }
    // Reset input
    e.target.value = ''
  }

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = 'auto'
    ref.current.style.height = Math.min(ref.current.scrollHeight, 10 * 24) + 'px'
  }, [inputValue])

  // Monitor for image sent and clear the hasImage state
  useEffect(() => {
    const checkImage = () => {
      const pendingImage = sessionStorage.getItem('pendingImage')
      if (!pendingImage && hasImage) {
        setHasImage(false)
      }
    }
    const interval = setInterval(checkImage, 100)
    return () => clearInterval(interval)
  }, [hasImage])

  return (
    <div className={`fixed z-10 w-full max-w-3xl px-4 md:p-0 transition-all duration-300
      ${activeMessages.length ? 'bottom-0' : 'top-1/2 -translate-y-1/2'}
    `}>
      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-end gap-2">
          {/* Textarea */}
          <div className="flex-1">
            <textarea 
              ref={ref}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)
                if (e.key === 'Enter' && !e.shiftKey && !isMobile) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="How can I help you?"
              rows={1}
              className="w-full focus:outline-none resize-none overflow-y-scroll overflow-hidden font-light"
            />
          </div>
        </div>

        {/* Image Preview */}
        {hasImage && (
          <div className="mt-2 text-xs text-green-600 flex items-center gap-2">
            <Image size={14} />
            Image ready to send
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        <div className="mt-3 flex items-center justify-between gap-2">
          {/* Photo Upload Button - Left Side */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 flex-shrink-0"
            title="Upload photo"
          >
            <Image strokeWidth={1.5} size={20} />
          </button>

          {/* Model Selector and Send Button - Right Side */}
          <div className='flex items-center gap-2'>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="text-xs text-gray-500 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              {MODELS.map((m) => <option key={m.value} value={m.value}>{m.label}</option> )}
            </select>

            <button
              onClick={isLoading ? handleAbort : handleSend}
              className={`rounded-full p-1.5 cursor-pointer hover:bg-zinc-600 disabled:opacity-50 ${
                isLoading ? 'bg-black' : 'bg-black'
              }`}
              disabled={!inputValue && !isLoading}
            >
              {isLoading ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-4 text-white">
                  <rect x="6" y="6" width="12" height="12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500 text-center py-2 font-light"><mark className='text-black bg-transparent'>Voris</mark> can make mistakes, So study hard and make your own better LLM.</p>
    </div>
  )
}
