"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FeatureCard } from "./_components/feature-card"
import { Tooltip, TooltipContent } from '@/components/ui/tooltip'
import {
  Check,
  Mail,
  Zap,
  Globe,
  Users,
  Sparkles,
  CreditCard,
  Clock,
  Repeat,
  Shield,
  Headphones,
  Rocket,
  Star,
  ArrowRight,
  Gift,
} from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const handleContactSales = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=sharmavipul01002@gmail.com&su=polygot%20Enterprise%20Plan%20Inquiry&body=Hi,%20I'm%20interested%20in%20learning%20more%20about%20polygot's%20enterprise%20translation%20solutions.",
      "_blank",
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-0 px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Zap className="mr-2 h-4 w-4 animate-pulse" />
            Smart Credit-Based Pricing
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
            Translation Credits
            <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent animate-pulse">
              Made Simple
            </span>
          </h1>

          <p className="text-lg sm:text-xl leading-8 text-gray-600 max-w-3xl mx-auto mb-8">
            Pay only for what you translate. Our intelligent credit system optimizes your costs with caching and
            session-based savings.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              No hidden fees
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Smart caching saves credits
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Session repeats are free
            </div>
          </div>
        </section>

        {/* Credit System Explanation */}
        <section className="max-w-6xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How Our Credit System Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent pricing that adapts to your usage patterns and saves you money
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FeatureCard
              icon={<CreditCard className="h-4 w-4" />}
              title="New Translation"
              description="Fresh page translations cost 1 credit each. Perfect for new content that hasn't been translated before."
              highlight={true}
            />
            <FeatureCard
              icon={<Repeat className="h-4 w-4" />}
              title="Cached Translation"
              description="Previously translated content costs only 0.5 credits. Our smart caching system saves you money on repeat translations."
            />
            <FeatureCard
              icon={<Clock className="h-4 w-4" />}
              title="Session Repeats"
              description="Multiple requests for the same translation within your session are completely free. No additional charges."
            />
          </div>

        </section>

        {/* Pricing Plans */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start free and scale as you grow. Every plan includes our intelligent credit optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="animate-in slide-in-from-left duration-700 delay-300">
              <Card className="relative overflow-hidden border-0 bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full hover:-translate-y-2 group">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    <Gift className="h-3 w-3 mr-1" />
                    Free Forever
                  </Badge>
                </div>

                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-emerald-700" />
                  </div>

                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Starter Plan</CardTitle>
                  <p className="text-gray-600">Perfect for trying polygot</p>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        50
                      </span>
                      <span className="text-gray-500 text-lg">free credits</span>
                    </div>
                    <p className="text-sm text-gray-500">No credit card required</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        text: "50 translation credits included",
                        tooltip: "Enough for 50 new page translations or 100 cached translations",
                        highlight: true,
                      },
                      {
                        text: "AI-powered translation engine",
                        tooltip: "State-of-the-art neural machine translation for accurate results",
                      },
                      {
                        text: "20+ supported languages",
                        tooltip: "Major world languages including English, Spanish, French, German, Chinese, and more",
                      },
                      {
                        text: "Smart caching system",
                        tooltip: "Automatic caching reduces costs for repeated translations",
                      },
                      {
                        text: "Session-based free repeats",
                        tooltip: "Same translations within a session don't consume additional credits",
                      },
                      {
                        text: "Community support",
                        tooltip: "Access to community forums and documentation",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 group/feature hover:translate-x-1 transition-transform duration-200"
                      >
                        <div className="flex-shrink-0">
                          <Check
                            className={`h-5 w-5 ${feature.highlight ? "text-emerald-600" : "text-gray-400"} group-hover/feature:scale-110 transition-transform duration-200`}
                          />
                        </div>
                        <span
                          className={`text-base ${feature.highlight ? "font-semibold text-emerald-700" : "text-gray-700"} flex items-center gap-2`}
                        >
                          {feature.text}
                          {feature.tooltip && <Tooltip>
                            <TooltipContent>
                                {feature.tooltip}
                            </TooltipContent>
                            </Tooltip>}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link href={"/"}>
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
                    >
                      Start Free Now
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                    </Link>
                    <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                      Get started immediately • No setup required
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enterprise Plan */}
            <div className="animate-in slide-in-from-right duration-700 delay-400">
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-emerald-50/50 to-green-50/50 backdrop-blur-xl shadow-2xl hover:shadow-2xl transition-all duration-500 h-full hover:-translate-y-2 group">
                <div
                  className="absolute top-0 right-0 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 text-sm font-semibold shadow-lg animate-in slide-in-from-top-2 duration-500 delay-700"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15% 100%)" }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    Most Popular
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-emerald-600/5 opacity-50" />

                <CardHeader className="text-center pb-6 relative z-10">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>

                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Enterprise</CardTitle>
                  <p className="text-gray-600">Tailored for your business needs</p>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        Custom
                      </span>
                      <span className="text-gray-500 text-lg">credits</span>
                    </div>
                    <p className="text-sm text-gray-500">Volume discounts available</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  <div className="space-y-4">
                    {[
                      {
                        text: "Custom credit packages",
                        tooltip: "Tailored credit allocations based on your specific translation volume needs",
                        highlight: true,
                      },
                      {
                        text: "Priority processing",
                        tooltip: "Your translations get processed first with dedicated server resources",
                      },
                      {
                        text: "24/7 dedicated support",
                        tooltip: "Direct access to our technical team via phone, email, and chat",
                      },
                      {
                        text: "Advanced API access",
                        tooltip: "Full REST API with webhooks, batch processing, and custom integrations",
                      },
                      {
                        text: "Analytics & reporting",
                        tooltip: "Detailed usage analytics, cost tracking, and performance reports",
                      },
                      {
                        text: "Volume discounts",
                        tooltip: "Significant cost savings for high-volume translation needs",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 group/feature hover:translate-x-1 transition-transform duration-200"
                      >
                        <div className="flex-shrink-0">
                          <Check
                            className={`h-5 w-5 ${feature.highlight ? "text-emerald-600" : "text-gray-400"} group-hover/feature:scale-110 transition-transform duration-200`}
                          />
                        </div>
                        <span
                          className={`text-base ${feature.highlight ? "font-semibold text-emerald-700" : "text-gray-700"} flex items-center gap-2`}
                        >
                          {feature.text}
                          {feature.tooltip && <Tooltip>
                            <TooltipContent>
                                {feature.tooltip}
                            </TooltipContent>
                            </Tooltip>}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleContactSales}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
                    >
                      <Mail className="mr-2 h-5 w-5 animate-bounce" />
                      Contact Sales Team
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                      Custom pricing • Enterprise SLA included
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-4xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Our Credit System?</h2>
            <p className="text-gray-600">Designed to be fair, transparent, and cost-effective for all users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">No Surprises</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Transparent pricing with no hidden fees. You always know exactly what you&apos;re paying for.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Optimization</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our intelligent caching and session management automatically reduces your costs.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pay As You Go</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Only pay for what you actually use. Perfect for both occasional and heavy users.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Always Supported</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Get help when you need it with our responsive support team and comprehensive docs.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about our credit system</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How do credits work exactly?",
                answer:
                  "Credits are consumed when you translate content. New translations cost 1 credit, cached translations cost 0.5 credits, and repeated translations within the same session are free.",
              },
              {
                question: "What happens when I run out of credits?",
                answer:
                  "You can purchase additional credits or upgrade to an enterprise plan. We'll notify you before you run out so you can plan accordingly.",
              },
              {
                question: "Do credits expire?",
                answer: "No, your credits never expire. Use them at your own pace without any time pressure.",
              },
              {
                question: "Can I see my credit usage?",
                answer:
                  "Yes, you can track your credit usage in real-time through your dashboard, including detailed breakdowns of how credits were consumed.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="p-6 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
