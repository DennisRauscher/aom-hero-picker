'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Mail } from 'lucide-react'

interface EmailPopupProps {
  onClose: () => void
  onSubmissionSuccess: () => void
}

export function EmailPopup({ onClose, onSubmissionSuccess }: EmailPopupProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      onSubmissionSuccess()

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Subscription failed')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Whats new?</h3>
        <p className="text-gray-200 mb-4">
          Get the latest Age of Mythology strategies, god updates, and exclusive content delivered straight to your inbox!
        </p>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full pl-10 pr-4 py-2 bg-indigo-700 text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              disabled={isSubmitting}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-500 text-indigo-900 font-bold rounded-md hover:bg-yellow-400 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
          </motion.button>
        </form>
        {submitStatus === 'success' && (
          <p className="text-green-400 mt-2">Subscription successful!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-400 mt-2">Subscription failed. Please try again.</p>
        )}
        <p className="text-xs text-gray-300 mt-4">
          By subscribing, you agree to our privacy policy and terms of service.
        </p>
      </div>
    </motion.div>
  )
}