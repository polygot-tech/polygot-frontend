"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Trash2, AlertTriangle, Save, RefreshCw, CheckCircle, Globe, Copy, Trash } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useApps } from "@/hooks/useApps"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthStore } from "@/store/auth.store"

interface AppSettings {
  id: string
  name: string
  icon: string
  isProdMode: boolean
  isEnabled: boolean
}

export default function AppConfigPage() {
  const params = useParams()
  const router = useRouter()
  const appId = params.id as string
  const {token} = useAuthStore()

  const {
    appsQuery,
    updateApp,
    updateAppMutation,
    addOrigin,
    addOriginMutation,
    deleteApp,
    deleteAppMutation,
    useGetOriginsQuery,
  } = useApps(token as string)

  // Get origins for this specific app
  const originsQuery = useGetOriginsQuery(appId)

  const [appSettings, setAppSettings] = useState<AppSettings | null>(null)
  const [newUrl, setNewUrl] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [copiedAppId, setCopiedAppId] = useState(false)

  // Find the current app from the query data
  const currentApp = appsQuery.data?.find((app) => app.app_id === appId)

  useEffect(() => {
    if (currentApp) {
      const transformedApp: AppSettings = {
        id: currentApp.app_id,
        name: currentApp.app_name,
        icon: currentApp.app_name.charAt(0).toUpperCase(),
        isProdMode: currentApp.production,
        isEnabled: currentApp.is_active,
      }
      setAppSettings(transformedApp)
    }
  }, [currentApp])

  const addUrl = async () => {
    if (!newUrl.trim() || !appSettings) return

    try {
      await addOrigin({
        app_id: appSettings.id,
        origins: newUrl.trim(),
      })
      setNewUrl("")
    } catch (error) {
      console.error("Failed to add origin:", error)
    }
  }

  const removeUrl = async (originToRemove: string) => {
    if (!appSettings || !originsQuery.data) return

    try {
      // Get all current origins except the one we want to remove
      const remainingOrigins = originsQuery.data
        .filter((origin) => origin.origin !== originToRemove)
        .map((origin) => origin.origin)

      // If there are remaining origins, update with the new list
      // If no origins remain, we still need to call the API to clear them
      const originsString = remainingOrigins.length > 0 ? remainingOrigins.join(",") : ""

      await addOrigin({
        app_id: appSettings.id,
        origins: originsString,
      })
    } catch (error) {
      console.error("Failed to remove origin:", error)
    }
  }

  const toggleProdMode = (checked: boolean) => {
    if (!appSettings) return
    setAppSettings((prev) => (prev ? { ...prev, isProdMode: checked } : null))
    setHasChanges(true)
  }

  const toggleEnabled = (checked: boolean) => {
    if (!appSettings) return
    setAppSettings((prev) => (prev ? { ...prev, isEnabled: checked } : null))
    setHasChanges(true)
  }

  const saveChanges = async () => {
    if (!appSettings) return

    try {
      await updateApp({
        app_id: appSettings.id,
        production: appSettings.isProdMode,
        is_active: appSettings.isEnabled,
      })

      setHasChanges(false)
      setShowSuccess(true)

      // Hide success message and navigate back after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
        router.push("/application")
      }, 2000)
    } catch (error) {
      console.error("Failed to save changes:", error)
    }
  }

  const handleDeleteApp = async () => {
    if (!appSettings) return

    try {
      await deleteApp({ app_id: appSettings.id })
      setShowDeleteDialog(false)
      router.push("/application")
    } catch (error) {
      console.error("Failed to delete app:", error)
    }
  }

  const copyAppId = async () => {
    if (!appSettings) return

    try {
      await navigator.clipboard.writeText(appSettings.id)
      setCopiedAppId(true)
      setTimeout(() => setCopiedAppId(false), 2000)
    } catch (error) {
      console.error("Failed to copy app ID:", error)
    }
  }

  const hasLocalhostUrls =
    originsQuery.data?.some((origin) => origin.origin.includes("localhost") || origin.origin.includes("127.0.0.1")) ||
    false

  // Loading state
  if (appsQuery.isLoading || !appSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
        <div className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-slate-200 shadow-sm">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-96" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (appsQuery.error || !currentApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 flex items-center justify-center">
        <Card className="w-full max-w-md text-center border border-red-200 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardContent className="pt-12 pb-8 px-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Application Not Found</h3>
            <p className="text-gray-600 mb-6">
              The application you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Link href="/application">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Applications
              </Button>
            </Link>
          </CardContent>
        </Card>
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

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 right-4 z-50"
          >
            <Alert className="border-green-200 bg-green-50 shadow-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                Settings saved successfully! Redirecting...
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy Success Toast */}
      <AnimatePresence>
        {copiedAppId && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Alert className="border-blue-200 bg-blue-50 shadow-lg">
              <Copy className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 font-medium">App ID copied to clipboard!</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Link href="/application">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 bg-white/50 hover:bg-white border-slate-300 hover:border-green-300 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{appSettings.icon}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {appSettings.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyAppId}
                      className="text-sm text-slate-500 hover:text-green-600 font-mono bg-slate-100 hover:bg-green-50 px-2 py-1 rounded transition-all duration-200 flex items-center gap-1"
                      title="Click to copy App ID"
                    >
                      ID: {appSettings.id}
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete App Button */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200 bg-transparent"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete App
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl">
                <DialogHeader className="text-center pb-2">
                  <DialogTitle className="text-2xl font-bold text-red-600">Delete Application</DialogTitle>
                  <DialogDescription className="text-gray-600 text-base">
                    This action cannot be undone. This will permanently delete the application and all its data.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>Warning:</strong> Deleting &quot;{appSettings.name}&quot; will remove all origins, translations, and
                      configuration data.
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter className="gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDeleteDialog(false)}
                    className="border-gray-300 hover:bg-gray-50 h-11 px-6 rounded-xl"
                    disabled={deleteAppMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteApp}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-11 px-6 rounded-xl"
                    disabled={deleteAppMutation.isPending}
                  >
                    {deleteAppMutation.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash className="w-4 h-4 mr-2" />
                        Delete Application
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Production Mode Alert */}
          <AnimatePresence>
            {appSettings.isProdMode && hasLocalhostUrls && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Alert className="border-amber-200 bg-amber-50/80 backdrop-blur-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <strong>Warning:</strong> You have localhost URLs configured, but the app is in production mode.
                    Localhost URLs will not work in production environment.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Update Error Alert */}
          <AnimatePresence>
            {(updateAppMutation.error || addOriginMutation.error || deleteAppMutation.error) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Failed to save changes. Please try again.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* App Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-slate-200/50 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-slate-200/50">
                <CardTitle className="text-xl font-bold text-slate-900">Application Status</CardTitle>
                <CardDescription className="text-slate-600">
                  Control your application&apos;s environment and availability
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/50 to-slate-100/50 rounded-xl border border-slate-200/50 hover:border-green-300/50 transition-all duration-200"
                >
                  <div className="space-y-1">
                    <Label className="text-base font-semibold text-slate-900">Production Mode</Label>
                    <div className="text-sm text-slate-600">Enable production environment settings</div>
                  </div>
                  <Switch
                    checked={appSettings.isProdMode}
                    onCheckedChange={toggleProdMode}
                    className="data-[state=checked]:bg-green-600"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/50 to-slate-100/50 rounded-xl border border-slate-200/50 hover:border-green-300/50 transition-all duration-200"
                >
                  <div className="space-y-1">
                    <Label className="text-base font-semibold text-slate-900">Application Enabled</Label>
                    <div className="text-sm text-slate-600">Allow requests to this application</div>
                  </div>
                  <Switch
                    checked={appSettings.isEnabled}
                    onCheckedChange={toggleEnabled}
                    className="data-[state=checked]:bg-green-600"
                  />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Authorized Origins */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-slate-200/50 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-slate-200/50">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Authorized Origins
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Configure which origins are allowed to access your application
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Origins List */}
                <div className="space-y-3">
                  {originsQuery.isLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : originsQuery.error ? (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        Failed to load origins. Please refresh the page.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <AnimatePresence>
                      {originsQuery.data?.map((origin) => (
                        <motion.div
                          key={origin.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50/50 to-slate-100/50 rounded-xl border border-slate-200/50 group hover:bg-slate-100/80 hover:border-green-300/50 transition-all duration-200"
                        >
                          <div className="flex-1 font-mono text-sm text-slate-700 bg-white/80 px-3 py-2 rounded-lg border border-slate-200/50">
                            {origin.origin}
                          </div>
                          <div className="flex items-center gap-2">
                            {origin.is_active ? (
                              <div className="w-2 h-2 bg-green-400 rounded-full" title="Active" />
                            ) : (
                              <div className="w-2 h-2 bg-gray-400 rounded-full" title="Inactive" />
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeUrl(origin.origin)}
                              disabled={addOriginMutation.isPending}
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              {addOriginMutation.isPending ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                      {(!originsQuery.data || originsQuery.data.length === 0) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-8 text-slate-500"
                        >
                          <Globe className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                          <p>No origins configured yet</p>
                          <p className="text-sm">Add your first origin below</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>

                {/* Add New Origin */}
                <div className="flex space-x-3">
                  <Input
                    placeholder="https://example.com"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addUrl()}
                    className="flex-1 border-slate-300 focus:border-green-500 focus:ring-green-500 rounded-xl bg-white/80"
                    disabled={addOriginMutation.isPending}
                  />
                  <Button
                    onClick={addUrl}
                    disabled={!newUrl.trim() || addOriginMutation.isPending}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {addOriginMutation.isPending ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    {addOriginMutation.isPending ? "Adding..." : "Add Origin"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end pt-4"
          >
            <Button
              onClick={saveChanges}
              disabled={!hasChanges || updateAppMutation.isPending}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {updateAppMutation.isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Save Changes
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
