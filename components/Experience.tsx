"use client"

import { motion } from 'framer-motion'

const experiences = [
  {
    title: "Software Engineer L4 | Supply Gen",
    company: "Turing.com",
    period: "August 2021 - Present",
    location: "California, United States (Remote)",
    highlights: [
      {
        text: "Led development of Jobs V2 recommendation system, onboarding 100+ developers within weeks",
        isKey: true
      },
      {
        text: "Designed and implemented UI/UX improvements reducing developer rates by 24% for 17,000+ users",
        isKey: true
      },
      {
        text: "Redesigned developers.turing.com with modern design, improving developer vetting experience",
        isKey: true
      },
      {
        text: "Rewritten careers.turing.com backend from scratch and integrated with Greenhouse ATS",
        isKey: true
      },
      {
        text: "Implemented cloud functions and schedulers for automated email reminders",
        isKey: false
      },
      {
        text: "Created comprehensive unit testing flow for careers system stability",
        isKey: false
      }
    ],
    skills: "React, TypeScript, NestJS, Node.js, Redux, Docker, AWS, Unit Testing, Cloud Functions"
  },
  {
    title: "Senior Software Engineer",
    company: "Sixads",
    period: "October 2020 - September 2021",
    location: "Vilnius, Lithuania (Remote)",
    highlights: [
      {
        text: "Led frontend development serving 100,000+ Shopify stores",
        isKey: true
      },
      {
        text: "Implemented automated pipeline using Bitbucket pipelines and Helm for Kubernetes deployment",
        isKey: true
      },
      {
        text: "Architected modern frontend structure using React, Redux, and TypeScript",
        isKey: true
      }
    ],
    skills: "React, Redux, NextJS, TypeScript, SCSS, TailwindCSS, Docker, Kubernetes, AWS EKS, Helm"
  },
  {
    title: "Software Engineer",
    company: "Field Nation",
    period: "July 2019 - October 2020",
    location: "Dhaka, Bangladesh",
    highlights: [
      {
        text: "Built robust GET-WORK-DONE system as full-stack engineer",
        isKey: true
      },
      {
        text: "Implemented microservices architecture using NestJS and Docker",
        isKey: true
      }
    ],
    skills: "PHP, TypeScript, NestJS, React, Redux Saga, Docker, Kubernetes"
  },
  {
    title: "Software Engineer",
    company: "Sheba.xyz",
    period: "October 2018 - June 2019",
    location: "Dhaka, Bangladesh",
    highlights: [
      {
        text: "Developed APIs for mobile support and admin panels for multiple services",
        isKey: true
      },
      {
        text: "Implemented key modules including Eksheba Integration, SMS Campaign, Movie Tickets",
        isKey: true
      },
      {
        text: "Built location-based partner system and hyperlocal services",
        isKey: true
      }
    ],
    skills: "Laravel, Node.js, MySQL, MongoDB, Vue.js, API Development"
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

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Experience() {
  const MotionDiv = motion.div

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <MotionDiv
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="section-heading">Experience</h2>
          
          {experiences.map((exp) => (
            <MotionDiv
              key={exp.company + exp.period}
              variants={itemVariant}
              className="relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              <div className="pl-6">
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <h3 className="text-xl font-display font-bold">{exp.title}</h3>
                  <span className="text-primary font-medium">{exp.company}</span>
                </div>
                
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {exp.period} • {exp.location}
                </p>

                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((highlight, i) => (
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

                <div className="flex flex-wrap gap-2">
                  {exp.skills.split(', ').map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
} 