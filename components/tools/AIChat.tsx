'use client'

import { useState, useContext, useRef, useEffect } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { chatWithAI } from '@/lib/api-utils'
import { Send, Trash2, AlertCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: number
}

export default function AIChat() {
  const { language } = useContext(LanguageContext)
  const t = language === 'ar' ? require('@/contexts/LanguageContext').translations.ar : require('@/contexts/LanguageContext').translations.en
  
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const response = await chatWithAI(input)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message || response.content || JSON.stringify(response),
        sender: 'ai',
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err: any) {
      setError(err.message || (language === 'ar' ? 'حدث خطأ في الرد' : 'Error in response'))
      console.error('[v0] AI Chat error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClearChat = () => {
    if (confirm(language === 'ar' ? 'هل تريد حذف المحادثة؟' : 'Clear chat history?')) {
      setMessages([])
      setError('')
    }
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors flex flex-col h-96">
      <h3 className="text-lg font-semibold mb-2 text-foreground">{t.tools.aichat.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t.tools.aichat.description}</p>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto bg-background/50 rounded-lg p-4 mb-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            {language === 'ar' ? 'ابدأ المحادثة...' : 'Start a conversation...'}
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-lg text-sm bg-muted text-muted-foreground">
              <span className="animate-spin inline-block">⏳</span> {t.common.loading}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-destructive text-xs bg-destructive/10 p-2 rounded">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-destructive text-xs bg-destructive/10 p-2 rounded mb-3">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}

      {/* Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t.tools.aichat.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            size="icon"
            variant="default"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {messages.length > 0 && (
          <Button
            onClick={handleClearChat}
            variant="ghost"
            size="sm"
            className="w-full gap-2 text-xs"
          >
            <Trash2 className="w-3 h-3" />
            {t.tools.aichat.clear}
          </Button>
        )}
      </div>
    </div>
  )
}
