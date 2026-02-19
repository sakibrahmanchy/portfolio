import { Metadata } from 'next'
import Link from 'next/link'
import { getAllCourses } from '@/lib/courses'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Courses | Sakibur Rahaman',
  description: 'Project-driven learning experiences designed to provide thorough understanding of modern software systems.',
}

export default function CoursesPage() {
  const courses = getAllCourses()

  return (
    <main>
      <Header />
      
      <div className="pt-20 pb-20">
        <div className="mx-auto px-6">
          <div className="space-y-12">
            <h2 className="section-heading">Courses</h2>
            
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="block group"
              >
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                  <div className="pl-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
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
                        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                          {course.subtitle}
                        </p>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                          {course.description}
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
                        
                        <div className="flex items-baseline gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-lg text-primary">৳</span>
                            <span className="text-xl font-bold text-primary">
                              {course.price.amount.toLocaleString()}
                            </span>
                          </div>
                          {course.price.originalPrice && (
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 line-through">
                              ৳{course.price.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <ArrowRight className="w-6 h-6 text-zinc-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {courses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-zinc-600 dark:text-zinc-400">
                  No courses available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
