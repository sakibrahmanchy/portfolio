"use client"

import { useState } from 'react'
import Tabs from './Tabs'
import FloatingSignupButton from './FloatingSignupButton'

interface CourseContentProps {
  tabs: {
    id: string
    label: string
    content: React.ReactNode
  }[]
}

export default function CourseContent({ tabs }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState('about')

  const handleSignupClick = () => {
    setActiveTab('signup')
    // Smooth scroll to tabs section
    const tabsElement = document.getElementById('course-tabs')
    if (tabsElement) {
      const headerOffset = 100
      const elementPosition = tabsElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div id="course-tabs">
        <Tabs tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab} />
      </div>
      <FloatingSignupButton onClick={handleSignupClick} show={activeTab !== 'signup'} />
    </>
  )
}
