/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle, FileText, Settings, WebhookIcon as Hook, Component, Shield, FileJson } from "lucide-react"
import { useState } from "react"

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
      className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/80"
    >
      {copiedCode === id ? (
        <CheckCircle className="w-4 h-4 text- green-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-600" />
      )}
    </Button>
  )

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "provider", label: "PolygotProvider", icon: Settings },
    { id: "hook", label: "usePolygot", icon: Hook },
    { id: "component", label: "Polygot", icon: Component },
    { id: "local", label: "PolygotLocal", icon: FileJson },
    { id: "nopolygot", label: "NoPolygot", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 py-8 sticky top-20 h-fit">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left ${
                      activeSection === item.id
                        ? "bg-green-50 text-green-700 font-medium border border-green-200"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 py-8 max-w-4xl">
            {/* Overview */}
            {activeSection === "overview" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">Polygot</h1>
                  <p className="text-xl text-muted-foreground">
                    React translation library with intelligent context management and automatic content translation.
                  </p>
                </div>

                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Installation</h2>
                    <div className="relative group">
                      <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm">
                          <span className="text-rose-600">npm</span> <span className="text-rose-600">install</span>{" "}
                          <span className="text-blue-600">polygot</span>
                        </code>
                      </pre>
                      <CopyButton code="npm install polygot" id="install" />
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
                    <div className="relative group">
                      <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm">
                          <span className="text-rose-600">import</span> <span className="text-slate-600">{"{"}</span>{" "}
                          <span className="text-slate-900 font-medium">PolygotProvider</span>{" "}
                          <span className="text-slate-600">{"}"}</span> <span className="text-rose-600">from</span>{" "}
                          <span className="text-blue-600">'polygot'</span>
                          {"\n\n"}
                          <span className="text-rose-600">function</span>{" "}
                          <span className="text-slate-900 font-medium">App</span>
                          <span className="text-slate-600">()</span> <span className="text-slate-600">{"{"}</span>
                          {"\n  "}
                          <span className="text-rose-600">return</span> <span className="text-slate-600">(</span>
                          {"\n    "}
                          <span className="text-slate-600">{"<"}</span>
                          <span className="text-slate-900 font-medium">PolygotProvider</span>
                          {"\n      "}
                          <span className="text-slate-700">sourceLanguage</span>
                          <span className="text-slate-600">=</span>
                          <span className="text-blue-600">"en"</span>
                          {"\n      "}
                          <span className="text-slate-700">apiKey</span>
                          <span className="text-slate-600">=</span>
                          <span className="text-blue-600">"your-api-key"</span>
                          {"\n    "}
                          <span className="text-slate-600">{">"}</span>
                          {"\n      "}
                          <span className="text-slate-600">{"<"}</span>
                          <span className="text-slate-900 font-medium">YourApp</span>{" "}
                          <span className="text-slate-600">{"/>"}</span>
                          {"\n    "}
                          <span className="text-slate-600">{"</"}</span>
                          <span className="text-slate-900 font-medium">PolygotProvider</span>
                          <span className="text-slate-600">{">"}</span>
                          {"\n  "}
                          <span className="text-slate-600">)</span>
                          {"\n"}
                          <span className="text-slate-600">{"}"}</span>
                        </code>
                      </pre>
                      <CopyButton
                        code={`import { PolygotProvider } from 'polygot'

function App() {
  return (
    <PolygotProvider 
      sourceLanguage="en"
      apiKey="your-api-key"
    >
      <YourApp />
    </PolygotProvider>
  )
}`}
                        id="quickstart"
                      />
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* PolygotProvider */}
            {activeSection === "provider" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">PolygotProvider</h1>
                  <p className="text-xl text-muted-foreground">
                    Context provider that manages translation state and provides translation functions to child
                    components.
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Props</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Type</th>
                          <th className="text-left py-3 px-4 font-medium">Default</th>
                          <th className="text-left py-3 px-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            prop: "children",
                            type: "ReactNode",
                            default: "—",
                            desc: "Child components to provide context to",
                          },
                          {
                            prop: "sourceLanguage",
                            type: "LanguageCodes",
                            default: "'en'",
                            desc: "Source language code for translations",
                          },
                          {
                            prop: "apiKey",
                            type: "string",
                            default: "—",
                            desc: "API key for translation service",
                            required: true,
                          },
                          {
                            prop: "loadingComponent",
                            type: "ReactNode",
                            default: "Loading...",
                            desc: "Component to show during translation loading",
                          },
                          {
                            prop: "errorComponent",
                            type: "Function",
                            default: "Error handler",
                            desc: "Component to show when translation errors occur",
                          },
                        ].map((row) => (
                          <tr key={row.prop} className="border-t">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <code className="text-sm font-mono bg-gray-50 border border-gray-200 text-green-700 px-1.5 py-0.5 rounded">
                                  {row.prop}
                                </code>
                                {row.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    required
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{row.type}</td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{row.default}</td>
                            <td className="py-3 px-4 text-sm">{row.desc}</td>
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
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">usePolygot</h1>
                  <p className="text-xl text-muted-foreground">
                    Hook that provides access to translation functions and language state management.
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Returns</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">Property</th>
                          <th className="text-left py-3 px-4 font-medium">Type</th>
                          <th className="text-left py-3 px-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            prop: "t",
                            type: "(text: string) => string",
                            desc: "Translation function with debounced API calls",
                          },
                          {
                            prop: "setLanguage",
                            type: "(lang: LanguageCodes) => void",
                            desc: "Set target language with validation",
                          },
                          { prop: "language", type: "LanguageCodes", desc: "Current target language" },
                          { prop: "isLoading", type: "boolean", desc: "Translation loading state" },
                          { prop: "error", type: "string | null", desc: "Translation error message" },
                        ].map((row) => (
                          <tr key={row.prop} className="border-t">
                            <td className="py-3 px-4">
                              <code className="text-sm font-mono bg-gray-50 border border-gray-200 text-green-700 px-1.5 py-0.5 rounded">
                                {row.prop}
                              </code>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{row.type}</td>
                            <td className="py-3 px-4 text-sm">{row.desc}</td>
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
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">Polygot</h1>
                  <p className="text-xl text-muted-foreground">
                    Component that automatically translates all text content within its children.
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Props</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Type</th>
                          <th className="text-left py-3 px-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="py-3 px-4">
                            <code className="text-sm font-mono bg-gray-50 border border-gray-200 text-green-700 px-1.5 py-0.5 rounded">
                              children
                            </code>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">ReactNode</td>
                          <td className="py-3 px-4 text-sm">Content to automatically translate using DOM traversal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {/* PolygotLocal Component */}
            {activeSection === "local" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">PolygotLocal</h1>
                  <p className="text-xl text-muted-foreground">
                    Component that translates its children based on a provided JSON object instead of API calls. Perfect
                    for offline translations or when you have pre-defined translation mappings.
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Props</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Type</th>
                          <th className="text-left py-3 px-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono bg-gray-50 border border-gray-200 text-green-700 px-1.5 py-0.5 rounded">
                                children
                              </code>
                              <Badge variant="destructive" className="text-xs">
                                required
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">ReactNode</td>
                          <td className="py-3 px-4 text-sm">The React nodes to be translated</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono bg-gray-50 border border-gray-200 text-green-700 px-1.5 py-0.5 rounded">
                                translationJson
                              </code>
                              <Badge variant="destructive" className="text-xs">
                                required
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            Record&lt;string, Record&lt;string, string&gt;&gt;
                          </td>
                          <td className="py-3 px-4 text-sm">JSON object containing translations by language code</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Translation JSON Structure</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      The translation JSON should follow this structure where each language code maps to an object
                      containing original text as keys and translated text as values:
                    </p>
                    <div className="relative group">
                      <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm">
                          <span className="text-slate-600">{"{"}</span>
                          {"\n  "}
                          <span className="text-blue-600">"es"</span>
                          <span className="text-slate-600">:</span> <span className="text-slate-600">{"{"}</span>
                          {"\n    "}
                          <span className="text-blue-600">"Hello"</span>
                          <span className="text-slate-600">:</span> <span className="text-blue-600">"Hola"</span>
                          <span className="text-slate-600">,</span>
                          {"\n    "}
                          <span className="text-blue-600">"Welcome"</span>
                          <span className="text-slate-600">:</span> <span className="text-blue-600">"Bienvenido"</span>
                          <span className="text-slate-600">,</span>
                          {"\n    "}
                          <span className="text-blue-600">"Thank you"</span>
                          <span className="text-slate-600">:</span> <span className="text-blue-600">"Gracias"</span>
                          {"\n  "}
                          <span className="text-slate-600">{"}"}</span>
                          <span className="text-slate-600">,</span>
                          {"\n  "}
                          <span className="text-blue-600">"fr"</span>
                          <span className="text-slate-600">:</span> <span className="text-slate-600">{"{"}</span>
                          {"\n    "}
                          <span className="text-blue-600">"Hello"</span>
                          <span className="text-slate-600">:</span> <span className="text-blue-600">"Bonjour"</span>
                          <span className="text-slate-600">,</span>
                          {"\n    "}
                          <span className="text-blue-600">"Welcome"</span>
                          <span className="text-slate-600">:</span> <span className="text-blue-600">"Bienvenue"</span>
                          <span className="text-slate-600">,</span>
                          {"\n    "}
                          <span className="text-blue-600">"Thank you"</span>
                          <span className="text-slate-600">:</span> <span className="text-blue-600">"Merci"</span>
                          {"\n  "}
                          <span className="text-slate-600">{"}"}</span>
                          {"\n"}
                          <span className="text-slate-600">{"}"}</span>
                        </code>
                      </pre>
                      <CopyButton
                        code={`{
  "es": {
    "Hello": "Hola",
    "Welcome": "Bienvenido",
    "Thank you": "Gracias"
  },
  "fr": {
    "Hello": "Bonjour",
    "Welcome": "Bienvenue", 
    "Thank you": "Merci"
  }
}`}
                        id="translation-json-structure"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Example</h2>
                  <div className="relative group">
                    <pre className="bg-gray-50 border p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm">
                        <span className="text-rose-600">import</span>{" "}
                        <span className="text-slate-900 font-medium">React</span>{" "}
                        <span className="text-rose-600">from</span> <span className="text-blue-600">'react'</span>
                        {"\n"}
                        <span className="text-rose-600">import</span> <span className="text-slate-600">{"{"}</span>{" "}
                        <span className="text-slate-900 font-medium">PolygotLocal</span>{" "}
                        <span className="text-slate-600">{"}"}</span> <span className="text-rose-600">from</span>{" "}
                        <span className="text-blue-600">'polygot'</span>
                        {"\n\n"}
                        <span className="text-slate-500">// Translation data</span>
                        {"\n"}
                        <span className="text-rose-600">const</span>{" "}
                        <span className="text-slate-900 font-medium">translations</span>{" "}
                        <span className="text-slate-600">=</span> <span className="text-slate-600">{"{"}</span>
                        {"\n  "}
                        <span className="text-blue-600">"es"</span>
                        <span className="text-slate-600">:</span> <span className="text-slate-600">{"{"}</span>
                        {"\n    "}
                        <span className="text-blue-600">"Welcome to our store"</span>
                        <span className="text-slate-600">:</span>{" "}
                        <span className="text-blue-600">"Bienvenido a nuestra tienda"</span>
                        <span className="text-slate-600">,</span>
                        {"\n    "}
                        <span className="text-blue-600">"Browse our products"</span>
                        <span className="text-slate-600">:</span>{" "}
                        <span className="text-blue-600">"Explora nuestros productos"</span>
                        <span className="text-slate-600">,</span>
                        {"\n    "}
                        <span className="text-blue-600">"Add to Cart"</span>
                        <span className="text-slate-600">:</span>{" "}
                        <span className="text-blue-600">"Agregar al Carrito"</span>
                        <span className="text-slate-600">,</span>
                        {"\n    "}
                        <span className="text-blue-600">"Contact Us"</span>
                        <span className="text-slate-600">:</span> <span className="text-blue-600">"Contáctanos"</span>
                        {"\n  "}
                        <span className="text-slate-600">{"}"}</span>
                        <span className="text-slate-600">,</span>
                        {"\n  "}
                        <span className="text-blue-600">"fr"</span>
                        <span className="text-slate-600">:</span> <span className="text-slate-600">{"{"}</span>
                        {"\n    "}
                        <span className="text-blue-600">"Welcome to our store"</span>
                        <span className="text-slate-600">:</span>{" "}
                        <span className="text-blue-600">"Bienvenue dans notre magasin"</span>
                        <span className="text-slate-600">,</span>
                        {"\n    "}
                        <span className="text-blue-600">"Browse our products"</span>
                        <span className="text-slate-600">:</span>{" "}
                        <span className="text-blue-600">"Parcourir nos produits"</span>
                        <span className="text-slate-600">,</span>
                        {"\n    "}
                        <span className="text-blue-600">"Add to Cart"</span>
                        <span className="text-slate-600">:</span>{" "}
                        <span className="text-blue-600">"Ajouter au Panier"</span>
                        <span className="text-slate-600">,</span>
                        {"\n    "}
                        <span className="text-blue-600">"Contact Us"</span>
                        <span className="text-slate-600">:</span>{" "}
                        <span className="text-blue-600">"Nous Contacter"</span>
                        {"\n  "}
                        <span className="text-slate-600">{"}"}</span>
                        {"\n"}
                        <span className="text-slate-600">{"}"}</span>
                        {"\n\n"}
                        <span className="text-rose-600">function</span>{" "}
                        <span className="text-slate-900 font-medium">ProductPage</span>
                        <span className="text-slate-600">()</span> <span className="text-slate-600">{"{"}</span>
                        {"\n  "}
                        <span className="text-rose-600">return</span> <span className="text-slate-600">(</span>
                        {"\n    "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">PolygotLocal</span>{" "}
                        <span className="text-slate-700">translationJson</span>
                        <span className="text-slate-600">=</span>
                        <span className="text-slate-600">{"{"}</span>
                        <span className="text-slate-800">translations</span>
                        <span className="text-slate-600">{"}"}</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n      "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">div</span>{" "}
                        <span className="text-slate-700">className</span>
                        <span className="text-slate-600">=</span>
                        <span className="text-blue-600">"product-page"</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n        "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">header</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n          "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">h1</span>
                        <span className="text-slate-600">{">"}</span>Welcome to our store
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">h1</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n          "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">p</span>
                        <span className="text-slate-600">{">"}</span>Browse our products
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">p</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n        "}
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">header</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n        "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">main</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n          "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">button</span>{" "}
                        <span className="text-slate-700">className</span>
                        <span className="text-slate-600">=</span>
                        <span className="text-blue-600">"btn-primary"</span>
                        <span className="text-slate-600">{">"}</span>Add to Cart
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">button</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n        "}
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">main</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n        "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">footer</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n          "}
                        <span className="text-slate-600">{"<"}</span>
                        <span className="text-slate-900 font-medium">a</span>{" "}
                        <span className="text-slate-700">href</span>
                        <span className="text-slate-600">=</span>
                        <span className="text-blue-600">"/contact"</span>
                        <span className="text-slate-600">{">"}</span>Contact Us
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">a</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n        "}
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">footer</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n      "}
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">div</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n    "}
                        <span className="text-slate-600">{"</"}</span>
                        <span className="text-slate-900 font-medium">PolygotLocal</span>
                        <span className="text-slate-600">{">"}</span>
                        {"\n  "}
                        <span className="text-slate-600">)</span>
                        {"\n"}
                        <span className="text-slate-600">{"}"}</span>
                        {"\n\n"}
                        <span className="text-slate-500">// When language changes to "es", all text will be</span>
                        {"\n"}
                        <span className="text-slate-500">// automatically replaced with Spanish translations</span>
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

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div key={benefit.title} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2 text-green-700">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* NoPolygot Component */}
            {activeSection === "nopolygot" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">NoPolygot</h1>
                  <p className="text-xl text-muted-foreground">
                    Component that prevents translation of its children, preserving original content.
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Props</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Type</th>
                          <th className="text-left py-3 px-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="py-3 px-4">
                            <code className="text-sm font-mono bg-gray-50 border border-gray-200 text-green-700 px-1.5 py-0.5 rounded">
                              children
                            </code>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">ReactNode</td>
                          <td className="py-3 px-4 text-sm">Content to exclude from automatic translation</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Contact Information", desc: "Email addresses, phone numbers, physical addresses" },
                      { title: "Brand Names", desc: "Company names, product names, trademarks" },
                      { title: "Technical Terms", desc: "API endpoints, code snippets, technical identifiers" },
                      { title: "Proper Nouns", desc: "Person names, place names, specific references" },
                    ].map((useCase) => (
                      <div key={useCase.title} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">{useCase.title}</h4>
                        <p className="text-sm text-muted-foreground">{useCase.desc}</p>
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
