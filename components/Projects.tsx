"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Grocery SHOP',
    description: 'Microservice based ecommerce shop with modern architecture',
    highlights: [
      {
        text: "Architected a microservice based ecommerce shop with NestJS",
        isKey: true
      },
      {
        text: "Led team of 4 engineers to build a complete microservice structure",
        isKey: true
      },
      {
        text: "Developed a gateway service to communicate internally with other services",
        isKey: false
      },
      {
        text: "Deployed the system in AWS with Kubernetes, Terraform, Helms & KOPS",
        isKey: true
      }
    ],
    tech: ["NestJS", "AWS", "Kubernetes", "Docker", "TypeScript", "React"],
    link: 'https://github.com/sakibrahmanchy/grocery-shop'
  },
  {
    title: 'Minisend',
    description: 'Email management system with modern tech stack',
    highlights: [
      {
        text: "Built email management system using Laravel, PHP, NodeJS, RabbitMQ",
        isKey: true
      },
      {
        text: "Implemented queue system for handling large volume of emails",
        isKey: true
      },
      {
        text: "Added real-time tracking and analytics",
        isKey: false
      }
    ],
    tech: ["Laravel", "PHP", "NodeJS", "RabbitMQ", "React", "MySQL"],
    link: 'https://github.com/sakibrahmanchy/minisend'
  },
  {
    title: 'Graminsta',
    description: 'Simple instagram clone using react and node.js',
    highlights: [
      {
        text: "Built a full-featured Instagram clone with React and Node.js",
        isKey: true
      },
      {
        text: "Implemented real-time features using WebSockets",
        isKey: true
      }
    ],
    tech: ["React", "Node.js", "WebSocket", "MongoDB"],
    link: 'https://github.com/sakibrahmanchy/graminsta'
  },
  {
    title: 'Weather',
    description: 'Simple weather app with react, typescript and graphql',
    highlights: [
      {
        text: "Created a weather application using React and TypeScript",
        isKey: true
      },
      {
        text: "Implemented GraphQL for efficient data fetching",
        isKey: true
      }
    ],
    tech: ["React", "TypeScript", "GraphQL"],
    link: 'https://github.com/sakibrahmanchy/weather'
  }
]

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Projects() {
  const MotionDiv = motion.div
  
  return (
    <section id="projects" className="py-20 bg-zinc-100 dark:bg-zinc-800/50">
      <div className="container mx-auto px-6">
        <MotionDiv
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <MotionDiv
                key={project.title}
                variants={cardVariant}
                className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-display font-bold">{project.title}</h3>
                  <Link 
                    href={project.link}
                    target="_blank"
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
                
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {project.description}
                </p>

                {project.highlights && (
                  <ul className="space-y-2 mb-4">
                    {project.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`pl-4 relative before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full ${
                          highlight.isKey 
                            ? 'before:bg-primary font-medium text-primary dark:text-primary/90' 
                            : 'before:bg-zinc-300 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {highlight.text}
                      </motion.li>
                    ))}
                  </ul>
                )}

                {project.tech && (
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  )
} 