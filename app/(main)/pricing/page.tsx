"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  CalendarDays,
  CreditCard,
  Lock,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useCreatePayment } from "@/hooks/usePayments"

interface PaymentFormData {
  name: string
  email: string
  city: string
  state: string
  country: string
  street: string
  zipcode: string
}

export default function PricingPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null)
  const [formData, setFormData] = useState<PaymentFormData>({
    name: "",
    email: "",
    city: "",
    state: "",
    country: "",
    street: "",
    zipcode: "",
  })

  const token = "test_token" // Replace with your actual token retrieval logic

  const { mutate: createPayment, isPending, data, error, isSuccess, isError } = useCreatePayment(token || "")

  // Handle payment response effects
  useEffect(() => {
    if (isSuccess && data) {
      console.log("Payment creation successful:", data)
      toast.success("Payment link created successfully!")

      // If the API returns a payment link, redirect to it
      if (data.paymentLink) {
        console.log("Redirecting to payment link:", data.paymentLink)
        window.open(data.paymentLink, "_blank")
      }

      // Close the dialog
      setIsDialogOpen(false)

      // Reset form data
      setFormData({
        name: "",
        email: "",
        city: "",
        state: "",
        country: "",
        street: "",
        zipcode: "",
      })
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError && error) {
      console.error("Payment creation failed:", error)
      toast.error("Failed to create payment. Please try again.")
    }
  }, [isError, error])

  const handleContactSales = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=admin@polygot.tech&su=Polygot%20Enterprise%20Plan%20Inquiry&body=Hi,%20I'm%20interested%20in%20learning%20more%20about%20polygot's%20enterprise%20translation%20solutions.",
      "_blank",
    )
  }

  const handlePlanSelect = (planName: string, price: string) => {
    return 
    setSelectedPlan({ name: planName, price })
    setIsDialogOpen(true)
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContinueToPayment = async () => {
    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.street ||
      !formData.zipcode
    ) {
      toast.error("Please fill in all required fields.")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    console.log("Creating payment with data:", {
      plan: selectedPlan,
      customer: formData,
    })

    // Create payment
    createPayment({
      customer:formData,
      type:selectedPlan?.name.toLowerCase() as string
    })
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        <main className="container mx-auto px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20 blur-3xl rounded-full"></div>
              <Badge className="relative mb-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0 px-8 py-4 text-sm font-medium shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300">
                <Sparkles className="mr-2 h-4 w-4" />
                Simple & Transparent Pricing
              </Badge>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-gray-900 mb-8 leading-none">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
                Perfect Plan
              </span>
            </h1>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl leading-relaxed text-gray-600 mb-16 font-light">
              Start free and scale as you grow. Translations on the same device are cached and completely free.
            </p>
            <div className="flex justify-center items-center gap-12 text-sm text-gray-600">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Users className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold">50,000+ developers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 font-semibold">4.9/5</span>
              </div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="max-w-7xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Free Plan */}
              <Card className="relative overflow-hidden border-0 bg-white/95 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/30"></div>
                <div className="absolute top-6 right-6">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2 font-semibold">
                    <Gift className="h-4 w-4 mr-2" />
                    Free Forever
                  </Badge>
                </div>
                <CardHeader className="relative text-center pb-8 pt-12">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Globe className="h-10 w-10 text-emerald-700" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Starter</CardTitle>
                  <p className="text-gray-600 mb-8 text-lg">Perfect for trying polygot</p>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-6xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        Free
                      </span>
                    </div>
                    <p className="text-gray-500 font-medium">No credit card required</p>
                  </div>
                </CardHeader>
                <CardContent className="relative space-y-8 px-8 pb-8">
                  <div className="space-y-5">
                    {[
                      "1 app maximum",
                      "1,000 total translations",
                      "20+ supported languages",
                      "Same device caching (free repeats)",
                      "Community support",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6">
                    <Link href="/">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl">
                        Start Free Now
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-emerald-50/30 to-green-50/20 backdrop-blur-xl shadow-3xl hover:shadow-4xl transition-all duration-700 hover:-translate-y-3 group scale-105 ring-2 ring-emerald-200/50">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
                <div
                  className="absolute top-0 right-0 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 text-sm font-bold shadow-xl"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)" }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
                <CardHeader className="relative text-center pb-8 pt-16">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-600 to-green-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Pro</CardTitle>
                  <p className="text-gray-600 mb-8 text-lg">For growing businesses</p>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-6xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        $19
                      </span>
                      <span className="text-gray-500 text-xl font-medium">/month</span>
                    </div>
                    <p className="text-gray-500 font-medium">Billed monthly</p>
                  </div>
                </CardHeader>
                <CardContent className="relative space-y-8 px-8 pb-8">
                  <div className="space-y-5">
                    {[
                      "2 apps maximum",
                      "30,000 total translations",
                      "1 month validity",
                      "50+ supported languages",
                      "Same device caching (free repeats)",
                      "Priority support",
                      "Advanced analytics",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-gray-700 font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6">
                    <Button
                      onClick={() => handlePlanSelect("Pro", "$19")}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-xl"
                    >
                      Get Started
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Business Plan */}
              <Card className="relative overflow-hidden border-0 bg-white/95 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/30"></div>
                <CardHeader className="relative text-center pb-8 pt-12">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <CalendarDays className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Business</CardTitle>
                  <p className="text-gray-600 mb-8 text-lg">For large-scale projects</p>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-6xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        $99
                      </span>
                      <span className="text-gray-500 text-xl font-medium">/month</span>
                    </div>
                    <p className="text-gray-500 font-medium">Billed monthly</p>
                  </div>
                </CardHeader>
                <CardContent className="relative space-y-8 px-8 pb-8">
                  <div className="space-y-5">
                    {[
                      "4 apps maximum",
                      "Unlimited translations",
                      "2 months validity",
                      "All supported languages",
                      "Same device caching (free repeats)",
                      "24/7 dedicated support",
                      "Custom integrations",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6">
                    <Button
                      onClick={() => handlePlanSelect("Business", "$99")}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
                    >
                      Get Started
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative overflow-hidden border-0 bg-white/95 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-slate-50/30"></div>
                <CardHeader className="relative text-center pb-8 pt-12">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Enterprise</CardTitle>
                  <p className="text-gray-600 mb-8 text-lg">Custom solutions</p>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-6xl font-black bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                        Custom
                      </span>
                    </div>
                    <p className="text-gray-500 font-medium">Volume discounts available</p>
                  </div>
                </CardHeader>
                <CardContent className="relative space-y-8 px-8 pb-8">
                  <div className="space-y-5">
                    {[
                      "Unlimited apps",
                      "Custom translation limits",
                      "All supported languages",
                      "Same device caching (free repeats)",
                      "24/7 dedicated support",
                      "Custom integrations",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6">
                    <Button
                      onClick={handleContactSales}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
                    >
                      <Mail className="mr-3 h-5 w-5" />
                      Contact Sales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Polygot Section */}
          <section className="max-w-7xl mx-auto mb-20">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-8">
                Why Choose
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                  {" "}
                  Polygot?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
                Seamless translations for both mobile apps and web applications, trusted by developers worldwide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Smartphone,
                  title: "Mobile Apps",
                  description:
                    "Perfect integration with React Native. Seamless user experience across all mobile platforms.",
                  color: "emerald",
                },
                {
                  icon: Monitor,
                  title: "Web Applications",
                  description: "Works flawlessly with React, Tanstack and NextJS. One line of code for global reach.",
                  color: "green",
                },
                {
                  icon: Code,
                  title: "Developer First",
                  description:
                    "Built by developers, for developers. Simple integration, powerful features, and comprehensive documentation.",
                  color: "teal",
                },
                {
                  icon: Shield,
                  title: "Smart Caching",
                  description:
                    "Translations on the same device are automatically cached and free. Intelligent optimization saves you money.",
                  color: "purple",
                },
                {
                  icon: Rocket,
                  title: "Lightning Fast",
                  description:
                    "AI-powered translations in milliseconds. Your users won't even notice the magic happening behind the scenes.",
                  color: "blue",
                },
                {
                  icon: Globe,
                  title: "Global Reach",
                  description:
                    "Support for 50+ languages with perfect context understanding. Reach every corner of the world effortlessly.",
                  color: "amber",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 border border-gray-100 hover:border-emerald-200 transition-all duration-500 cursor-pointer hover:-translate-y-3 shadow-xl hover:shadow-2xl"
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-${feature.color}-100 text-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Payment Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8">
              <DialogHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <DialogTitle className="text-3xl font-bold text-gray-900">Complete Your Order</DialogTitle>
                <p className="text-gray-600 mt-2">
                  You&apos;re subscribing to the <span className="font-semibold text-emerald-600">{selectedPlan?.name}</span>{" "}
                  plan for <span className="font-semibold text-emerald-600">{selectedPlan?.price}/month</span>
                </p>
              </DialogHeader>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street" className="text-sm font-semibold text-gray-700">
                  Street Address
                </Label>
                <Input
                  id="street"
                  placeholder="123 Main Street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                    State
                  </Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipcode" className="text-sm font-semibold text-gray-700">
                    ZIP Code
                  </Label>
                  <Input
                    id="zipcode"
                    placeholder="10001"
                    value={formData.zipcode}
                    onChange={(e) => handleInputChange("zipcode", e.target.value)}
                    className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-semibold text-gray-700">
                  Country
                </Label>
                <Input
                  id="country"
                  placeholder="United States"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mt-8">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-emerald-600">{selectedPlan?.price}/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed monthly • Cancel anytime</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                  <p className="text-red-600 text-sm font-medium">
                    Error: {error.message || "Something went wrong. Please try again."}
                  </p>
                </div>
              )}

              <Button
                onClick={handleContinueToPayment}
                disabled={isPending || !token}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="mr-3 h-5 w-5" />
                {isPending ? "Processing..." : "Continue to Payment"}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your payment information is secure and encrypted. By continuing, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

