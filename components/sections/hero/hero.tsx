"use client";

import { useState } from "react";
import Link from "next/link"; // Use Next.js Link for navigation
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Zap, Code, ExternalLink } from "lucide-react";

// import type { LanguageCodes } from "@/types/language";
// import LanguageSelector from "./language-selector";
// import { NoPolygot, Polygot, usePolygot } from "polygot";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm i polygot");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

//   const handleLanguageChange = async (language: LanguageCodes) => {
//     try {
//       await setLanguage(language);
//     } catch (error) {
//       console.error("Translation error:", error);
//     }
//   };

  return (
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            {/* <LanguageSelector
              currentLanguage={language}
              onLanguageChange={handleLanguageChange}
            /> */}
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200"
            >
              <Zap className="mr-2 h-4 w-4" />
              AI-Powered Translation
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Translate Your Website
              <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                Instantly
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              No more wrapping strings or defining JSON files. Just install our
              npm package and watch your website become multilingual with the
              power of AI.
            </p>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div
                  onClick={handleCopyInstall}
                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 font-mono text-sm text-black sm:text-base transition-colors hover:bg-gray-200"
                >
                  <span>npm i polygot</span>
                </div>
                {copied && (
                  <span className="text-sm text-green-600">
                    Copied to clipboard!
                  </span>
                )}
                {/* OPTIMIZATION: Use a real <a> tag for external links */}
                <Button asChild variant="link" className="text-green-700 hover:text-green-800 gap-1">
                  <a href="https://www.npmjs.com/package/polygot" target="_blank" rel="noopener noreferrer">
                    View on npm
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* OPTIMIZATION: Use the <Link> component for internal navigation */}
                <Button
                  asChild
                  size="lg"
                  className="gap-2 px-8 py-3 text-lg bg-green-700 hover:bg-green-800"
                >
                  <Link href="/pricing">API Pricing</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Code className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  Zero Configuration
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Install and start translating immediately
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Globe className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  20+ Languages
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Support for all major world languages
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="rounded-full bg-teal-100 p-3">
                  <Zap className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  Lightning Fast
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Real-time translation with AI optimization
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}