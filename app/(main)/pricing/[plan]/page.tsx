"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ArrowRight, Home } from "lucide-react"

export default function PaymentStatusPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  const plan = params.plan as string
  const status = searchParams.get("status")
  const isSuccess = status === "succeeded"
  const isFailed = status === "failed"

  // Capitalize plan name for display
  const planName = plan?.charAt(0).toUpperCase() + plan?.slice(1)

  useEffect(() => {
    // Only start countdown if we have a valid status
    if (isSuccess || isFailed) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // router.push("/")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isSuccess, isFailed, router])

  const handleGoHome = () => {
    router.push("/")
  }

  // If no status parameter, show invalid page
  if (!isSuccess && !isFailed) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-md">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <XCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Page</h1>
              <p className="text-gray-600 mb-6">This page requires a valid status parameter.</p>
              <Button onClick={handleGoHome} className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-2xl">
        <Card className="w-full overflow-hidden border-0 bg-white/95 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
            {isSuccess ? (
              <>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-2">
                  Welcome to Polygot <span className="font-semibold text-emerald-600">{planName}</span>!
                </p>
                <p className="text-gray-500 mb-4">
                  Your subscription has been activated successfully. You can now enjoy all the features of your plan.
                </p>
                <div className="bg-emerald-50 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-emerald-800 mb-2">What&apos;s Next?</h3>
                  <ul className="text-emerald-700 text-sm space-y-1">
                    <li>• Access your dashboard to start using Polygot</li>
                    <li>• Explore the documentation and tutorials</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <XCircle className="h-10 w-10 text-red-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Payment Failed</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-2">
                  We couldn&apos;t process your payment for the{" "}
                  <span className="font-semibold text-red-600">{planName}</span> plan.
                </p>
                <p className="text-gray-500 mb-4">
                  Don&apos;t worry, no charges were made to your account. Please try again or contact support if the
                  issue persists.
                </p>
                <div className="bg-red-50 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-red-800 mb-2">Common Issues:</h3>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Insufficient funds in your account</li>
                    <li>• Expired or invalid payment method</li>
                   
                  </ul>
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleGoHome}
                className={`px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isSuccess
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                    : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
                }`}
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
              {isFailed && (
                <Button
                  onClick={() => router.push("/pricing")}
                  className="px-8 py-3 font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Redirecting to homepage in <span className="font-semibold text-gray-900">{countdown}</span> seconds...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    isSuccess ? "bg-emerald-500" : "bg-red-500"
                  }`}
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            {isSuccess && (
              <div className="mt-4 text-xs text-gray-500">
                <p>Need help? Contact our support team at admin@polygot.tech</p>
              </div>
            )}

            {isFailed && (
              <div className="mt-4 text-xs text-gray-500">
                <p>
                  Having trouble? Contact support at{" "}
                  <a href="mailto:admin@polygot.tech" className="text-blue-600 hover:underline">
                    admin@polygot.tech
                  </a>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
