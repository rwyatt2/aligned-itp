import { useState, useCallback } from 'react'

export function useClipboard(timeout = 2000) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedValue(text)
      setTimeout(() => setCopiedValue(null), timeout)
      return true
    } catch {
      // Fallback for non-HTTPS
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedValue(text)
      setTimeout(() => setCopiedValue(null), timeout)
      return true
    }
  }, [timeout])

  return { copy, copiedValue }
}
