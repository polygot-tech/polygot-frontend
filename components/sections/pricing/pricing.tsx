"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Zap, Users, ArrowRight, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PricingSection() {
  const router = useRouter()

  const plans = [
    {
      icon: Globe,
      title: "Starter",
      description: "Perfect for trying Polygot",
      price: "Free",
      period: "No credit card required",
      features: [
        "1 app maximum",
        "1,000 total translations",
        "20+ supported languages",
        "Same device caching",
        "Community support",
      ],
      popular: false,
      color: "green",
    },
    {
      icon: Zap,
      title: "Pro",
      description: "For growing businesses",
      price: "$29",
      period: "per month",
      features: [
        "2 apps maximum",
        "30,000 total translations",
        "50+ supported languages",
        "Same device caching",
        "Priority support",
        "Advanced analytics",
      ],
      popular: true,
      color: "emerald",
    },
    {
      icon: Users,
      title: "Enterprise",
      description: "Custom solutions",
      price: "Custom",
      period: "Volume discounts available",
      features: [
        "Unlimited apps",
        "Custom translation limits",
        "All supported languages",
        "Same device caching",
        "24/7 dedicated support",
        "Custom integrations",
      ],
      popular: false,
      color: "gray",
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
              Choose Your{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:via-emerald-400 dark:to-teal-400">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Start free and scale as you grow. Translations on the same device are cached and completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
              >
                <Card className={`relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 group ${
                  plan.popular 
                    ? 'border-2 border-green-200 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 hover:border-green-300 dark:border-green-700 dark:bg-gradient-to-br dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20'
                    : 'border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:border-green-300 dark:border-gray-700 dark:hover:border-green-600'
                } shadow-lg hover:shadow-xl`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 text-sm font-semibold rounded-bl-2xl">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${
                        plan.color === 'green' 
                          ? 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                          : plan.color === 'emerald'
                          ? 'from-green-600 to-emerald-600'
                          : 'from-gray-600 to-gray-700'
                      }`}>
                        <plan.icon className={`h-8 w-8 ${
                          plan.color === 'emerald' ? 'text-white' : 'text-green-700 dark:text-green-400'
                        }`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                      <div className={`text-5xl font-bold bg-clip-text text-transparent mb-2 ${
                        plan.color === 'green' || plan.color === 'emerald'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700'
                      }`}>
                        {plan.price}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{plan.period}</p>
                      <div className="space-y-4 text-left mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className={`h-5 w-5 flex-shrink-0 ${
                              plan.color === 'gray' ? 'text-gray-600 dark:text-gray-400' : 'text-green-600 dark:text-green-400'
                            }`} />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        onClick={() => router.push("/pricing")}
                        className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
                          plan.color === 'gray'
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                        }`}
                      >
                        {plan.title === "Enterprise" ? "Contact Sales" : "Get Started"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 