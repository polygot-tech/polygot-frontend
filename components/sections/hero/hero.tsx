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

// Reduced hello words for better performance (from 49 to 20)
const helloWords = [
  { text: "Hello", top: "15%", left: "10%" },
  { text: "Hola", top: "30%", left: "80%" },
  { text: "Bonjour", top: "70%", left: "15%" },
  { text: "Hallo", top: "50%", left: "85%" },
  { text: "Ciao", top: "20%", left: "60%" },
  { text: "Olá", top: "85%", left: "70%" },
  { text: "Привет", top: "10%", left: "90%" },
  { text: "你好", top: "85%", left: "50%" },
  { text: "こんにちは", top: "80%", left: "60%" },
  { text: "안녕하세요", top: "70%", left: "80%" },
  { text: "مرحبا", top: "10%", left: "30%" },
  { text: "שלום", top: "60%", left: "75%" },
  { text: "नमस्ते", top: "20%", left: "40%" },
  { text: "สวัสดี", top: "80%", left: "5%" },
  { text: "Jambo", top: "45%", left: "5%" },
  { text: "Γεια σας", top: "25%", left: "85%" },
  { text: "Hej", top: "55%", left: "25%" },
  { text: "Merhaba", top: "5%", left: "35%" },
  { text: "Ahoj", top: "12%", left: "65%" },
  { text: "Aloha", top: "88%", left: "35%" },
];

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
      {/* Floating Hello Words Background */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">
        {helloWords.map(({ text, top, left }, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{
              delay: 0.01 + i * 0.18,
              duration: 0.15, // for fade-in
              opacity: { duration: 0.12 }, // fast for hover in/out
            }}
            whileHover={{
              opacity: 0.6,
              textShadow: "0 0 16px #22c55e, 0 0 32px #22c55e",
              }}
            className="absolute select-none transition-all duration-300 text-2xl md:text-3xl font-bold hover:opacity-70 dark:text-emerald-200/80 text-emerald-600/70"
            style={{
              top,
              left,
              color: "rgba(52, 211, 153, 0.6)", // Increased from 0.4 to 0.6
              textShadow: "0 2px 8px rgba(52, 211, 153, 0.3)", // Increased from 0.18 to 0.3
              zIndex: 1,
              pointerEvents: "auto",
              }}
            >
            {text}
          </motion.span>
          ))}
        </div>
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
              className="font-grotesk text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]"
              >
                Make Your Website{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:via-emerald-400 dark:to-teal-400">
                  Speak Every Language
                </span>
              </motion.h1>

              {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* NPM Install Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group flex">
                  <Button
                    size="lg"
                    className="h-14 px-6 text-lg bg-gray-900 hover:bg-gray-800 text-green-400 font-mono rounded-l-xl transition-all duration-300 relative overflow-hidden"
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
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-12 bg-gray-900 hover:bg-gray-700 text-green-400 rounded-r-xl rounded-l-none border-l border-gray-700 transition-all duration-300"
                    onClick={handleNpmLinkClick}
                    aria-label="Open npm package"
                  >
                    <LinkIcon className="h-4 w-4" />
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
