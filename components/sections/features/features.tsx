"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

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
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                onClick={()=>router.push("/docs")}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <div className="inline-flex p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
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