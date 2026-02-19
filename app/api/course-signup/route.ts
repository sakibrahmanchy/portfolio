import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateCourseSignup, sanitizeString } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate all required fields
    const validation = validateCourseSignup(body)
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.errors
        },
        { status: 400 }
      )
    }

    const { name, email, phone, background, motivation, experience, courseId, courseTitle } = body

    // Sanitize input data
    const sanitizedData = {
      name: sanitizeString(name),
      email: sanitizeString(email.toLowerCase()),
      phone: phone ? sanitizeString(phone) : '',
      background: sanitizeString(background),
      motivation: sanitizeString(motivation),
      experience: sanitizeString(experience),
      course_id: sanitizeString(courseId),
      course_title: sanitizeString(courseTitle),
    }

    // Check for duplicate submission (same email for same course)
    const existingSignup = await prisma.courseSignup.findFirst({
      where: {
        email: sanitizedData.email,
        course_id: sanitizedData.course_id,
      },
    })

    if (existingSignup) {
      return NextResponse.json(
        { error: 'You have already submitted an application for this course' },
        { status: 409 }
      )
    }

    // Create signup
    const signup = await prisma.courseSignup.create({
      data: sanitizedData,
    })

    return NextResponse.json(
      { 
        message: 'Signup successful',
        id: signup.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing signup:', error)
    
    // Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'A signup with this information already exists' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const courseId = searchParams.get('courseId')

    const signups = await prisma.courseSignup.findMany({
      where: courseId ? { course_id: courseId } : undefined,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        course_id: true,
        course_title: true,
        name: true,
        email: true,
        phone: true,
        background: true,
        motivation: true,
        experience: true,
        created_at: true,
      }
    })

    return NextResponse.json({ signups, count: signups.length }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching signups:', error.message)
    return NextResponse.json(
      { error: 'Failed to fetch signups' },
      { status: 500 }
    )
  }
}
