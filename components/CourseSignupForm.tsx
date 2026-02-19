"use client"

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { validateEmail, validatePhone, ValidationError } from '@/lib/validation'

interface CourseSignupFormProps {
  courseId: string
  courseTitle: string
}

export default function CourseSignupForm({ courseId, courseTitle }: CourseSignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    background: '',
    motivation: '',
    experience: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.length > 100) return 'Name must be no more than 100 characters'
        return ''
      
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!validateEmail(value)) return 'Please enter a valid email address'
        return ''
      
      case 'phone':
        if (value && !validatePhone(value)) return 'Please enter a valid phone number'
        return ''
      
      case 'background':
        if (!value.trim()) return 'Background is required'
        if (value.trim().length < 20) return 'Please provide at least 20 characters'
        if (value.length > 1000) return 'Background must be no more than 1000 characters'
        return ''
      
      case 'experience':
        if (!value.trim()) return 'Experience is required'
        if (value.trim().length < 20) return 'Please provide at least 20 characters'
        if (value.length > 1000) return 'Experience must be no more than 1000 characters'
        return ''
      
      case 'motivation':
        if (!value.trim()) return 'Motivation is required'
        if (value.trim().length < 30) return 'Please provide at least 30 characters'
        if (value.length > 1500) return 'Motivation must be no more than 1500 characters'
        return ''
      
      default:
        return ''
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        errors[key] = error
      }
    })
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    setErrorMessage('')
    setFieldErrors({})

    // Client-side validation
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/course-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          courseId,
          courseTitle
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle validation errors from server
        if (data.details && Array.isArray(data.details)) {
          const serverErrors: Record<string, string> = {}
          data.details.forEach((error: ValidationError) => {
            serverErrors[error.field.toLowerCase()] = error.message
          })
          setFieldErrors(serverErrors)
          throw new Error(data.error || 'Validation failed')
        }
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        background: '',
        motivation: '',
        experience: ''
      })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setFieldErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const getCharacterCount = (field: keyof typeof formData, min: number, max: number) => {
    const length = formData[field].length
    const color = length < min ? 'text-red-500' : length > max * 0.9 ? 'text-yellow-600' : 'text-zinc-500'
    return (
      <span className={`text-xs ${color}`}>
        {length} / {max} characters {length < min && `(min: ${min})`}
      </span>
    )
  }

  const isSubmitSuccess = submitStatus === 'success'

  return (
    <div>
      {isSubmitSuccess ? (
        <div className="space-y-6">
          <div className="p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-green-800 dark:text-green-200 mb-4">
                  Thank you for registering for the free introduction class. We&apos;ll contact you shortly with:
                </p>
                <ul className="space-y-2 text-green-800 dark:text-green-200">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                    <span>Class schedule and meeting link</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                    <span>Course details and payment information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                    <span>What to prepare before the introduction session</span>
                  </li>
                </ul>
                <p className="text-sm text-green-700 dark:text-green-300 mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                  Check your email (including spam folder) for confirmation. If you don&apos;t receive it within 24 hours, please contact us.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitSuccess}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border ${fieldErrors.name ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Enter your full name"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitSuccess}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border ${fieldErrors.email ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="your.email@example.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number <span className="text-zinc-500 text-xs">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            disabled={isSubmitSuccess}
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border ${fieldErrors.phone ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="01234567890"
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="background" className="block text-sm font-medium mb-2">
            Educational/Professional Background <span className="text-red-500">*</span>
          </label>
          <textarea
            id="background"
            name="background"
            required
            disabled={isSubmitSuccess}
            value={formData.background}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={3}
            className={`w-full px-4 py-2 border ${fieldErrors.background ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Tell us about your educational background or current role"
          />
          <div className="mt-1 flex justify-between items-center">
            {fieldErrors.background ? (
              <p className="text-sm text-red-500">{fieldErrors.background}</p>
            ) : (
              <div></div>
            )}
            {getCharacterCount('background', 20, 1000)}
          </div>
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium mb-2">
            Programming Experience <span className="text-red-500">*</span>
          </label>
          <textarea
            id="experience"
            name="experience"
            required
            disabled={isSubmitSuccess}
            value={formData.experience}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={3}
            className={`w-full px-4 py-2 border ${fieldErrors.experience ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Describe your programming experience and familiarity with JavaScript"
          />
          <div className="mt-1 flex justify-between items-center">
            {fieldErrors.experience ? (
              <p className="text-sm text-red-500">{fieldErrors.experience}</p>
            ) : (
              <div></div>
            )}
            {getCharacterCount('experience', 20, 1000)}
          </div>
        </div>

        <div>
          <label htmlFor="motivation" className="block text-sm font-medium mb-2">
            Why do you want to join this course? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="motivation"
            name="motivation"
            required
            disabled={isSubmitSuccess}
            value={formData.motivation}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            className={`w-full px-4 py-2 border ${fieldErrors.motivation ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Share your motivation and what you hope to achieve"
          />
          <div className="mt-1 flex justify-between items-center">
            {fieldErrors.motivation ? (
              <p className="text-sm text-red-500">{fieldErrors.motivation}</p>
            ) : (
              <div></div>
            )}
            {getCharacterCount('motivation', 30, 1500)}
          </div>
        </div>

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200 font-medium">
              ✗ {errorMessage || 'Failed to submit the form. Please try again.'}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-4 rounded-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Register for Free Introduction Class (1 Hour)'
            )}
          </button>
          <p className="text-xs text-center text-zinc-600 dark:text-zinc-400">
            Free 1-hour introduction session • No payment required now • Payment details will be discussed in class
          </p>
        </div>
      </form>
      )}
    </div>
  )
}
