/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Copy,
  CheckCircle,
  FileText,
  Settings,
  WebhookIcon as Hook,
  Component,
  Shield,
  FileJson,
  Terminal,
} from "lucide-react"
import { useState } from "react"
import { Header } from "@/components/layout/header"

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [copiedCode, setCopiedCode] = useState("")

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(""), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const CopyButton = ({ code, id }: { code: string; id: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => copyToClipboard(code, id)}
      className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/80 rounded-md"
    >
      {copiedCode === id ? (
        <CheckCircle className="w-4 h-4 text-emerald-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-600" />
      )}
    </Button>
  )

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "cli", label: "CLI Tool", icon: Terminal },
    { id: "provider", label: "PolygotProvider", icon: Settings },
    { id: "hook", label: "usePolygot", icon: Hook },
    { id: "component", label: "Polygot", icon: Component },
    { id: "local", label: "PolygotLocal", icon: FileJson },
    { id: "nopolygot", label: "NoPolygot", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 order-2 lg:order-1">
            <div className="sticky top-20 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4">
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                        activeSection === item.id
                          ? "bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 shadow-sm"
                          : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 order-1 lg:order-2 max-w-none lg:max-w-4xl">
            {/* Overview */}
            {activeSection === "overview" && (
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    Polygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Documentation
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    React translation library with intelligent context management and automatic content translation.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Installation</h2>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-4 sm:p-6 text-white overflow-x-auto">
                      <code className="text-sm sm:text-base">
                        <span className="text-cyan-400">npm</span> <span className="text-cyan-400">install</span>{" "}
                        <span className="text-yellow-300">polygot</span>
                      </code>
                    </pre>
                    <CopyButton code="npm install polygot" id="install" />
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Quick Start Example</h2>
                  <p className="text-gray-600 leading-relaxed">
                    This example demonstrates the updated API with enhanced language options, translation statistics,
                    and improved context management.
                  </p>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-4 sm:p-6 text-white overflow-x-auto">
                      <code className="text-xs sm:text-sm lg:text-base">
                        <span className="text-pink-400">import</span> {"{"}{" "}
                        <span className="text-green-400">useState</span>,{" "}
                        <span className="text-green-400">useEffect</span> {"}"}{" "}
                        <span className="text-pink-400">from</span> <span className="text-yellow-300">'react'</span>;
                        {"\n"}
                        <span className="text-pink-400">import</span> {"{"}{" "}
                        <span className="text-green-400">PolygotProvider</span>,{" "}
                        <span className="text-green-400">Polygot</span>,{" "}
                        <span className="text-green-400">NoPolygot</span>,{" "}
                        <span className="text-green-400">usePolygot</span> {"}"}{" "}
                        <span className="text-pink-400">from</span> <span className="text-yellow-300">'polygot'</span>;
                        {"\n\n"}
                        <span className="text-blue-400">function</span> <span className="text-green-400">App</span>(){" "}
                        {"{"}
                        {"\n  "}
                        <span className="text-pink-400">return</span> ({"\n    "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">PolygotProvider</span>
                        {"\n      "}
                        <span className="text-cyan-400">appId</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"your-app-id"</span>
                        {"\n      "}
                        <span className="text-cyan-400">sourceLanguage</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"English"</span>
                        {"\n      "}
                        <span className="text-cyan-400">defaultLanguage</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"Spanish"</span>
                        {"\n      "}
                        <span className="text-cyan-400">defaultTone</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"formal"</span>
                        {"\n      "}
                        <span className="text-cyan-400">defaultRegion</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"MX"</span>
                        {"\n    "}
                        <span className="text-gray-400">{">"}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">Dashboard</span> <span className="text-gray-400">{"/>"}</span>
                        {"\n    "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">PolygotProvider</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n  "}
                        {"}"}
                        {"\n"}
                        {"}"};{"\n\n"}
                        <span className="text-blue-400">function</span>{" "}
                        <span className="text-green-400">Dashboard</span>() {"{"}
                        {"\n  "}
                        <span className="text-blue-400">const</span> {"{"}{" "}
                        <span className="text-green-400">setLanguage</span>,{" "}
                        <span className="text-green-400">language</span>,{" "}
                        <span className="text-green-400">currentOptions</span>,{" "}
                        <span className="text-green-400">stats</span> {"}"} <span className="text-gray-400">=</span>{" "}
                        <span className="text-green-400">usePolygot</span>();
                        {"\n  "}
                        <span className="text-blue-400">const</span> {"["}
                        <span className="text-green-400">apiData</span>,{" "}
                        <span className="text-green-400">setApiData</span>
                        {"]"} <span className="text-gray-400">=</span> <span className="text-green-400">useState</span>(
                        <span className="text-purple-400">null</span>);
                        {"\n\n  "}
                        <span className="text-blue-400">const</span>{" "}
                        <span className="text-green-400">handleLanguageChange</span>{" "}
                        <span className="text-gray-400">=</span> () =&gt; {"{"}
                        {"\n    "}
                        <span className="text-green-400">setLanguage</span>({"{"}
                        {"\n      "}
                        <span className="text-yellow-300">language</span>:{" "}
                        <span className="text-yellow-300">'French'</span>,{"\n      "}
                        <span className="text-yellow-300">tone</span>: <span className="text-yellow-300">'casual'</span>
                        ,{"\n      "}
                        <span className="text-yellow-300">region</span>: <span className="text-yellow-300">'CA'</span>,
                        {"\n      "}
                        <span className="text-yellow-300">context</span>:{" "}
                        <span className="text-yellow-300">'business'</span>
                        {"\n    "}
                        {"}"});
                        {"\n  "}
                        {"}"};{"\n\n  "}
                        <span className="text-pink-400">return</span> ({"\n    "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">div</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"p-6"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">Polygot</span>{" "}
                        <span className="text-cyan-400">sourceLanguage</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"English"</span>{" "}
                        <span className="text-cyan-400">debounceMs</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-purple-400">{"{200}"}</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">h1</span>
                        <span className="text-gray-400">{">"}</span>Welcome to Dashboard
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">h1</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>Current language: {"{"}
                        <span className="text-green-400">language</span>
                        {"}"}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>Tone: {"{"}
                        <span className="text-green-400">currentOptions</span>.
                        <span className="text-green-400">tone</span>
                        {"}"}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">button</span> <span className="text-cyan-400">onClick</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-green-400">
                          {"{"}handleLanguageChange{"}"}
                        </span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        Switch to French (Canada, Casual, Business)
                        {"\n        "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">Polygot</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n\n      "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">NoPolygot</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">h3</span>
                        <span className="text-gray-400">{">"}</span>Translation Stats
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">h3</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>Total: {"{"}
                        <span className="text-green-400">stats</span>.
                        <span className="text-green-400">totalTranslations</span>
                        {"}"}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>Cache Hits: {"{"}
                        <span className="text-green-400">stats</span>.<span className="text-green-400">cacheHits</span>
                        {"}"}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">NoPolygot</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n    "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n  "}
                        {"}"}
                        {"\n"}
                        {"}"};
                      </code>
                    </pre>
                    <CopyButton
                      code={`import { useState, useEffect } from 'react';
import { PolygotProvider, Polygot, NoPolygot, usePolygot } from 'polygot';

function App() {
  return (
    <PolygotProvider
      appId="your-app-id"
      sourceLanguage="English"
      defaultLanguage="Spanish"
      defaultTone="formal"
      defaultRegion="MX"
    >
      <Dashboard />
    </PolygotProvider>
  );
}

function Dashboard() {
  const { setLanguage, language, currentOptions, stats } = usePolygot();
  const [apiData, setApiData] = useState(null);

  const handleLanguageChange = () => {
    setLanguage({
      language: 'French',
      tone: 'casual',
      region: 'CA',
      context: 'business'
    });
  };

  return (
    <div className="p-6">
      <Polygot sourceLanguage="English" debounceMs={200}>
        <h1>Welcome to Dashboard</h1>
        <p>Current language: {language}</p>
        <p>Tone: {currentOptions.tone}</p>
        <button onClick={handleLanguageChange}>
          Switch to French (Canada, Casual, Business)
        </button>
      </Polygot>

      <NoPolygot>
        <div>
          <h3>Translation Stats</h3>
          <p>Total: {stats.totalTranslations}</p>
          <p>Cache Hits: {stats.cacheHits}</p>
        </div>
      </NoPolygot>
    </div>
  );
}`}
                      id="quickstart"
                    />
                  </div>
                </section>
              </div>
            )}

            {/* CLI Tool */}
            {activeSection === "cli" && (
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    Polygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      CLI Tool
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    Generate static translation files for SEO optimization and improved performance.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Usage</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Use the Polygot CLI to extract translatable strings from your React components and generate
                    language-specific JSON files. This is ideal for server-side rendering (SSR) and SEO, as search
                    engines can crawl pre-translated content.
                  </p>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-4 sm:p-6 text-white overflow-x-auto">
                      <code className="text-sm sm:text-base">
                        <span className="text-cyan-400">npx</span> <span className="text-yellow-300">polygot</span>{" "}
                        <span className="text-green-400">filename.[tsx,jsx]</span>{" "}
                        <span className="text-purple-400">language1,language2,...</span>
                      </code>
                    </pre>
                    <CopyButton code="npx polygot filename.[tsx,jsx] language1,language2,..." id="cli-command" />
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Output Structure</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Translation files will be generated in `locales/(language_code).json`.
                  </p>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-4 sm:p-6 text-white overflow-x-auto">
                      <code className="text-sm sm:text-base">
                        <span className="text-gray-400">locales/</span>
                        {"\n"}
                        <span className="text-gray-400">├── en.json</span>
                        {"\n"}
                        <span className="text-gray-400">├── es.json</span>
                        {"\n"}
                        <span className="text-gray-400">└── fr.json</span>
                        {"\n"}
                        <span className="text-gray-500">// Example content of locales/es.json</span>
                        {"\n"}
                        <span className="text-gray-400">{"{"}</span>
                        {"\n  "}
                        <span className="text-yellow-300">"Hello World"</span>
                        <span className="text-gray-400">:</span> <span className="text-yellow-300">"Hola Mundo"</span>,
                        {"\n  "}
                        <span className="text-yellow-300">"Welcome"</span>
                        <span className="text-gray-400">:</span> <span className="text-yellow-300">"Bienvenido"</span>
                        {"\n"}
                        <span className="text-gray-400">{"}"}</span>
                      </code>
                    </pre>
                    <CopyButton
                      code={`locales/
├── en.json
├── es.json
└── fr.json

// Example content of locales/es.json
{
  "Hello World": "Hola Mundo",
  "Welcome": "Bienvenido"
}`}
                      id="cli-output"
                    />
                  </div>
                </section>
              </div>
            )}

            {/* PolygotProvider */}
            {activeSection === "provider" && (
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    PolygotProvider
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Component
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    Enhanced context provider that manages translation state with advanced options, batching, and
                    statistics.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Props</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-emerald-50/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Default</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            prop: "children",
                            type: "ReactNode",
                            default: "—",
                            desc: "Child components to provide context to",
                            required: true,
                          },
                          {
                            prop: "appId",
                            type: "string",
                            default: "—",
                            desc: "Unique application identifier for translation service",
                            required: true,
                          },
                          {
                            prop: "sourceLanguage",
                            type: "SupportedLanguage",
                            default: "undefined",
                            desc: "Source language for translations (enables auto-detection if not provided)",
                          },
                          {
                            prop: "defaultLanguage",
                            type: "SupportedLanguage",
                            default: "'English'",
                            desc: "Default target language",
                          },
                          {
                            prop: "defaultTone",
                            type: "TranslationTone",
                            default: "'neutral'",
                            desc: "Default translation tone (neutral, formal, casual, etc.)",
                          },
                          {
                            prop: "defaultRegion",
                            type: "Region",
                            default: "undefined",
                            desc: "Default region for language variants (e.g., 'US', 'UK', 'CA')",
                          },
                          {
                            prop: "defaultContext",
                            type: "string",
                            default: "undefined",
                            desc: "Default context for translations (e.g., 'business', 'casual')",
                          },
                          {
                            prop: "batchSize",
                            type: "number",
                            default: "50",
                            desc: "Number of strings to translate in each batch",
                          },
                          {
                            prop: "debounceMs",
                            type: "number",
                            default: "500",
                            desc: "Debounce delay for batching translation requests",
                          },
                        ].map((row) => (
                          <tr
                            key={row.prop}
                            className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2 flex-wrap">
                                <code className="text-xs sm:text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                                  {row.prop}
                                </code>
                                {row.required && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs bg-red-100 text-red-700 border-red-200"
                                  >
                                    required
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs sm:text-sm text-gray-600">{row.type}</td>
                            <td className="py-3 px-4 text-xs sm:text-sm text-gray-600">{row.default}</td>
                            <td className="py-3 px-4 text-xs sm:text-sm text-gray-700">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {/* usePolygot Hook */}
            {activeSection === "hook" && (
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    usePolygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Hook
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    Enhanced hook providing comprehensive translation functions, statistics, and utility methods.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Returns</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-emerald-50/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Property</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            prop: "t",
                            type: "(text: string, options?: TranslationOptions) => string",
                            desc: "Enhanced translation function with options support",
                          },
                          {
                            prop: "setLanguage",
                            type: "<T extends SupportedLanguage>(options: LanguageChangeOptions<T>) => void",
                            desc: "Type-safe language setter with comprehensive options",
                          },
                          { prop: "language", type: "SupportedLanguage", desc: "Current target language" },
                          { prop: "sourceLanguage", type: "SupportedLanguage | undefined", desc: "Source language" },
                          {
                            prop: "currentOptions",
                            type: "{ tone: TranslationTone; region?: Region; context?: string }",
                            desc: "Current translation options",
                          },
                          { prop: "isLoading", type: "boolean", desc: "Translation loading state" },
                          { prop: "error", type: "string | null", desc: "Translation error message" },
                          { prop: "inflightRequests", type: "Set<string>", desc: "Currently processing requests" },
                          { prop: "clearTranslations", type: "() => void", desc: "Clear all cached translations" },
                          {
                            prop: "getTranslationMetadata",
                            type: "(text: string) => TranslationMetadata | null",
                            desc: "Get metadata for a translation",
                          },
                          {
                            prop: "stats",
                            type: "TranslationStats",
                            desc: "Translation statistics and performance metrics",
                          },
                          {
                            prop: "getSupportedLanguages",
                            type: "() => SupportedLanguage[]",
                            desc: "Get all supported languages",
                          },
                          {
                            prop: "getSupportedTones",
                            type: "() => TranslationTone[]",
                            desc: "Get all supported tones",
                          },
                          {
                            prop: "getValidRegionsForLanguage",
                            type: "<T extends SupportedLanguage>(language: T) => readonly Region[]",
                            desc: "Get valid regions for a language",
                          },
                          {
                            prop: "isValidLanguage",
                            type: "(language: string) => language is SupportedLanguage",
                            desc: "Type guard for language validation",
                          },
                          {
                            prop: "isValidTone",
                            type: "(tone: string) => tone is TranslationTone",
                            desc: "Type guard for tone validation",
                          },
                          {
                            prop: "isValidRegionForLanguage",
                            type: "<T extends SupportedLanguage>(language: T, region: string) => boolean",
                            desc: "Validate region for specific language",
                          },
                        ].map((row) => (
                          <tr
                            key={row.prop}
                            className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <code className="text-xs sm:text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded break-all">
                                {row.prop}
                              </code>
                            </td>
                            <td className="py-3 px-4 text-xs sm:text-sm text-gray-600 break-all">{row.type}</td>
                            <td className="py-3 px-4 text-xs sm:text-sm text-gray-700">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {/* Polygot Component */}
            {activeSection === "component" && (
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    Polygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Component
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    Enhanced component with intelligent translation detection, retry logic, and performance
                    optimizations.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Props</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-emerald-50/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Default</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            prop: "children",
                            type: "ReactNode",
                            default: "—",
                            desc: "Content to automatically translate using DOM traversal",
                            required: true,
                          },
                          {
                            prop: "debounceMs",
                            type: "number",
                            default: "100",
                            desc: "Debounce delay for translation retries",
                          },
                          {
                            prop: "maxRetries",
                            type: "number",
                            default: "5",
                            desc: "Maximum number of retry attempts for pending translations",
                          },
                          {
                            prop: "sourceLanguage",
                            type: "string",
                            default: "'en'",
                            desc: "Source language code for this component's content",
                          },
                        ].map((row) => (
                          <tr
                            key={row.prop}
                            className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2 flex-wrap">
                                <code className="text-xs sm:text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                                  {row.prop}
                                </code>
                                {row.required && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs bg-red-100 text-red-700 border-red-200"
                                  >
                                    required
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs sm:text-sm text-gray-600">{row.type}</td>
                            <td className="py-3 px-4 text-xs sm:text-sm text-gray-600">{row.default}</td>
                            <td className="py-3 px-4 text-xs sm:text-sm text-gray-700">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {/* PolygotLocal Component */}
            {activeSection === "local" && (
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    PolygotLocal
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Component
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    Component that translates its children based on a provided JSON object instead of API calls. Perfect
                    for offline translations or when you have pre-defined translation mappings.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Props</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-emerald-50/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <code className="text-xs sm:text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                                children
                              </code>
                              <Badge variant="destructive" className="text-xs bg-red-100 text-red-700 border-red-200">
                                required
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs sm:text-sm text-gray-600">ReactNode</td>
                          <td className="py-3 px-4 text-xs sm:text-sm text-gray-700">
                            The React nodes to be translated
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <code className="text-xs sm:text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                                translationJson
                              </code>
                              <Badge variant="destructive" className="text-xs bg-red-100 text-red-700 border-red-200">
                                required
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs sm:text-sm text-gray-600 break-all">
                            Record&lt;string, Record&lt;string, string&gt;&gt;
                          </td>
                          <td className="py-3 px-4 text-xs sm:text-sm text-gray-700">
                            JSON object containing translations by language code
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Translation JSON Structure</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      The translation JSON should follow this structure where each language code maps to an object
                      containing original text as keys and translated text as values:
                    </p>
                    <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                      <pre className="p-4 sm:p-6 text-white overflow-x-auto">
                        <code className="text-xs sm:text-sm lg:text-base">
                          <span className="text-gray-400">{"{"}</span>
                          {"\n  "}
                          <span className="text-yellow-300">"es"</span>
                          <span className="text-gray-400">:</span> <span className="text-gray-400">{"{"}</span>
                          {"\n    "}
                          <span className="text-yellow-300">"Hello"</span>
                          <span className="text-gray-400">:</span> <span className="text-yellow-300">"Hola"</span>
                          <span className="text-gray-400">,</span>
                          {"\n    "}
                          <span className="text-yellow-300">"Welcome"</span>
                          <span className="text-gray-400">:</span> <span className="text-yellow-300">"Bienvenido"</span>
                          <span className="text-gray-400">,</span>
                          {"\n    "}
                          <span className="text-yellow-300">"Thank you"</span>
                          <span className="text-gray-400">:</span> <span className="text-yellow-300">"Gracias"</span>
                          {"\n  "}
                          <span className="text-gray-400">{"}"}</span>
                          <span className="text-gray-400">,</span>
                          {"\n  "}
                          <span className="text-yellow-300">"fr"</span>
                          <span className="text-gray-400">:</span> <span className="text-gray-400">{"{"}</span>
                          {"\n    "}
                          <span className="text-yellow-300">"Hello"</span>
                          <span className="text-gray-400">:</span> <span className="text-yellow-300">"Bonjour"</span>
                          <span className="text-gray-400">,</span>
                          {"\n    "}
                          <span className="text-yellow-300">"Welcome"</span>
                          <span className="text-gray-400">:</span> <span className="text-yellow-300">"Bienvenue"</span>
                          <span className="text-gray-400">,</span>
                          {"\n    "}
                          <span className="text-yellow-300">"Thank you"</span>
                          <span className="text-gray-400">:</span> <span className="text-yellow-300">"Merci"</span>
                          {"\n  "}
                          <span className="text-gray-400">{"}"}</span>
                          {"\n"}
                          <span className="text-gray-400">{"}"}</span>
                        </code>
                      </pre>
                      <CopyButton
                        code={`{  "es": {    "Hello": "Hola",    "Welcome": "Bienvenido",    "Thank you": "Gracias"  },  "fr": {    "Hello": "Bonjour",    "Welcome": "Bienvenue",     "Thank you": "Merci"  }}`}
                        id="translation-json-structure"
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Example</h2>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-4 sm:p-6 text-white overflow-x-auto">
                      <code className="text-xs sm:text-sm lg:text-base">
                        <span className="text-pink-400">import</span> <span className="text-green-400">React</span>{" "}
                        <span className="text-pink-400">from</span> <span className="text-yellow-300">'react'</span>
                        {"\n"}
                        <span className="text-pink-400">import</span> {"{"}{" "}
                        <span className="text-green-400">PolygotLocal</span> {"}"}{" "}
                        <span className="text-pink-400">from</span> <span className="text-yellow-300">'polygot'</span>
                        {"\n\n"}
                        <span className="text-gray-500">// Translation data</span>
                        {"\n"}
                        <span className="text-pink-400">const</span>{" "}
                        <span className="text-green-400">translations</span> <span className="text-gray-400">=</span>{" "}
                        <span className="text-gray-400">{"{"}</span>
                        {"\n  "}
                        <span className="text-yellow-300">"es"</span>
                        <span className="text-gray-400">:</span> <span className="text-gray-400">{"{"}</span>
                        {"\n    "}
                        <span className="text-yellow-300">"Welcome to our store"</span>
                        <span className="text-gray-400">:</span>{" "}
                        <span className="text-yellow-300">"Bienvenido a nuestra tienda"</span>
                        <span className="text-gray-400">,</span>
                        {"\n    "}
                        <span className="text-yellow-300">"Browse our products"</span>
                        <span className="text-gray-400">:</span>{" "}
                        <span className="text-yellow-300">"Explora nuestros productos"</span>
                        <span className="text-gray-400">,</span>
                        {"\n    "}
                        <span className="text-yellow-300">"Add to Cart"</span>
                        <span className="text-gray-400">:</span>{" "}
                        <span className="text-yellow-300">"Agregar al Carrito"</span>
                        <span className="text-gray-400">,</span>
                        {"\n    "}
                        <span className="text-yellow-300">"Contact Us"</span>
                        <span className="text-gray-400">:</span> <span className="text-yellow-300">"Contáctanos"</span>
                        {"\n  "}
                        <span className="text-gray-400">{"}"}</span>
                        <span className="text-gray-400">,</span>
                        {"\n  "}
                        <span className="text-yellow-300">"fr"</span>
                        <span className="text-gray-400">:</span> <span className="text-gray-400">{"{"}</span>
                        {"\n    "}
                        <span className="text-yellow-300">"Welcome to our store"</span>
                        <span className="text-gray-400">:</span>{" "}
                        <span className="text-yellow-300">"Bienvenue dans notre magasin"</span>
                        <span className="text-gray-400">,</span>
                        {"\n    "}
                        <span className="text-yellow-300">"Browse our products"</span>
                        <span className="text-gray-400">:</span>{" "}
                        <span className="text-yellow-300">"Parcourir nos produits"</span>
                        <span className="text-gray-400">,</span>
                        {"\n    "}
                        <span className="text-yellow-300">"Add to Cart"</span>
                        <span className="text-gray-400">:</span>{" "}
                        <span className="text-yellow-300">"Ajouter au Panier"</span>
                        <span className="text-gray-400">,</span>
                        {"\n    "}
                        <span className="text-yellow-300">"Contact Us"</span>
                        <span className="text-gray-400">:</span>{" "}
                        <span className="text-yellow-300">"Nous Contacter"</span>
                        {"\n  "}
                        <span className="text-gray-400">{"}"}</span>
                        {"\n"}
                        <span className="text-gray-400">{"}"}</span>
                        {"\n\n"}
                        <span className="text-blue-400">function</span>{" "}
                        <span className="text-green-400">ProductPage</span>() {"{"}
                        {"\n  "}
                        <span className="text-pink-400">return</span> ({"\n    "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">PolygotLocal</span>{" "}
                        <span className="text-cyan-400">translationJson</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-gray-400">{"{"}</span>
                        <span className="text-white">translations</span>
                        <span className="text-gray-400">{"}"}</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">div</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"product-page"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">header</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">h1</span>
                        <span className="text-gray-400">{">"}</span>Welcome to our store{" "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">h1</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>Browse our products{" "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">header</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">main</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">button</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"btn-primary"</span>
                        <span className="text-gray-400">{">"}</span>Add to Cart{" "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">main</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">footer</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">a</span> <span className="text-cyan-400">href</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"/contact"</span>
                        <span className="text-gray-400">{">"}</span>Contact Us{" "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">a</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">footer</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n    "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">PolygotLocal</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n  "}
                        {"}"}
                        {"\n\n"}
                        <span className="text-gray-500">// When language changes to "es", all text will be</span>
                        {"\n"}
                        <span className="text-gray-500">// automatically replaced with Spanish translations</span>
                      </code>
                    </pre>
                    <CopyButton
                      code={`import React from 'react'
import { PolygotLocal } from 'polygot'

// Translation data
const translations = {
  "es": {
    "Welcome to our store": "Bienvenido a nuestra tienda",
    "Browse our products": "Explora nuestros productos",
    "Add to Cart": "Agregar al Carrito",
    "Contact Us": "Contáctanos"
  },
  "fr": {
    "Welcome to our store": "Bienvenue dans notre magasin",
    "Browse our products": "Parcourir nos produits",     
    "Add to Cart": "Ajouter au Panier",
    "Contact Us": "Nous Contacter"
  }
}

function ProductPage() {
  return (
    <PolygotLocal translationJson={translations}>
      <div className="product-page">
        <header>
          <h1>Welcome to our store</h1>
          <p>Browse our products</p>
        </header>
        <main>
          <div className="product-grid">
            {/* Product items */}
          </div>
          <button className="btn-primary">Add to Cart</button>
        </main>
        <footer>
          <a href="/contact">Contact Us</a>
        </footer>
      </div>
    </PolygotLocal>
  )
}

// When language changes to "es", all text will be
// automatically replaced with Spanish translations`}
                      id="polygot-local-example"
                    />
                  </div>
                </section>
                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {[
                      {
                        title: "Offline Support",
                        desc: "Works without internet connection since translations are embedded in your app",
                      },
                      {
                        title: "Performance",
                        desc: "No API calls means instant translations and better performance",
                      },
                      {
                        title: "Cost Effective",
                        desc: "No translation API costs for pre-defined content",
                      },
                      {
                        title: "Predictable",
                        desc: "Exact control over translations with no API variability",
                      },
                    ].map((benefit) => (
                      <div
                        key={benefit.title}
                        className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl"
                      >
                        <h4 className="font-semibold mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{benefit.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* NoPolygot Component */}
            {activeSection === "nopolygot" && (
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                    NoPolygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Component
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    Component that prevents translation of its children, preserving original content.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Props</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg overflow-x-auto">
                    <table className="w-full min-w-[400px]">
                      <thead className="bg-emerald-50/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-emerald-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors">
                          <td className="py-3 px-4">
                            <code className="text-xs sm:text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                              children
                            </code>
                          </td>
                          <td className="py-3 px-4 text-xs sm:text-sm text-gray-600">ReactNode</td>
                          <td className="py-3 px-4 text-xs sm:text-sm text-gray-700">
                            Content to exclude from automatic translation
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Use Cases</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {[
                      { title: "Contact Information", desc: "Email addresses, phone numbers, physical addresses" },
                      { title: "Brand Names", desc: "Company names, product names, trademarks" },
                      { title: "Technical Terms", desc: "API endpoints, code snippets, technical identifiers" },
                      { title: "Proper Nouns", desc: "Person names, place names, specific references" },
                    ].map((useCase) => (
                      <div
                        key={useCase.title}
                        className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl"
                      >
                        <h4 className="font-semibold mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {useCase.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{useCase.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
  