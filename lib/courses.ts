export interface Course {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  thumbnail: string
  status: 'upcoming' | 'enrolling' | 'in-progress' | 'completed'
  startDate?: string
  duration?: string
  price: {
    amount: number
    currency: string
    originalPrice?: number
    installments?: {
      enabled: boolean
      options?: string[]
    }
  }
  about: {
    whatIsThisProgram: string[]
    benefits: string[]
    courseStructure: string[]
  }
  curriculum?: {
    title: string
    projects: {
      number: number
      title: string
      description: string
      topics: string[]
      fundamentals: string[]
    }[]
  }
}

export interface CourseSignup {
  id: string
  courseId: string
  name: string
  email: string
  phone?: string
  background: string
  motivation: string
  experience: string
  timestamp: string
}

export const courses: Course[] = [
  {
    id: '1',
    slug: 'engineering-the-web',
    title: 'Systems-Level Web Engineering with JavaScript',
    subtitle: 'Build Production-Scale Systems from Scratch and Gain the Confidence to Get Hired',
    description: 'Learn to build real, production-scale web systems from the ground up using JavaScript. This intensive program takes you beyond tutorials and frameworks, teaching you how browsers work, how frameworks are built, how servers handle requests, and how to architect complete systems. Gain the deep technical foundation and confidence that gets you hired at top companies.',
    thumbnail: '/courses/engineering-web.jpg',
    status: 'enrolling',
    startDate: 'March 2026',
    duration: '12 weeks',
    price: {
      amount: 5500,
      currency: 'BDT',
      originalPrice: 7500,
      installments: {
        enabled: true,
        options: ['2000 BDT per month']
      }
    },
    about: {
      whatIsThisProgram: [
        'An intensive technical program where you build production-scale web systems from scratch using JavaScript. You\'ll learn by doing—constructing a JavaScript runtime, a web browser, a UI framework, a backend server, a full-stack application, and an AI system.',
        'This isn\'t about learning to use frameworks. It\'s about understanding how they work internally. You\'ll build the foundational systems that power modern web applications, gaining deep technical knowledge that most developers never acquire.',
        'By building real systems from the ground up, you\'ll develop genuine confidence in your abilities. You\'ll understand why technologies behave the way they do, how to debug complex problems, and how to architect solutions—skills that directly translate to getting hired.',
        'JavaScript is your tool for exploring core concepts: how code executes, how browsers render pages, how state is managed, how servers process requests, and how intelligent systems work. The language is the vehicle; systems understanding is the destination.',
        'This hands-on, project-driven approach gives you the technical depth and practical experience that companies look for. You\'ll be able to explain how systems work, debug production issues, and build solutions with confidence.'
      ],
      benefits: [
        'Build 6 production-scale systems from scratch: runtime, browser, framework, server, full-stack app, AI system',
        'Gain deep understanding of how web technologies actually work internally',
        'Develop the confidence to tackle complex technical problems and unfamiliar systems',
        'Master JavaScript through building real systems, not just following tutorials',
        'Learn debugging, architecture, and problem-solving skills used in production',
        'Stand out in technical interviews by explaining how systems work, not just how to use them',
        'Build a portfolio of meaningful projects that demonstrate real engineering skills',
        'Understand trade-offs and make informed technical decisions',
        'Gain the practical knowledge and confidence that gets you hired'
      ],
      courseStructure: [
        'Six intensive projects building production-scale systems from scratch',
        'Hands-on learning: write code, debug issues, solve real problems',
        'Focus on understanding internal mechanisms, not just using abstractions',
        'Progressive complexity: each project builds on previous knowledge',
        'Emphasis on practical skills: debugging, testing, architecting solutions',
        'Learn to think in systems, understand trade-offs, and build with confidence'
      ]
    },
    curriculum: {
      title: 'Program Structure',
      projects: [
        {
          number: 1,
          title: 'JavaScript Runtime and Event Loop',
          description: 'Explore how JavaScript code is executed internally and build a strong mental model for reasoning about execution, timing, and concurrency.',
          topics: [
            'Execution context and call stack',
            'Synchronous vs asynchronous execution',
            'Task queue and microtask queue',
            'Promise resolution and async/await behavior'
          ],
          fundamentals: [
            'Variables and functions',
            'Execution order',
            'Callbacks and promises',
            'Error handling'
          ]
        },
        {
          number: 2,
          title: 'Mini Web Browser',
          description: 'Understand the internal workings of a web browser through a simplified implementation, demonstrating how raw text transforms into visual output.',
          topics: [
            'HTML tokenization and parsing',
            'DOM tree construction',
            'Basic CSS rule application',
            'Layout and rendering flow'
          ],
          fundamentals: [
            'Objects and arrays',
            'Loops and conditionals',
            'Recursion',
            'Tree data structures',
            'String processing'
          ]
        },
        {
          number: 3,
          title: 'Custom UI Framework',
          description: 'Build a minimal component-based UI framework to understand why modern frontend frameworks behave the way they do.',
          topics: [
            'Component architecture',
            'State management',
            'Re-rendering logic',
            'Hook-like behavior and closures',
            'Declarative UI patterns'
          ],
          fundamentals: [
            'Closures and lexical scope',
            'Higher-order functions',
            'Immutability',
            'Modules and code organization'
          ]
        },
        {
          number: 4,
          title: 'Backend Framework and Authentication',
          description: 'Build a server framework from the ground up to understand server architecture and backend development fundamentals.',
          topics: [
            'HTTP request and response lifecycle',
            'Routing and middleware',
            'RESTful API design',
            'Authentication and authorization',
            'Basic security considerations'
          ],
          fundamentals: [
            'Asynchronous I/O',
            'Error handling patterns',
            'Environment configuration',
            'Working with Node.js APIs'
          ]
        },
        {
          number: 5,
          title: 'Full-Stack Application',
          description: 'Integrate frontend and backend systems into a complete application, emphasizing product-level thinking and real-world architecture.',
          topics: [
            'Frontend-backend communication',
            'Data modeling and persistence',
            'State management across layers',
            'Feature design from end to end',
            'System-level trade-offs'
          ],
          fundamentals: [
            'Data flow management',
            'API integration',
            'Application architecture',
            'Debugging across systems'
          ]
        },
        {
          number: 6,
          title: 'AI System and Intelligent Features',
          description: 'Understand how intelligence is derived from data and logic through practical AI implementations.',
          topics: [
            'Text processing and tokenization',
            'Search, ranking, and recommendation logic',
            'Scoring and similarity calculations',
            'Integration of modern AI tools',
            'Limitations and evaluation of AI systems'
          ],
          fundamentals: [
            'Algorithmic thinking',
            'Data transformation',
            'Working with external services',
            'Evaluation and iteration'
          ]
        }
      ]
    }
  }
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug)
}

export function getAllCourses(): Course[] {
  return courses
}
