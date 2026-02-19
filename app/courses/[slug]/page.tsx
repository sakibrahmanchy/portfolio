import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getCourseBySlug, getAllCourses, Course } from '@/lib/courses'
import { Calendar, Clock, ArrowLeft, Github, Linkedin, Mail, CreditCard } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CourseContent from '@/components/CourseContent'
import CourseSignupForm from '@/components/CourseSignupForm'
import { YOE } from '@/lib/constants'

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const courses = getAllCourses()
  return courses.map((course: Course) => ({
    slug: course.slug,
  }))
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: `${course.title} | Sakibur Rahaman`,
    description: course.description,
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  const tabs = [
    {
      id: 'about',
      label: 'About the Course',
      content: (
        <div className="space-y-8">
          {/* Instructor Profile */}
          <section className="relative pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            <div className="pl-6">
              <h2 className="text-xl font-display font-bold mb-4">Your Instructor</h2>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden ring-4 ring-primary/20 shadow-lg flex-shrink-0">
                  <Image
                    src="/sakibur.png"
                    alt="Sakibur Rahaman"
                    fill
                    className="object-cover object-center"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">Sakibur Rahaman</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Senior Software Engineer • {YOE}+ Years of Experience
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/sakibrahmanchy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com/in/sakibur-rahaman-chowdhury-77359b132"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:sakib.cse11.cuet@gmail.com"
                        className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Specializing in full-stack development, cloud architecture, and microservices with expertise in React, Node.js, AWS, and Kubernetes. 
                    Passionate about teaching foundational concepts and helping developers build systems-level understanding.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What Is This Program */}
          <section className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            <div className="pl-6">
              <h2 className="text-xl font-display font-bold mb-4">What Is This Program?</h2>
              <div className="space-y-3">
                {course.about.whatIsThisProgram.map((paragraph, index) => (
                  <p key={index} className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            <div className="pl-6">
              <h2 className="text-xl font-display font-bold mb-4">How Would You Benefit From This Course?</h2>
              <ul className="space-y-2">
                {course.about.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="pl-4 relative before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary font-medium text-primary dark:text-primary/90"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Course Structure */}
          <section className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            <div className="pl-6">
              <h2 className="text-xl font-display font-bold mb-4">Learning Philosophy</h2>
              <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                This program is built on core principles that prioritize deep understanding:
              </p>
              <ul className="space-y-2">
                {course.about.courseStructure.map((item, index) => (
                  <li
                    key={index}
                    className="pl-4 relative before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-300 text-zinc-600 dark:text-zinc-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Curriculum */}
          {course.curriculum && (
            <section className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              <div className="pl-6">
                <h2 className="text-xl font-display font-bold mb-4">{course.curriculum.title}</h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                  The program consists of six major projects. Each project focuses on a different domain while reinforcing previously learned concepts.
                </p>
                
                <div className="space-y-6">
                  {course.curriculum.projects.map((project) => (
                    <div
                      key={project.number}
                      className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-base font-bold text-primary">{project.number}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold mb-2">{project.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
                        {project.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-primary mb-2">Core Topics:</h4>
                          <ul className="space-y-2">
                            {project.topics.map((topic, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                              >
                                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                                <span className="flex-1">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
                            JavaScript Fundamentals:
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.fundamentals.map((fundamental, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded"
                              >
                                {fundamental}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Areas of Exposure</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    Throughout the program, you'll gain exposure in: JavaScript internals and language fundamentals, 
                    Browser behavior and frontend architecture, Backend systems and networking, Full-stack system design, 
                    and Applied AI concepts.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      )
    },
    {
      id: 'signup',
      label: 'Sign Up',
      content: (
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
          <div className="pl-6">
            <div className="mb-6">
              <h2 className="text-xl font-display font-bold mb-2">Apply for This Course</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Fill out the form below to express your interest. We'll review your application 
                and get back to you with next steps.
              </p>
            </div>
            <CourseSignupForm courseId={course.id} courseTitle={course.title} />
          </div>
        </div>
      )
    }
  ]

  return (
    <main>
      <Header />
      
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Courses
            </Link>

            {/* Course Header */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              <div className="pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    course.status === 'enrolling' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : course.status === 'upcoming'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}>
                    {course.status === 'enrolling' ? '🚀 Now Enrolling' : 
                     course.status === 'upcoming' ? '📅 Upcoming' : 
                     course.status === 'in-progress' ? '▶️ In Progress' : 
                     '✅ Completed'}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
                  {course.title}
                </h1>
                
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                  {course.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.startDate && (
                    <span className="px-2 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded">
                      📅 {course.startDate}
                    </span>
                  )}
                  {course.duration && (
                    <span className="px-2 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded">
                      ⏱️ {course.duration}
                    </span>
                  )}
                </div>

                {/* Pricing Section */}
                <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-baseline gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl text-primary">৳</span>
                      <span className="text-3xl font-bold text-primary">
                        {course.price.amount.toLocaleString()}
                      </span>
                    </div>
                    {course.price.originalPrice && (
                      <span className="text-lg text-zinc-500 dark:text-zinc-400 line-through">
                        ৳{course.price.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {course.price.installments?.enabled && (
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <CreditCard className="w-4 h-4" />
                      <span>
                        Installment plans available: {course.price.installments.options?.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <CourseContent tabs={tabs} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
