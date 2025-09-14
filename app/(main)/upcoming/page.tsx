"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Database,
  Monitor,
  Languages,
  Gauge,
  Brain,
  BarChart3,
  Sparkles,
} from "lucide-react"

export default function FutureFeaturesPage() {

  const features = [
    {
      icon: Database,
      title: "RESTful API",
      description:
        "Clean, intuitive endpoints for seamless integration with any platform or framework. Build custom applications with full programmatic access to translation services.",
      status: "Coming Soon",
      statusColor: "emerald",
      details: [
        "Complete REST API with OpenAPI documentation",
        "Rate limiting and authentication",
        "Webhook support for real-time updates",
        "SDKs for popular programming languages",
      ],
    },
    {
      icon: Monitor,
      title: "Real-time Streaming",
      description:
        "WebSocket support for live translation updates and collaborative editing. Perfect for chat applications and live content.",
      status: "Beta Testing",
      statusColor: "green",
      
      details: [
        "WebSocket connections for live updates",
        "Collaborative translation editing",
        "Real-time synchronization across devices",
        "Low-latency streaming protocols",
      ],
    },
    {
      icon: Languages,
      title: "Local Slang Support",
      description:
        "Advanced support for Hinglish, Spanglish, and other mixed-language content with context-aware translations.",
      status: "In Development",
      statusColor: "blue",
      details: [
        "Mixed-language detection and translation",
        "Cultural context preservation",
        "Regional dialect support",
        "Community-driven slang database",
      ],
    },
    {
      icon: Gauge,
      title: "Enhanced Performance",
      description:
        "Even faster response times and higher throughput for demanding applications with edge computing integration.",
      status: "Coming Soon",
      statusColor: "emerald",
      details: [
        "Sub-100ms translation response times",
        "Global edge network deployment",
        "Intelligent caching strategies",
        "Auto-scaling infrastructure",
      ],
    },
    {
      icon: Brain,
      title: "Custom Translation Rules",
      description:
        "Build custom rule engines for specialized translation requirements and domain-specific terminology.",
      status: "Planning",
      statusColor: "gray",
      details: [
        "Visual rule builder interface",
        "Domain-specific dictionaries",
        "Custom translation models",
        "A/B testing for translation variants",
      ],
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Detailed insights into translation usage, performance, and cost optimization with comprehensive dashboards.",
      status: "Research",
      statusColor: "gray",
      details: [
        "Real-time usage analytics",
        "Cost optimization recommendations",
        "Performance monitoring dashboards",
        "Custom reporting and exports",
      ],
    },
  ]

  const upcomingMilestones = [
    {
      title: "Real-time Features Launch",
      description: "WebSocket support and live translation streaming",
      icon: Monitor,
      color: "green",
    },
    {
      title: "API & Performance Boost",
      description: "RESTful API release with enhanced performance",
      icon: Database,
      color: "emerald",
    },
    {
      title: "Language Intelligence",
      description: "Local slang and mixed-language support",
      icon: Languages,
      color: "blue",
    },
    {
      title: "Custom Solutions",
      description: "Custom translation rules and enterprise features",
      icon: Brain,
      color: "purple",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      {/* Hero Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 text-sm font-medium mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              Coming Soon • Revolutionary Features
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              The Future of Translation{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                is Almost Here
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our revolutionary features will unlock new possibilities for developers worldwide. Get ready for the next
              generation of translation technology that will transform how you build global applications.
            </p>
          </motion.div>

      
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Development{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track our progress and see what&apos;s coming next in our development journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {upcomingMilestones.map((milestone, index) => (
              <motion.div
                key={index.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="border border-gray-200 hover:border-green-300 transition-all duration-300 hover:-translate-y-1 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          milestone.color === "green"
                            ? "bg-green-100 text-green-600"
                            : milestone.color === "emerald"
                              ? "bg-emerald-100 text-emerald-600"
                              : milestone.color === "blue"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        <milestone.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed look at each revolutionary feature that will transform your translation workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-all duration-300 cursor-pointer h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className={`text-xs mb-2 ${
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
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Key Features:</h4>
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

  
    </div>
  )
}
