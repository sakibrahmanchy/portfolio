export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true // Phone is optional
  // Allow various phone formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function validateRequired(value: string, fieldName: string): ValidationError | null {
  if (!value || value.trim().length === 0) {
    return {
      field: fieldName,
      message: `${fieldName} is required`
    }
  }
  return null
}

export function validateMinLength(value: string, minLength: number, fieldName: string): ValidationError | null {
  if (value && value.trim().length < minLength) {
    return {
      field: fieldName,
      message: `${fieldName} must be at least ${minLength} characters`
    }
  }
  return null
}

export function validateMaxLength(value: string, maxLength: number, fieldName: string): ValidationError | null {
  if (value && value.length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName} must be no more than ${maxLength} characters`
    }
  }
  return null
}

export interface CourseSignupData {
  courseId: string
  courseTitle: string
  name: string
  email: string
  phone?: string
  background: string
  motivation: string
  experience: string
}

export function validateCourseSignup(data: Partial<CourseSignupData>): ValidationResult {
  const errors: ValidationError[] = []

  // Course ID validation
  const courseIdError = validateRequired(data.courseId || '', 'Course ID')
  if (courseIdError) errors.push(courseIdError)

  // Course Title validation
  const courseTitleError = validateRequired(data.courseTitle || '', 'Course Title')
  if (courseTitleError) errors.push(courseTitleError)

  // Name validation
  const nameError = validateRequired(data.name || '', 'Name')
  if (nameError) {
    errors.push(nameError)
  } else {
    const nameMinError = validateMinLength(data.name || '', 2, 'Name')
    if (nameMinError) errors.push(nameMinError)
    
    const nameMaxError = validateMaxLength(data.name || '', 100, 'Name')
    if (nameMaxError) errors.push(nameMaxError)
  }

  // Email validation
  const emailError = validateRequired(data.email || '', 'Email')
  if (emailError) {
    errors.push(emailError)
  } else {
    if (!validateEmail(data.email || '')) {
      errors.push({
        field: 'email',
        message: 'Please enter a valid email address'
      })
    }
  }

  // Phone validation (optional)
  if (data.phone && !validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Please enter a valid phone number'
    })
  }

  // Background validation
  const backgroundError = validateRequired(data.background || '', 'Background')
  if (backgroundError) {
    errors.push(backgroundError)
  } else {
    const backgroundMinError = validateMinLength(data.background || '', 20, 'Background')
    if (backgroundMinError) errors.push(backgroundMinError)
    
    const backgroundMaxError = validateMaxLength(data.background || '', 1000, 'Background')
    if (backgroundMaxError) errors.push(backgroundMaxError)
  }

  // Experience validation
  const experienceError = validateRequired(data.experience || '', 'Experience')
  if (experienceError) {
    errors.push(experienceError)
  } else {
    const experienceMinError = validateMinLength(data.experience || '', 20, 'Experience')
    if (experienceMinError) errors.push(experienceMinError)
    
    const experienceMaxError = validateMaxLength(data.experience || '', 1000, 'Experience')
    if (experienceMaxError) errors.push(experienceMaxError)
  }

  // Motivation validation
  const motivationError = validateRequired(data.motivation || '', 'Motivation')
  if (motivationError) {
    errors.push(motivationError)
  } else {
    const motivationMinError = validateMinLength(data.motivation || '', 30, 'Motivation')
    if (motivationMinError) errors.push(motivationMinError)
    
    const motivationMaxError = validateMaxLength(data.motivation || '', 1500, 'Motivation')
    if (motivationMaxError) errors.push(motivationMaxError)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, ' ')
}
