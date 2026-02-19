"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TabsProps {
  tabs: {
    id: string
    label: string
    content: React.ReactNode
  }[]
  activeTabId?: string
  onTabChange?: (tabId: string) => void
}

export default function Tabs({ tabs, activeTabId, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(activeTabId || tabs[0].id)

  useEffect(() => {
    if (activeTabId) {
      setActiveTab(activeTabId)
    }
  }, [activeTabId])

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className="w-full">
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tab.content}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
