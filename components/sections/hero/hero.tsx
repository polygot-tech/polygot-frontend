/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Code,
  LinkIcon,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCopyClick = useCallback(async () => {
    const textToCopy = "npm i polygot"
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }, [])

  const handleNpmLinkClick = useCallback(() => {
    window.open("https://www.npmjs.com/package/polygot", "_blank", "noopener,noreferrer")
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as any

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  } as any

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Subtle Background Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/5 dark:bg-green-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-200/5 dark:bg-emerald-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="grid grid-cols-1 gap-16 lg:gap-20 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]"
            >
              Make Your Website{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:via-emerald-400 dark:to-teal-400">
                Speak Every Language
              </span>
            </motion.h1>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* NPM Install Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="h-14 px-6 text-lg bg-gray-900 hover:bg-gray-800 text-green-400 font-mono rounded-xl transition-all duration-300 group relative overflow-hidden"
                  onClick={handleCopyClick}
                >
                  <Code className="mr-3 h-5 w-5 text-green-400" />
                  npm i polygot
                  <motion.div
                    className="ml-3 flex items-center"
                    initial={false}
                    animate={{ scale: copied ? 1.1 : 1 }}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-green-400" />
                    )}
                  </motion.div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-8 w-8 text-green-400 hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNpmLinkClick()
                    }}
                    aria-label="Open npm package"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </Button>
              </motion.div>

              {/* Documentation Button */}
              <Button
                variant="outline"
                size="lg"
                onClick={()=>router.push("/docs")}
                className="h-14 px-8 text-lg border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 rounded-xl transition-all duration-300 bg-transparent"
              >
                View Documentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
