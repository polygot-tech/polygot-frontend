/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Globe,
  Zap,
  Code,
  Users,
  Sparkles,
  Search,
  User,
  LinkIcon,
  ArrowRight,
  Shield,
  CheckCircle,
  Terminal,
  Copy,
  Check,
} from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"

const translations = [
  {
    lang: "English",
    text: "Welcome to our platform",
    flag: "🇺🇸",
    desc: "Experience seamless translation with our AI-powered platform that transforms your business globally.",
    buttons: ["Get Started Free", "Learn More"],
    features: [
      { title: "Fast", desc: "Lightning speed", icon: Zap },
      { title: "Global", desc: "Worldwide reach", icon: Globe },
      { title: "Simple", desc: "Easy integration", icon: Code },
    ],
  },
  {
    lang: "Spanish",
    text: "Bienvenido a nuestra plataforma",
    flag: "🇪🇸",
    desc: "Experimenta la traducción perfecta con nuestra plataforma impulsada por IA que transforma tu negocio globalmente.",
    buttons: ["Comenzar Gratis", "Saber Más"],
    features: [
      { title: "Rápido", desc: "Velocidad del rayo", icon: Zap },
      { title: "Global", desc: "Alcance mundial", icon: Globe },
      { title: "Simple", desc: "Fácil integración", icon: Code },
    ],
  },
  {
    lang: "French",
    text: "Bienvenue sur notre plateforme",
    flag: "🇫🇷",
    desc: "Découvrez une traduction transparente avec notre plateforme alimentée par l'IA qui transforme votre entreprise à l'échelle mondiale.",
    buttons: ["Commencer Gratuitement", "En Savoir Plus"],
    features: [
      { title: "Rapide", desc: "Vitesse éclair", icon: Zap },
      { title: "Mondial", desc: "Portée mondiale", icon: Globe },
      { title: "Simple", desc: "Intégration facile", icon: Code },
    ],
  },
  {
    lang: "German",
    text: "Willkommen auf unserer Plattform",
    flag: "🇩🇪",
    desc: "Erleben Sie nahtlose Übersetzung mit unserer KI-gestützten Plattform, die Ihr Unternehmen global transformiert.",
    buttons: ["Kostenlos Starten", "Mehr Erfahren"],
    features: [
      { title: "Schnell", desc: "Blitzschnell", icon: Zap },
      { title: "Global", desc: "Weltweite Reichweite", icon: Globe },
      { title: "Einfach", desc: "Einfache Integration", icon: Code },
    ],
  },
  {
    lang: "Japanese",
    text: "私たちのプラットフォームへようこそ",
    flag: "🇯🇵",
    desc: "AIを活用したプラットフォームでシームレスな翻訳を体験し、ビジネスをグローバルに変革しましょう。",
    buttons: ["無料で始める", "詳細を見る"],
    features: [
      { title: "高速", desc: "超高速", icon: Zap },
      { title: "グローバル", desc: "世界的なリーチ", icon: Globe },
      { title: "シンプル", desc: "簡単な統合", icon: Code },
    ],
  },
]

const floatingWords = [
  { text: "Hello", x: "10%", y: "20%" },
  { text: "Hola", x: "85%", y: "15%" },
  { text: "Bonjour", x: "15%", y: "70%" },
  { text: "Hallo", x: "80%", y: "60%" },
  { text: "こんにちは", x: "20%", y: "40%" },
  { text: "你好", x: "75%", y: "35%" },
]

export default function HeroSection() {
  const [currentLangIndex, setCurrentLangIndex] = useState(0)
  const router=useRouter()
  const [copied, setCopied] = useState(false)
  const currentTranslation = translations[currentLangIndex]
  const containerRef = useRef<HTMLDivElement>(null)
  const laptopRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const laptopInView = useInView(laptopRef, { once: true, margin: "-100px" })
  const laptopY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  // Auto-cycle through languages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % translations.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

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
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50/30"
      >
  

        {/* Floating Words - Optimized */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingWords.map((word, index) => (
            <motion.div
              key={word.text}
              className="absolute text-6xl font-bold opacity-[0.02] select-none text-green-600"
              style={{ left: word.x, top: word.y }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.02, 0.04, 0.02],
              }}
              transition={{
                duration: 12 + index * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 1.5,
              }}
            >
              {word.text}
            </motion.div>
          ))}
        </div>

        {/* Subtle Background Orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/5 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-200/5 rounded-full blur-3xl"
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

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8  pt-10  pb-20">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-32">
            {/* Left Side - Content */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
              {/* Badge */}
              {/* <motion.div variants={itemVariants}>
                <Badge className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 text-sm font-medium">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI-Powered Translation • Zero Configuration
                </Badge>
              </motion.div> */}

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]"
              >
                Make Your Website{" "}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Speak Every Language
                </span>
              </motion.h1>

              {/* Subheadline */}
              {/* <motion.p variants={itemVariants} className="text-xl lg:text-2xl leading-relaxed text-gray-600 max-w-2xl">
                Transform your website into a global platform with one line of code. Pure AI magic that translates
                everything in real-time.
              </motion.p> */}

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
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

            {/* Right Side - Laptop Demo */}
            <motion.div
              ref={laptopRef}
              style={{ y: laptopY }}
              initial={{ opacity: 0, x: 60 }}
              animate={
                laptopInView
                  ? {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }
                  : {}
              }
              className="relative"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative"
              >
                {/* Laptop Container - Clean Design */}
                <div className="relative">
                  {/* Laptop Base */}
                  <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl p-6">
                    {/* Screen - No Shadows */}
                    <div className="bg-gray-900 rounded-xl p-1">
                      <div className="bg-white rounded-lg overflow-hidden h-[480px] w-full relative flex flex-col">
                        {/* Browser Chrome */}
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex-shrink-0">
                          <div className="flex items-center gap-3">
                            <div className="flex gap-2">
                              <div className="w-3 h-3 bg-red-400 rounded-full" />
                              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                              <div className="w-3 h-3 bg-green-400 rounded-full" />
                            </div>
                            <div className="flex-1 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 ml-4 flex items-center gap-2">
                              <div className="w-4 h-4 text-gray-400">🔒</div>
                              <span>https://yourwebsite.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Search className="h-4 w-4 text-gray-400" />
                              <User className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        {/* Website Content */}
                        <div className="flex-1 p-8 bg-gradient-to-br from-white to-gray-50/50 flex flex-col">
                          {/* Navigation */}
                          <div className="flex items-center justify-between mb-8 flex-shrink-0">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <Globe className="h-6 w-6 text-white" />
                              </div>
                              <span className="text-xl font-bold text-gray-900">Website</span>
                            </div>
                            <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                              {currentTranslation.flag} {currentTranslation.lang}
                            </Badge>
                          </div>

                          {/* Hero Content */}
                          <div className="text-center max-w-4xl mx-auto mb-8 flex-1 flex flex-col justify-center">
                            <div className="h-[240px] flex flex-col justify-center">
                              <AnimatePresence mode="wait">
                                <motion.h1
                                  key={currentLangIndex}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                  className="text-4xl font-bold text-gray-900 mb-6"
                                >
                                  {currentTranslation.text}
                                </motion.h1>
                              </AnimatePresence>
                              <AnimatePresence mode="wait">
                                <motion.p
                                  key={currentLangIndex}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                  className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                                >
                                  {currentTranslation.desc}
                                </motion.p>
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Feature Cards */}
                         
                        </div>
                      </div>
                    </div>
                    {/* Laptop Keyboard */}
                    <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-2xl h-4" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

       
       

          {/* Documentation Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-16">
             
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Get Started
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dive deep into Polygot&apos;s features with our extensive guides and interactive examples.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Code,
                  title: "Polygot Component",
                  description: "Learn how to use the main Polygot component for automatic translation of your content",
                  color: "green",
                },
                {
                  icon: Shield,
                  title: "NoPolygot Component",
                  description: "Discover how to exclude specific content from translation using NoPolygot wrapper",
                  color: "emerald",
                },
                {
                  icon: Terminal,
                  title: "CLI Tool",
                  description: "Generate static translation files for SEO optimization using our command-line tool",
                  color: "teal",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={()=>router.push("/docs")}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="inline-flex p-3 rounded-xl bg-green-100 text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <NextLink href="/docs">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 rounded-xl"
                >
                  Explore Full Documentation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </NextLink>
            </div>
          </motion.section>

   {/* Pricing Section */}
                 <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Perfect Plan
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start free and scale as you grow. Translations on the same device are cached and completely free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <Card className="relative overflow-hidden border border-gray-200 bg-white hover:border-green-300 transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-8 w-8 text-green-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                    <p className="text-gray-600 mb-6">Perfect for trying Polygot</p>
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      Free
                    </div>
                    <p className="text-sm text-gray-500 mb-8">No credit card required</p>
                    <div className="space-y-4 text-left mb-8">
                      {[
                        "1 app maximum",
                        "1,000 total translations",
                        "20+ supported languages",
                        "Same device caching",
                        "Community support",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <NextLink href="/pricing">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg font-medium transition-all duration-300">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </NextLink>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="relative overflow-hidden border-2 border-green-200 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 hover:border-green-300 transition-all duration-300 hover:-translate-y-1 group scale-105">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 text-sm font-semibold rounded-bl-2xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                    <p className="text-gray-600 mb-6">For growing businesses</p>
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      $29
                    </div>
                    <p className="text-sm text-gray-500 mb-8">per month</p>
                    <div className="space-y-4 text-left mb-8">
                      {[
                        "2 apps maximum",
                        "30,000 total translations",
                        "50+ supported languages",
                        "Same device caching",
                        "Priority support",
                        "Advanced analytics",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <NextLink href="/pricing">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg font-medium transition-all duration-300">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    </NextLink>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative overflow-hidden border border-gray-200 bg-white hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                    <p className="text-gray-600 mb-6">Custom solutions</p>
                    <div className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent mb-2">
                      Custom
                    </div>
                    <p className="text-sm text-gray-500 mb-8">Volume discounts available</p>
                    <div className="space-y-4 text-left mb-8">
                      {[
                        "Unlimited apps",
                        "Custom translation limits",
                        "All supported languages",
                        "Same device caching",
                        "24/7 dedicated support",
                        "Custom integrations",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-gray-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <NextLink href='/pricing'>
                    <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 text-lg font-medium transition-all duration-300">
                      Contact Sales
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    </NextLink>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>
          {/* Future Features Section */}
          {/* <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                The Future of Translation{" "}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  is Almost Here
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our revolutionary features will unlock new possibilities for developers worldwide. Get ready for the
                next generation of translation technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Database,
                  title: "RESTful API",
                  description: "Clean, intuitive endpoints for seamless integration with any platform or framework.",
                  status: "Coming Soon",
                  statusColor: "emerald",
                },
                {
                  icon: Monitor,
                  title: "Real-time Streaming",
                  description: "WebSocket support for live translation updates and collaborative editing.",
                  status: "Beta Testing",
                  statusColor: "green",
                },
                {
                  icon: Languages,
                  title: "Local Slang Support",
                  description: "Advanced support for Hinglish, Spanglish, and other mixed-language content.",
                  status: "In Development",
                  statusColor: "blue",
                },
                {
                  icon: Gauge,
                  title: "Enhanced Performance",
                  description: "Even faster response times and higher throughput for demanding applications.",
                  status: "Coming Soon",
                  statusColor: "emerald",
                },
                {
                  icon: Brain,
                  title: "Custom Translation Rules",
                  description: "Build custom rule engines for specialized translation requirements.",
                  status: "Planning",
                  statusColor: "gray",
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description: "Detailed insights into translation usage, performance, and cost optimization.",
                  status: "Research",
                  statusColor: "gray",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex p-3 rounded-xl bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        feature.statusColor === "green"
                          ? "bg-green-100 text-green-700"
                          : feature.statusColor === "blue"
                            ? "bg-blue-100 text-blue-700"
                            : feature.statusColor === "emerald"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {feature.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section> */}

          {/* Social Proof */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 mb-8">Trusted by developers at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-30">
              {["Google", "Microsoft", "Shopify", "Stripe", "Vercel"].map((company, index) => (
                <motion.div
                  key={company}
                  className="text-2xl font-bold text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ opacity: 0.6, scale: 1.05 }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </div>
      </section>
    </>
  )
}
