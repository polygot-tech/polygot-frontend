"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Mail,
  Zap,
  Globe,
  Users,
  Sparkles,
  ArrowRight,
  Gift,
  Smartphone,
  Monitor,
  Code,
  Star,
  Shield,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/header"

export default function PricingPage() {
  const handleContactSales = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=sharmavipul01002@gmail.com&su=polygot%20Enterprise%20Plan%20Inquiry&body=Hi,%20I'm%20interested%20in%20learning%20more%20about%20polygot's%20enterprise%20translation%20solutions.",
      "_blank",
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <main className="container mx-auto px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <Badge className="mb-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0 px-6 py-3 text-sm font-medium shadow-lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Simple & Transparent Pricing
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-8">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-xl md:text-2xl leading-relaxed text-gray-600 mb-12">
              Start free and scale as you grow. Translations on the same device are cached and completely free.
            </p>

            <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">50,000+ developers</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 font-medium">4.9/5</span>
              </div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="max-w-6xl mx-auto mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Free Plan */}
              <Card className="relative overflow-hidden border-0 bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    <Gift className="h-3 w-3 mr-1" />
                    Free Forever
                  </Badge>
                </div>

                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-emerald-700" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Starter</CardTitle>
                  <p className="text-gray-600 mb-6">Perfect for trying polygot</p>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        Free
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">No credit card required</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      "1 app maximum",
                      "1,000 total translations",
                      "20+ supported languages",
                      "Same device caching (free repeats)",
                      "Community support",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link href="/">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        Start Free Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-emerald-50/50 to-green-50/50 backdrop-blur-xl shadow-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group scale-105">
                <div
                  className="absolute top-0 right-0 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 text-sm font-semibold shadow-lg"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15% 100%)" }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>

                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Pro</CardTitle>
                  <p className="text-gray-600 mb-6">For growing businesses</p>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        $29
                      </span>
                      <span className="text-gray-500 text-lg">/month</span>
                    </div>
                    <p className="text-sm text-gray-500">Billed monthly</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      "2 apps maximum",
                      "30,000 total translations",
                      "50+ supported languages",
                      "Same device caching (free repeats)",
                      "Priority support",
                      "Advanced analytics",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative overflow-hidden border-0 bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Enterprise</CardTitle>
                  <p className="text-gray-600 mb-6">Custom solutions</p>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                        Custom
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Volume discounts available</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      "Unlimited apps",
                      "Custom translation limits",
                      "All supported languages",
                      "Same device caching (free repeats)",
                      "24/7 dedicated support",
                      "Custom integrations",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleContactSales}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Contact Sales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Polygot Section */}
          <section className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Why Choose
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                  {" "}
                  Polygot?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Seamless translations for both mobile apps and web applications, trusted by developers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <div className="inline-flex p-3 rounded-xl bg-emerald-100 text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Apps</h3>
                <p className="text-gray-600 leading-relaxed">
                  Perfect integration with React Native. Seamless user experience
                  across all mobile platforms.
                </p>
              </div>

              <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <div className="inline-flex p-3 rounded-xl bg-green-100 text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Web Applications</h3>
                <p className="text-gray-600 leading-relaxed">
                  Works flawlessly with React, Tanstack and NextJS. One line of code for global reach.
                </p>
              </div>

              <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <div className="inline-flex p-3 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Developer First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Built by developers, for developers. Simple integration, powerful features, and comprehensive
                  documentation.
                </p>
              </div>

              <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <div className="inline-flex p-3 rounded-xl bg-purple-100 text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Caching</h3>
                <p className="text-gray-600 leading-relaxed">
                  Translations on the same device are automatically cached and free. Intelligent optimization saves you
                  money.
                </p>
              </div>

              <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <div className="inline-flex p-3 rounded-xl bg-blue-100 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered translations in milliseconds. Your users won&apos;t even notice the magic happening behind the
                  scenes.
                </p>
              </div>

              <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <div className="inline-flex p-3 rounded-xl bg-amber-100 text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
                <p className="text-gray-600 leading-relaxed">
                  Support for 50+ languages with perfect context understanding. Reach every corner of the world
                  effortlessly.
                </p>
              </div>
            </div>
          </section>

          {/* Social Proof */}
          {/* <section className="text-center">
            <p className="text-sm text-gray-500 mb-8">Trusted by developers at</p>
            <div className="flex justify-center items-center gap-12 opacity-40">
              {["Google", "Microsoft", "Shopify", "Stripe", "Vercel"].map((company) => (
                <div
                  key={company}
                  className="text-2xl font-bold text-gray-400 hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  {company}
                </div>
              ))}
            </div>
          </section> */}
        </main>
      </div>
    </>
  )
}
