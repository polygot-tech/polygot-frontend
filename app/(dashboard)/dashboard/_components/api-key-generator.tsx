"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Key,
  Copy,
  CheckCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Shield,
  Lock,
  ArrowRight,
  ArrowLeft,
  Info,
  AlertCircle,
  Sparkles,
  Unlock,
} from "lucide-react"
import { useAuthStore } from "@/store/auth.store"
import { checkApiKey, createApiKey, getApiKey } from "@/hooks/useKeys"

type GenerationStep = "initial" | "password" | "generated" | "verify-password"


export function ApiKeyGenerator() {
  const [currentStep, setCurrentStep] = useState<GenerationStep>("initial")
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showVerifyPassword, setShowVerifyPassword] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [copied, setCopied] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [verifyError, setVerifyError] = useState("")
  const [mounted, setMounted] = useState(false)
  const { user, token } = useAuthStore()

  async function checkApiKeyExists() {

    if (user?.email && token) {
      const res = await checkApiKey(user?.email )
      if (res == null) {
        setCurrentStep("initial")
      } else {
        // API key exists, prompt for password verification
        setCurrentStep("verify-password")
      }
    }
  }

  async function createApiKeyAsync() {
    if (!validatePassword()) return
    try {
      setIsGenerating(true)
      if (user?.email) {
        const res = await createApiKey(user.email, password)
        if (res.api_key) {
          setApiKey(res.api_key)
          setCurrentStep("generated")
        }
      }
    } catch {
      alert("Could not generate api key")
    } finally {
      setIsGenerating(false)
    }
  }

  async function verifyPasswordAndGetKey() {
    if (!verifyPassword.trim()) {
      setVerifyError("Password is required")
      return
    }

    try {
      setIsVerifying(true)
      setVerifyError("")
      if (user?.email) {
        const res = await getApiKey(user.email, verifyPassword)
        if (res && res.api_key) {
          setApiKey(res.api_key)
          setCurrentStep("generated")
        } else {
          setVerifyError("Invalid password. Please try again.")
        }
      }
    } catch {
      setVerifyError("Failed to verify password. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  useEffect(() => {
    checkApiKeyExists()
    setMounted(true)
  }, [])

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return false
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError("Password must contain uppercase, lowercase, and number")
      return false
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return false
    }
    setPasswordError("")
    return true
  }

  const copyToClipboard = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Failed to copy to clipboard:", error)
      }
    }
  }

  const getStepIndex = () => {
    switch (currentStep) {
      case "initial":
        return 0
      case "password":
        return 1
      case "verify-password":
        return 1
      case "generated":
        return 2
      default:
        return 0
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Apple-style Progress Indicator */}
      <div className="flex items-center justify-center mb-16">
        <div className="flex items-center space-x-3">
          {[0, 1, 2].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`relative w-3 h-3 rounded-full transition-all duration-700 ease-out ${
                  step <= getStepIndex() ? "bg-green-600 scale-100" : "bg-gray-200 scale-75"
                }`}
              >
                {step <= getStepIndex() && (
                  <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-20" />
                )}
              </div>
              {step < 2 && (
                <div
                  className={`w-16 h-0.5 mx-3 transition-all duration-700 ease-out ${
                    step < getStepIndex() ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Container with Smooth Transitions */}
      <div className="relative overflow-hidden">
        {/* Step 1: Welcome */}
        <div
          className={`transition-all duration-700 ease-out ${
            currentStep === "initial"
              ? "opacity-100 translate-x-0"
              : currentStep === "password" || currentStep === "verify-password"
                ? "opacity-0 -translate-x-full absolute inset-0"
                : "opacity-0 -translate-x-full absolute inset-0"
          }`}
        >
          <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-2xl shadow-green-600/5">
            <CardContent className="p-12 text-center">
              {/* Hero Icon */}
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-600/25 transform hover:scale-105 transition-transform duration-300">
                  <Key className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse" />
              </div>

              {/* Typography - Apple Style */}
              <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
                Create Your
                <span className="font-medium bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  {" "}
                  API Key
                </span>
              </h1>
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-12 max-w-md mx-auto">
                Secure access to polygot&apos;s AI translation engine with enterprise-grade protection
              </p>

              {/* Subtle Info Card */}
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-100/50">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 mb-1">One API key per account</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      You&apos;ll create a secure password that cannot be recovered if lost
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => setCurrentStep("password")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Step 2: Password Verification (for existing API key) */}
        <div
          className={`transition-all duration-700 ease-out ${
            currentStep === "verify-password"
              ? "opacity-100 translate-x-0"
              : currentStep === "initial"
                ? "opacity-0 translate-x-full absolute inset-0"
                : "opacity-0 -translate-x-full absolute inset-0"
          }`}
        >
          <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-600/5">
            <CardContent className="p-12">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/25 mb-6">
                  <Unlock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">Welcome Back</h2>
                <p className="text-lg text-gray-600 font-light">Enter your password to access your existing API key</p>
              </div>

              {/* Info */}
              <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">API key found</p>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      We found an existing API key for your account. Enter your password to retrieve it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6 max-w-sm mx-auto">
                <div className="space-y-3">
                  <Label htmlFor="verifyPassword" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="verifyPassword"
                      type={showVerifyPassword ? "text" : "password"}
                      value={verifyPassword}
                      onChange={(e) => {
                        setVerifyPassword(e.target.value)
                        setVerifyError("")
                      }}
                      placeholder="Enter your password"
                      className="pr-12 h-12 text-base border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          verifyPasswordAndGetKey()
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showVerifyPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {verifyError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{verifyError}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-10 max-w-sm mx-auto">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("initial")}
                  className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  disabled={isVerifying}
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={verifyPasswordAndGetKey}
                  disabled={isVerifying || !verifyPassword.trim()}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:transform-none disabled:hover:scale-100"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Access Key
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 3: Password Setup (for new API key) */}
        <div
          className={`transition-all duration-700 ease-out ${
            currentStep === "password"
              ? "opacity-100 translate-x-0"
              : currentStep === "initial"
                ? "opacity-0 translate-x-full absolute inset-0"
                : "opacity-0 -translate-x-full absolute inset-0"
          }`}
        >
          <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-2xl shadow-amber-600/5">
            <CardContent className="p-12">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-600/25 mb-6">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">Secure Your Key</h2>
                <p className="text-lg text-gray-600 font-light">Create a strong password to protect your API access</p>
              </div>

              {/* Warning */}
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-900 mb-1">Password cannot be recovered</p>
                    <p className="text-sm text-red-700 leading-relaxed">
                      Store it securely — we cannot reset it if forgotten
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6 max-w-sm mx-auto">
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="pr-12 h-12 text-base border-gray-200 rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="pr-12 h-12 text-base border-gray-200 rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{passwordError}</p>
                    </div>
                  </div>
                )}

                {/* Requirements */}
                <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-5 border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-900 mb-4">Requirements</h4>
                  <div className="space-y-2">
                    {[
                      { test: password.length >= 8, label: "8+ characters" },
                      { test: /(?=.*[a-z])/.test(password), label: "Lowercase letter" },
                      { test: /(?=.*[A-Z])/.test(password), label: "Uppercase letter" },
                      { test: /(?=.*\d)/.test(password), label: "Number" },
                    ].map((req, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle
                          className={`w-4 h-4 transition-colors duration-300 ${
                            req.test ? "text-green-500" : "text-gray-300"
                          }`}
                        />
                        <span
                          className={`text-sm transition-colors duration-300 ${
                            req.test ? "text-green-700" : "text-gray-500"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-10 max-w-sm mx-auto">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("initial")}
                  className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={createApiKeyAsync}
                  disabled={isGenerating || !password || !confirmPassword}
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:transform-none disabled:hover:scale-100"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Key
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 4: Success */}
        <div
          className={`transition-all duration-700 ease-out ${
            currentStep === "generated" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute inset-0"
          }`}
        >
          {apiKey && (
            <div className="space-y-8">
              {/* Success Header */}
              <Card className="border-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 shadow-2xl shadow-green-600/10">
                <CardContent className="p-12 text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-600/25">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-8 h-8 text-green-400 animate-pulse" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
                    Key Ready
                    <span className="font-medium bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                      {" "}
                      Successfully
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 font-light">Your API key is ready for integration</p>
                </CardContent>
              </Card>

              {/* API Key Display */}
              <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-2xl shadow-gray-600/5">
                <CardContent className="p-10">
                  <h3 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-tight">Your API Key</h3>
                  <div className="relative mb-8">
                    <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50">
                      <div className="flex items-center gap-4">
                        <code className="flex-1 text-sm font-mono text-gray-800 break-all bg-white/60 p-4 rounded-xl">
                          {apiKey}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="flex-shrink-0 h-12 w-12 rounded-xl border-green-200 hover:bg-green-50 transition-all duration-200 transform hover:scale-105 bg-transparent"
                        >
                          {copied ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Security Reminder */}
                  <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-100 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-900 mb-1">Keep it secure</p>
                        <p className="text-sm text-amber-700 leading-relaxed">
                          Store your API key and password in environment variables for production use
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
