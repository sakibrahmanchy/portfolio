"use client"

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sakib.cse11.cuet@gmail.com",
    link: "mailto:sakib.cse11.cuet@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+8801869715616",
    link: "tel:+8801869715616"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/sakibur-rahaman-chowdhury-77359b132",
    link: "https://linkedin.com/in/sakibur-rahaman-chowdhury-77359b132"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/sakibrahmanchy",
    link: "https://github.com/sakibrahmanchy"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Majid Chy Bari, Fouzderhat Station Road, Bhatiary, Shitakundu, Chittagong",
    link: null
  }
]

export default function Contact() {
  const MotionDiv = motion.div

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Get in Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
              <MotionDiv
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 rounded-lg bg-white dark:bg-zinc-800/50"
              >
                <info.icon className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-display font-bold mb-1">{info.label}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-zinc-600 dark:text-zinc-400">{info.value}</p>
                  )}
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  )
} 