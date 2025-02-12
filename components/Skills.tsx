"use client"

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "PHP", "Java", "Android"]
  },
  {
    title: "Backend Technologies",
    skills: ["Node.js", "Express.js", "NestJS", "TypeORM", "Laravel", "REST", "GraphQL", "RabbitMQ"]
  },
  {
    title: "Frontend Technologies",
    skills: ["React", "Vue.js", "Redux", "Recoil", "HTML5", "CSS3", "SCSS", "TailwindCSS", "Apollo", "WebSockets", "Storybook"]
  },
  {
    title: "Database & Caching",
    skills: ["MySQL", "MongoDB", "Redis"]
  },
  {
    title: "Testing",
    skills: ["Jest", "Enzyme", "React Testing Library", "PHPUnit"]
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "Helm", "KOPS", "AWS", "CircleCI", "BitBucket Pipelines", "GitHub Actions"]
  },
  {
    title: "Version Control",
    skills: ["Git"]
  },
  {
    title: "Operating Systems",
    skills: ["Windows", "Linux"]
  },
  {
    title: "Languages",
    skills: ["English (Professional)", "Bengali (Native)"]
  }
]

export default function Skills() {
  const MotionDiv = motion.div

  return (
    <section id="skills" className="py-20 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <MotionDiv
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-display font-bold mb-4 text-primary">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  )
} 