"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Settings, Server, Code, Activity, ArrowRight, Zap, AlertCircle, RefreshCw } from 'lucide-react'
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { useApps } from "@/hooks/useApps"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"

interface App {
  id: string
  name: string
  icon: string
  createdAt: Date
  status: "active" | "inactive"
  environment: "production" | "development"
  lastDeployed?: Date
  translations?: number
  languages?: number
  clientId?: string
}


export default function ApplicationsDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAppName, setNewAppName] = useState("")
  const router = useRouter()
  const {
    token,
    isLoading: authLoading,
    checkAuthStatus,
  } = useAuthStore()

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  const {
    appsQuery,
    createApp,
    createAppMutation,
  } = useApps(token as string)

  useEffect(() => {
    if (!authLoading && !token) {
      router.replace("/")
    }
  }, [authLoading, token, router])

  // Transform API data to component format
  const transformedApps: App[] = (appsQuery.data || []).map((apiApp) => ({
    id: apiApp.app_id,
    name: apiApp.app_name,
    icon: apiApp.app_name.charAt(0).toUpperCase(),
    createdAt: new Date(), // API doesn't provide this, using current date
    status: apiApp.is_active ? "active" : "inactive",
    environment: apiApp.production ? "production" : "development",
    translations: parseInt(apiApp.translations_done) || 0,
    clientId: apiApp.client_id,
  }))

  const handleCreateApp = async () => {
    if (!newAppName.trim()) return
    
    try {
      await createApp({ app_name: newAppName.trim() })
      setNewAppName("")
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to create app:", error)
    }
  }



  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      <Header />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="border border-gray-200 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-14 h-14 rounded-2xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Skeleton className="h-12 w-full rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  // Show loading skeleton while fetching data
  if (appsQuery.isLoading) {
    return <LoadingSkeleton />
  }

  // Show error state
  if (appsQuery.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
        <Header />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[70vh]">
            <Card className="w-full max-w-2xl text-center border border-red-200 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardContent className="pt-16 pb-12 px-12">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center shadow-inner">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Failed to Load Applications
                </h3>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
                  We encountered an error while fetching your applications. Please try again.
                </p>
                <Button
                  onClick={() => appsQuery.refetch()}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 h-14 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={appsQuery.isFetching}
                >
                  {appsQuery.isFetching ? (
                    <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                  ) : (
                    <RefreshCw className="w-5 h-5 mr-3" />
                  )}
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #10b981 1px, transparent 1px),
              linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Subtle Background Orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-200/5 rounded-full blur-3xl"
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
      </div>

      <Header />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Show creation error if any */}
        {createAppMutation.error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Failed to create application. Please try again.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {transformedApps.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center min-h-[70vh]"
            >
              <Card className="w-full max-w-2xl text-center border border-gray-200 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="pt-16 pb-12 px-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center shadow-inner relative"
                  >
                    <Plus className="w-12 h-12 text-green-600" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4"
                  >
                    Welcome to Polygot
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto"
                  >
                    Transform your applications into global platforms with AI-powered translation. Create your first
                    application to get started.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-4 h-14 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                          Create Your First Application
                          <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl">
                        <DialogHeader className="text-center pb-2">
                          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Create New Application
                          </DialogTitle>
                          <DialogDescription className="text-gray-600 text-base">
                            Give your application a memorable name. You can configure translation settings later.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-6">
                          <div className="space-y-3">
                            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                              Application Name
                            </Label>
                            <Input
                              id="name"
                              placeholder="My Awesome App"
                              value={newAppName}
                              onChange={(e) => setNewAppName(e.target.value)}
                              className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-xl text-base"
                              onKeyDown={(e) => e.key === "Enter" && handleCreateApp()}
                              disabled={createAppMutation.isPending}
                            />
                          </div>
                        </div>
                        <DialogFooter className="gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            className="border-gray-300 hover:bg-gray-50 h-11 px-6 rounded-xl"
                            disabled={createAppMutation.isPending}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleCreateApp}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-11 px-6 rounded-xl"
                            disabled={!newAppName.trim() || createAppMutation.isPending}
                          >
                            {createAppMutation.isPending ? (
                              <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              "Create Application"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="apps-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6"
              >
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                    Your{" "}
                    <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Applications
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl">
                    Manage and monitor your global applications with real-time translation analytics.
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      New Application
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl">
                    <DialogHeader className="text-center pb-2">
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Create New Application
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 text-base">
                        Give your application a memorable name. You can configure translation settings later.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Application Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="My Awesome App"
                          value={newAppName}
                          onChange={(e) => setNewAppName(e.target.value)}
                          className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-xl text-base"
                          onKeyDown={(e) => e.key === "Enter" && handleCreateApp()}
                          disabled={createAppMutation.isPending}
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-gray-300 hover:bg-gray-50 h-11 px-6 rounded-xl"
                        disabled={createAppMutation.isPending}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateApp}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-11 px-6 rounded-xl"
                        disabled={!newAppName.trim() || createAppMutation.isPending}
                      >
                        {createAppMutation.isPending ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create Application"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </motion.div>

              {/* Applications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {transformedApps.map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="border border-gray-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-2xl hover:shadow-green-100/20 rounded-2xl overflow-hidden h-full">
                      <CardHeader className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-14 h-14 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-xl">{app.icon}</span>
                              </div>
                              <motion.div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                                  app.status === "active" ? "bg-green-400" : "bg-gray-400"
                                }`}
                                animate={app.status === "active" ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              />
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                          {app.name}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge
                            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                              app.status === "active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                          >
                            <Activity className="w-3 h-3 mr-1" />
                            {app.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                          <Badge
                            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                              app.environment === "production"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-orange-50 text-orange-700 border-orange-200"
                            }`}
                          >
                            {app.environment === "production" ? (
                              <>
                                <Server className="w-3 h-3 mr-1" />
                                Production
                              </>
                            ) : (
                              <>
                                <Code className="w-3 h-3 mr-1" />
                                Development
                              </>
                            )}
                          </Badge>
                        </div>

                        {/* Stats */}
                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-green-600" />
                              <span>Translations</span>
                            </div>
                            <span className="font-semibold text-gray-900">
                              {app.translations?.toLocaleString() || 0}
                            </span>
                          </div>
                          
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-2">
                        <Link href={`/dashboard/${app.id}`}>
                          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 h-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-0 group">
                            <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Configure Application
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
