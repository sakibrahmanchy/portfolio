"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Github, Linkedin, Mail, Code, Server, Database, Cloud } from 'lucide-react'
import { YOE } from '@/lib/constants'

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/sakibrahmanchy",
    label: "GitHub"
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/sakibur-rahaman-chowdhury-77359b132",
    label: "LinkedIn"
  },
  {
    icon: Mail,
    href: "mailto:sakib.cse11.cuet@gmail.com",
    label: "Email"
  }
]

const floatingIcons = [
  { icon: Code, color: "text-blue-500", delay: 0 },
  { icon: Server, color: "text-green-500", delay: 0.2 },
  { icon: Database, color: "text-yellow-500", delay: 0.4 },
  { icon: Cloud, color: "text-purple-500", delay: 0.6 },
]

const floatingVariant = {
  initial: () => ({
    y: 0,
    opacity: 0,
    rotate: -10,
  }),
  animate: (delay: number) => ({
    y: [0, -10, 0],
    opacity: 1,
    rotate: [-10, 10, -10],
    transition: {
      y: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
        delay,
      },
      opacity: {
        duration: 0.3,
        delay,
      },
      rotate: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
        delay,
      },
    },
  }),
}

const majorSkills = [
  { name: "React", color: "text-[#61DAFB]" },
  { name: "Node.js", color: "text-[#339933]" },
  { name: "TypeScript", color: "text-[#3178C6]" },
  { name: "AWS", color: "text-[#FF9900]" },
  { name: "Docker", color: "text-[#2496ED]" },
  { name: "Kubernetes", color: "text-[#326CE5]" }
]

const statsData = [
  { number: "7+", label: "Years Building Products", delay: 0.2 },
  { number: "50K+", label: "Users Impacted", delay: 0.3 },
  { number: "15+", label: "Enterprise Solutions", delay: 0.4 },
  { number: "99.9%", label: "System Uptime", delay: 0.5 },
]

export default function Hero() {
  const MotionDiv = motion.div
  
  return (
    <section className="min-h-screen flex items-center pt-20 overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            custom={item.delay}
            variants={floatingVariant}
            initial="initial"
            animate="animate"
            className={`absolute ${item.color} opacity-10`}
            style={{
              left: `${15 + i * 25}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
          >
            <item.icon size={40} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden ring-4 ring-primary/20 shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/sakibur.png"
                  alt="Sakibur"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 128px, 160px"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center sm:text-left"
              >
                <motion.span
                  className="text-xl sm:text-2xl text-primary font-medium block mb-2"
                >
                  Hi there! 👋 I am Sakib
                </motion.span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-zinc-600 dark:text-zinc-400"
                >
                  I&apos;m a Fullstack Developer & Cloud Engineer
                </motion.div>
              </motion.div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              Senior Software Engineer
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {majorSkills.map((skill, i) => (
                <span
                  key={skill.name}
                  className={`px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 ${skill.color} text-sm font-medium`}
                  style={{ 
                    transform: `translateY(${i % 2 * 4}px)` 
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-zinc-600 dark:text-zinc-400 mb-8"
            >
              Senior Software Engineer with {YOE}+ years of experience in full-stack development, cloud architecture, and microservices. 
              Passionate about building scalable solutions and leading engineering teams.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="#contact"
                className="group bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Get in touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#projects"
                className="group border border-zinc-200 dark:border-zinc-700 px-6 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                View projects
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:block relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl opacity-20" />
            <div className="relative bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-2 gap-6">
                {statsData.map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: stat.delay }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <motion.h3 
                      className="font-display font-bold text-3xl md:text-4xl text-primary mb-3"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
} 