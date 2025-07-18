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
    { id: "cli", label: "CLI Tool", icon: Terminal }, // New CLI section
    { id: "provider", label: "PolygotProvider", icon: Settings },
    { id: "hook", label: "usePolygot", icon: Hook },
    { id: "component", label: "Polygot", icon: Component },
    { id: "local", label: "PolygotLocal", icon: FileJson },
    { id: "nopolygot", label: "NoPolygot", icon: Shield },
  ]

  // New App component for the Quick Start example


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header />
      <div className="container mx-auto px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 py-8 sticky top-20 h-fit bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors text-left ${
                      activeSection === item.id
                        ? "bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 shadow-sm"
                        : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
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
              <div className="space-y-12">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    Polygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Documentation
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    React translation library with intelligent context management and automatic content translation.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Installation</h2>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-6 text-white overflow-x-auto">
                      <code className="text-sm md:text-base">
                        <span className="text-cyan-400">npm</span> <span className="text-cyan-400">install</span>{" "}
                        <span className="text-yellow-300">polygot</span>
                      </code>
                    </pre>
                    <CopyButton code="npm install polygot" id="install" />
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Quick Start Example</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This example demonstrates how to use `PolygotProvider`, `usePolygot`, `Polygot`, and `NoPolygot`
                    components to manage translations and prevent translation for specific content.
                  </p>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-6 text-white overflow-x-auto">
                      <code className="text-sm md:text-base">
                        <span className="text-pink-400">import</span> {"{"}{" "}
                        <span className="text-green-400">useState</span>,{" "}
                        <span className="text-green-400">useEffect</span> {"}"}{" "}
                        <span className="text-pink-400">from</span> <span className="text-yellow-300">'react'</span>;
                        {"\n"}
                        <span className="text-pink-400">import</span> {"{"}{" "}
                        <span className="text-green-400">useRouter</span> {"}"}{" "}
                        <span className="text-pink-400">from</span>{" "}
                        <span className="text-yellow-300">'next/navigation'</span>;{"\n"}
                        <span className="text-pink-400">import</span> {"{"}{" "}
                        <span className="text-green-400">NoPolygot</span>,{" "}
                        <span className="text-green-400">Polygot</span>,{" "}
                        <span className="text-green-400">usePolygot</span> {"}"}{" "}
                        <span className="text-pink-400">from</span> <span className="text-yellow-300">'polygot'</span>;
                        {"\n\n"}
                        <span className="text-gray-500">// --- Mock API Call ---</span>
                        {"\n"}
                        <span className="text-gray-500">// This function simulates fetching data from a server.</span>
                        {"\n"}
                        <span className="text-gray-500">
                          // It returns a Promise that resolves with some data after a 1.5-second delay.
                        </span>
                        {"\n"}
                        <span className="text-blue-400">const</span> <span className="text-green-400">mockApiCall</span>{" "}
                        <span className="text-gray-400">=</span> () =&gt; {"{"}
                        {"\n  "}
                        <span className="text-cyan-400">console</span>.<span className="text-green-400">log</span>(
                        <span className="text-yellow-300">"Fetching data from API..."</span>);
                        {"\n  "}
                        <span className="text-pink-400">return new</span>{" "}
                        <span className="text-green-400">Promise</span>((
                        <span className="text-cyan-400">resolve</span>) =&gt; {"{"}
                        {"\n    "}
                        <span className="text-green-400">setTimeout</span>(() =&gt; {"{"}
                        {"\n      "}
                        <span className="text-blue-400">const</span> <span className="text-green-400">data</span>{" "}
                        <span className="text-gray-400">=</span> {"{"}
                        {"\n        "}
                        <span className="text-yellow-300">title</span>:{" "}
                        <span className="text-yellow-300">"Welcome to the Dashboard"</span>,{"\n        "}
                        <span className="text-yellow-300">description</span>:{" "}
                        <span className="text-yellow-300">
                          "This content was loaded from a remote API and is ready for translation."
                        </span>
                        ,{"\n      "}
                        {"}"};{"\n      "}
                        <span className="text-cyan-400">console</span>.<span className="text-green-400">log</span>(
                        <span className="text-yellow-300">"Data fetched successfully:"</span>,{" "}
                        <span className="text-green-400">data</span>);
                        {"\n      "}
                        <span className="text-cyan-400">resolve</span>(<span className="text-green-400">data</span>);
                        {"\n    "}
                        {"}"}, <span className="text-purple-400">1500</span>);
                        {"\n  "}
                        {"}"});{"\n"};{"\n\n"}
                        <span className="text-blue-400">function</span> <span className="text-green-400">App</span>(){" "}
                        {"{"}
                        {"\n  "}
                        <span className="text-blue-400">const</span> {"{"}{" "}
                        <span className="text-green-400">language</span>,{" "}
                        <span className="text-green-400">setLanguage</span> {"}"}{" "}
                        <span className="text-gray-400">=</span> <span className="text-green-400">usePolygot</span>();
                        {"\n  "}
                        <span className="text-blue-400">const</span> <span className="text-green-400">router</span>{" "}
                        <span className="text-gray-400">=</span> <span className="text-green-400">useRouter</span>();
                        {"\n\n  "}
                        <span className="text-gray-500">// State to hold the data fetched from the API</span>
                        {"\n  "}
                        <span className="text-blue-400">const</span> {"["}
                        <span className="text-green-400">apiData</span>,{" "}
                        <span className="text-green-400">setApiData</span>
                        {"]"} <span className="text-gray-400">=</span> <span className="text-green-400">useState</span>(
                        <span className="text-purple-400">null</span>);
                        {"\n  "}
                        <span className="text-gray-500">// State to manage the loading status</span>
                        {"\n  "}
                        <span className="text-blue-400">const</span> {"["}
                        <span className="text-green-400">isLoading</span>,{" "}
                        <span className="text-green-400">setIsLoading</span>
                        {"]"} <span className="text-gray-400">=</span> <span className="text-green-400">useState</span>(
                        <span className="text-purple-400">true</span>);
                        {"\n\n  "}
                        <span className="text-gray-500">
                          // useEffect hook to call the API when the component mounts
                        </span>
                        {"\n  "}
                        <span className="text-green-400">useEffect</span>(() =&gt; {"{"}
                        {"\n    "}
                        <span className="text-green-400">setLanguage</span>(
                        <span className="text-yellow-300">"ar"</span>){"\n    "}
                        <span className="text-gray-500">
                          // We don't want to refetch data when the language changes,
                        </span>
                        {"\n    "}
                        <span className="text-gray-500">// so we use an empty dependency array [].</span>
                        {"\n    "}
                        <span className="text-green-400">setIsLoading</span>(
                        <span className="text-purple-400">true</span>);
                        {"\n    "}
                        <span className="text-green-400">mockApiCall</span>().
                        <span className="text-green-400">then</span>(<span className="text-green-400">data</span>{" "}
                        <span className="text-gray-400">=&gt;</span> {"{"}
                        {"\n      "}
                        <span className="text-green-400">setApiData</span>(<span className="text-green-400">data</span>
                        );
                        {"\n    "}
                        {"}"}).<span className="text-green-400">catch</span>(
                        <span className="text-green-400">error</span> <span className="text-gray-400">=&gt;</span> {"{"}
                        {"\n      "}
                        <span className="text-cyan-400">console</span>.<span className="text-green-400">error</span>(
                        <span className="text-yellow-300">"Failed to fetch API data:"</span>,{" "}
                        <span className="text-green-400">error</span>);
                        {"\n      "}
                        <span className="text-gray-500">// You could set an error state here as well</span>
                        {"\n    "}
                        {"}"}).<span className="text-green-400">finally</span>(() =&gt; {"{"}
                        {"\n      "}
                        <span className="text-green-400">setIsLoading</span>(
                        <span className="text-purple-400">false</span>);
                        {"\n    "}
                        {"}"});{"\n  "}
                        {"}"}, []);{" "}
                        <span className="text-gray-500">
                          // {"<"}-- Empty dependency array means this runs only once on mount
                        </span>
                        {"\n\n  "}
                        <span className="text-gray-500">// Function to toggle between English and French</span>
                        {"\n  "}
                        <span className="text-blue-400">const</span>{" "}
                        <span className="text-green-400">toggleLanguage</span> <span className="text-gray-400">=</span>{" "}
                        () =&gt; {"{"}
                        {"\n    "}
                        <span className="text-blue-400">const</span> <span className="text-green-400">newLanguage</span>{" "}
                        <span className="text-gray-400">=</span> <span className="text-green-400">language</span>{" "}
                        <span className="text-gray-400">===</span> <span className="text-yellow-300">'en'</span>{" "}
                        <span className="text-gray-400">?</span> <span className="text-yellow-300">'fr'</span>{" "}
                        <span className="text-gray-400">:</span> <span className="text-yellow-300">'en'</span>;
                        {"\n    "}
                        <span className="text-green-400">setLanguage</span>(
                        <span className="text-green-400">newLanguage</span>);
                        {"\n  "}
                        {"}"};{"\n\n  "}
                        <span className="text-pink-400">return</span> ({"\n    "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">div</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"p-8 font-sans text-center"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">Polygot</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"mb-4"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n            "}
                        Current Language: <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">strong</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"text-emerald-600"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"{"}
                        <span className="text-green-400">language</span>
                        {"}"}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">strong</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-500">{/* --- Content from Mock API --- */}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">div</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"border border-gray-200 p-4 rounded-lg my-8 shadow-sm"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n            "}
                        {"{"}
                        <span className="text-green-400">isLoading</span> <span className="text-gray-400">?</span> (
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>Loading API data...
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>) <span className="text-gray-400">:</span> ({" "}
                        <span className="text-green-400">apiData</span> <span className="text-gray-400">&&</span> (
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n              "}
                        <span className="text-gray-500">{/* This content will be translated by Polygot */}</span>
                        {"\n              "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">h2</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"text-2xl font-bold text-gray-900 mb-2"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"{"}
                        <span className="text-green-400">apiData</span>.<span className="text-green-400">title</span>
                        {"}"}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">h2</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n              "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"text-gray-700"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"{"}
                        <span className="text-green-400">apiData</span>.
                        <span className="text-green-400">description</span>
                        {"}"}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n            "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n            "}){"}"}
                        {"\n          "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">button</span> <span className="text-cyan-400">onClick</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-green-400">
                          {"{"}toggleLanguage{"}"}
                        </span>{" "}
                        <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"mb-4"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n            "}
                        Click to toggle language
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">Polygot</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n\n      "}
                        <span className="text-gray-500">{/* --- Non-Translated Content --- */}</span>
                        {"\n      "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">NoPolygot</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n        "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">div</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span> <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"text-gray-500 mt-8"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n            "}
                        This part is wrapped in 'NoPolygot' and will not be translated.
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">button</span> <span className="text-cyan-400">onClick</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-green-400">
                          {"{"}() =&gt; router.push("/two"){"}"}
                        </span>{" "}
                        <span className="text-cyan-400">className</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-yellow-300">"mt-4"</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n            "}
                        Navigate to Page Two
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">button</span>
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
                        {"}"};{"\n\n"}
                        <span className="text-pink-400">export default</span>{" "}
                        <span className="text-green-400">App</span>;
                      </code>
                    </pre>
                    <CopyButton
                      code={`import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NoPolygot, Polygot, usePolygot } from 'polygot';

// --- Mock API Call ---
// This function simulates fetching data from a server.
// It returns a Promise that resolves with some data after a 1.5-second delay.
const mockApiCall = () => {
  console.log("Fetching data from API...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        title: "Welcome to the Dashboard",
        description: "This content was loaded from a remote API and is ready for translation.",
      };
      console.log("Data fetched successfully:", data);
      resolve(data);
    }, 1500);
  });
};

function App() {
  const { language, setLanguage } = usePolygot();
  const router = useRouter();

  // State to hold the data fetched from the API
  const [apiData, setApiData] = useState(null);
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to call the API when the component mounts
  useEffect(() => {
    setLanguage("ar")
    // We don't want to refetch data when the language changes,
    // so we use an empty dependency array [].
    setIsLoading(true);
    mockApiCall().then(data => {
      setApiData(data);
    }).catch(error => {
      console.error("Failed to fetch API data:", error);
      // You could set an error state here as well
    }).finally(() => {
      setIsLoading(false);
    });
  }, []); // <-- Empty dependency array means this runs only once on mount

  // Function to toggle between English and French
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <div className="p-8 font-sans text-center">
      <Polygot>
        <div>
          <p className="mb-4">
            Current Language: <strong className="text-emerald-600">{language}</strong>
          </p>
          {/* --- Content from Mock API --- */}
          <div className="border border-gray-200 p-4 rounded-lg my-8 shadow-sm">
            {isLoading ? (
              <p>Loading API data...</p>
            ) : (
              apiData && (
                <div>
                  {/* This content will be translated by Polygot */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{apiData.title}</h2>
                  <p className="text-gray-700">{apiData.description}</p>
                </div>
              )
            )}
          </div>
          <button onClick={toggleLanguage} className="mb-4">
            Click to toggle language
          </button>
        </div>
      </Polygot>
      {/* --- Non-Translated Content --- */}
      <NoPolygot>
        <div>
          <p className="text-gray-500 mt-8">This part is wrapped in 'NoPolygot' and will not be translated.</p>
          <button onClick={() => router.push("/two")} className="mt-4">
            Navigate to Page Two
          </button>
        </div>
      </NoPolygot>
    </div>
  );
}

export default App;`}
                      id="quickstart"
                    />
                  </div>
                </section>
              </div>
            )}

            {/* CLI Tool */}
            {activeSection === "cli" && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    Polygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      CLI Tool
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Generate static translation files for SEO optimization and improved performance.
                  </p>
                </div>

                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Usage</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Use the Polygot CLI to extract translatable strings from your React components and generate
                    language-specific JSON files. This is ideal for server-side rendering (SSR) and SEO, as search
                    engines can crawl pre-translated content.
                  </p>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-6 text-white overflow-x-auto">
                      <code className="text-sm md:text-base">
                        <span className="text-cyan-400">npx</span> <span className="text-yellow-300">polygot</span>{" "}
                        <span className="text-green-400">filename.[tsx,jsx]</span>{" "}
                        <span className="text-purple-400">language1,language2,...</span>
                      </code>
                    </pre>
                    <CopyButton code="npx polygot filename.[tsx,jsx] language1,language2,..." id="cli-command" />
                  </div>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    This command will process the specified file, extract all translatable strings, and generate JSON
                    files in the `locales/` directory for each specified language.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Output Structure</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Translation files will be generated in `locales/(language_code).json`.
                  </p>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-6 text-white overflow-x-auto">
                      <code className="text-sm md:text-base">
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
                      code={`locales/\n├── en.json\n├── es.json\n└── fr.json\n\n// Example content of locales/es.json\n{\n  "Hello World": "Hola Mundo",\n  "Welcome": "Bienvenido"\n}`}
                      id="cli-output"
                    />
                  </div>
                </section>
              </div>
            )}

            {activeSection === "module-exports" && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    Polygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Module Exports
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    The main entry point for the Polygot library, re-exporting all core components and hooks.
                  </p>
                </div>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">lib/polygot.ts</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This file serves as the primary export for the Polygot library, allowing you to import components
                    and hooks directly from `polygot`.
                  </p>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-6 text-white overflow-x-auto">
                      <code className="text-sm md:text-base">
                        <span className="text-pink-400">export</span> {"{"}{" "}
                        <span className="text-green-400">NoPolygot</span> {"}"}{" "}
                        <span className="text-pink-400">from</span>{" "}
                        <span className="text-yellow-300">"./lib/polygot/no-polygot"</span>
                        {"\n"}
                        <span className="text-pink-400">export</span> {"{"}{" "}
                        <span className="text-green-400">Polygot</span> {"}"}{" "}
                        <span className="text-pink-400">from</span>{" "}
                        <span className="text-yellow-300">"./lib/polygot/polygot"</span>
                        {"\n"}
                        <span className="text-pink-400">export</span> {"{"}{" "}
                        <span className="text-green-400">PolygotProvider</span> {"}"}{" "}
                        <span className="text-pink-400">from</span>{" "}
                        <span className="text-yellow-300">"./lib/polygot/polygot-provider"</span>
                        {"\n"}
                        <span className="text-pink-400">export</span> {"{"}{" "}
                        <span className="text-green-400">usePolygot</span> {"}"}{" "}
                        <span className="text-pink-400">from</span>{" "}
                        <span className="text-yellow-300">"./lib/polygot/use-polygot"</span>
                      </code>
                    </pre>
                    <CopyButton
                      code={`export { NoPolygot } from "./lib/polygot/no-polygot"\nexport { Polygot } from "./lib/polygot/polygot"\nexport { PolygotProvider } from "./lib/polygot/polygot-provider"\nexport { usePolygot } from "./lib/polygot/use-polygot"
`}
                      id="module-exports-code"
                    />
                  </div>
                </section>
              </div>
            )}

            {/* PolygotProvider */}
            {activeSection === "provider" && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    PolygotProvider
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Component
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Context provider that manages translation state and provides translation functions to child
                    components.
                  </p>
                </div>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Props</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <table className="w-full">
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
                          <tr
                            key={row.prop}
                            className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <code className="text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
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
                            <td className="py-3 px-4 text-sm text-gray-600">{row.type}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{row.default}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{row.desc}</td>
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
              <div className="space-y-12">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    usePolygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Hook
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Hook that provides access to translation functions and language state management.
                  </p>
                </div>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Returns</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <table className="w-full">
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
                          <tr
                            key={row.prop}
                            className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <code className="text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                                {row.prop}
                              </code>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">{row.type}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{row.desc}</td>
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
              <div className="space-y-12">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    Polygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Component
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Component that automatically translates all text content within its children.
                  </p>
                </div>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Props</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <table className="w-full">
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
                            <code className="text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                              children
                            </code>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">ReactNode</td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            Content to automatically translate using DOM traversal
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {/* PolygotLocal Component */}
            {activeSection === "local" && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    PolygotLocal
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Component
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Component that translates its children based on a provided JSON object instead of API calls. Perfect
                    for offline translations or when you have pre-defined translation mappings.
                  </p>
                </div>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Props</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <table className="w-full">
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
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                                children
                              </code>
                              <Badge variant="destructive" className="text-xs bg-red-100 text-red-700 border-red-200">
                                required
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">ReactNode</td>
                          <td className="py-3 px-4 text-sm text-gray-700">The React nodes to be translated</td>
                        </tr>
                        <tr className="border-t border-gray-100 hover:bg-emerald-50/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                                translationJson
                              </code>
                              <Badge variant="destructive" className="text-xs bg-red-100 text-red-700 border-red-200">
                                required
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            Record&lt;string, Record&lt;string, string&gt;&gt;
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            JSON object containing translations by language code
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Translation JSON Structure</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      The translation JSON should follow this structure where each language code maps to an object
                      containing original text as keys and translated text as values:
                    </p>
                    <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                      <pre className="p-6 text-white overflow-x-auto">
                        <code className="text-sm md:text-base">
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
                  <h2 className="text-3xl font-bold text-gray-900">Example</h2>
                  <div className="relative group bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <pre className="p-6 text-white overflow-x-auto">
                      <code className="text-sm md:text-base">
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
                        <span className="text-gray-400">{">"}</span>Welcome to our store
                        <span className="text-gray-400">{"</"}</span>
                        <span className="text-green-400">h1</span>
                        <span className="text-gray-400">{">"}</span>
                        {"\n          "}
                        <span className="text-gray-400">{"<"}</span>
                        <span className="text-green-400">p</span>
                        <span className="text-gray-400">{">"}</span>Browse our products
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
                        <span className="text-gray-400">{">"}</span>Add to Cart
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
                        <span className="text-gray-400">{">"}</span>Contact Us
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
                      code={`import React from 'react'\nimport { PolygotLocal } from 'polygot'\n\n// Translation data\nconst translations = {\n  "es": {\n    "Welcome to our store": "Bienvenido a nuestra tienda",\n    "Browse our products": "Explora nuestros productos",\n    "Add to Cart": "Agregar al Carrito",\n    "Contact Us": "Contáctanos"\n  },\n  "fr": {\n    "Welcome to our store": "Bienvenue dans notre magasin",\n    "Browse our products": "Parcourir nos produits",     \n    "Add to Cart": "Ajouter au Panier",\n    "Contact Us": "Nous Contacter"\n  }\n}\n\nfunction ProductPage() {\n  return (\n    <PolygotLocal translationJson={translations}>\n      <div className="product-page">\n        <header>\n          <h1>Welcome to our store</h1>\n          <p>Browse our products</p>\n        </header>\n        <main>\n          <div className="product-grid">\n            {/* Product items */}\n          </div>\n          <button className="btn-primary">Add to Cart</button>\n        </main>\n        <footer>\n          <a href="/contact">Contact Us</a>\n        </footer>\n      </div>\n    </PolygotLocal>\n  )\n}\n\n// When language changes to "es", all text will be\n// automatically replaced with Spanish translations`}
                      id="polygot-local-example"
                    />
                  </div>
                </section>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl"
                      >
                        <h4 className="font-semibold mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* NoPolygot Component */}
            {activeSection === "nopolygot" && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    NoPolygot
                    <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      Component
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Component that prevents translation of its children, preserving original content.
                  </p>
                </div>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Props</h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <table className="w-full">
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
                            <code className="text-sm font-mono bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded">
                              children
                            </code>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">ReactNode</td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            Content to exclude from automatic translation
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Use Cases</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { title: "Contact Information", desc: "Email addresses, phone numbers, physical addresses" },
                      { title: "Brand Names", desc: "Company names, product names, trademarks" },
                      { title: "Technical Terms", desc: "API endpoints, code snippets, technical identifiers" },
                      { title: "Proper Nouns", desc: "Person names, place names, specific references" },
                    ].map((useCase) => (
                      <div
                        key={useCase.title}
                        className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-lg hover:shadow-xl"
                      >
                        <h4 className="font-semibold mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {useCase.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{useCase.desc}</p>
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
