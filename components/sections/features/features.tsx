"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

function SpotlightCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // No need for mouse tracking for background anymore
  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl p-8 border border-green-300 overflow-hidden group transition-shadow duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg flex flex-col items-center text-center h-full cursor-pointer"
      whileHover={{
        boxShadow: "0 0 32px 8px #22c55e, 0 0 0px #22c55e",
        filter: "drop-shadow(0 0 24pxrgb(156, 173, 162))",
      }}
      transition={{ type: "tween", duration: 0.18 }}
    >
      {children}
    </motion.div>
  );
}

export default function FeaturesSection() {
  const router = useRouter()

  const features = [
    {
      icon: Code,
      title: "Polygot Component",
      description: "Learn how to use the main Polygot component for automatic translation of your content",
      color: "green",
    },
    {
      icon: Code,
      title: "NoPolygot Component",
      description: "Discover how to exclude specific content from translation using NoPolygot wrapper",
      color: "emerald",
    },
    {
      icon: Code,
      title: "CLI Tool",
      description: "Generate static translation files for SEO optimization using our command-line tool",
      color: "teal",
    },
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:via-emerald-400 dark:to-teal-400">
                Get Started
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dive deep into Polygot&apos;s features with our extensive guides and interactive examples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((item, index) => (
              <SpotlightCard key={item.title}>
                <div className="flex flex-col items-center text-center w-full h-full">
                  <div className="inline-flex p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-1">{item.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => router.push("/docs")}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 rounded-xl"
            >
              Explore Full Documentation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 