"use client"

import type { ReactNode } from "react"
import { Check } from "lucide-react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  highlight?: boolean
}

export function FeatureCard({ icon, title, description, highlight = false }: FeatureCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
        highlight
          ? "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
            highlight ? "bg-emerald-100" : "bg-gray-100"
          }`}
        >
          {highlight ? <Check className="h-4 w-4 text-emerald-600" /> : <div className="text-gray-600">{icon}</div>}
        </div>
        <div className="space-y-1">
          <h4 className={`font-medium ${highlight ? "text-emerald-900" : "text-gray-900"}`}>{title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
