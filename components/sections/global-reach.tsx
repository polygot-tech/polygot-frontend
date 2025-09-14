"use client";

import { motion } from "framer-motion";
import { WorldMap } from "@/components/ui/world-map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Languages, Zap } from "lucide-react";
import Link from "next/link";

export default function GlobalReachSection() {
  // Clean, aesthetic global connections
  const globalConnections = [
    // Trans-Pacific: San Francisco to Tokyo
    {
      start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
      end:   { lat: 48.8566, lng: 2.3522, label: "Paris" }  ,
    },
    // Trans-Atlantic: New York to London
    {
      start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
      end:   { lat: -34.6037, lng: -58.3816, label: "Buenos Aires" },
    },
    // Europe to Asia: Paris to Beijing
    {
      start: { lat: -34.6037, lng: -58.3816, label: "Buenos Aires" },
      end:   { lat: -33.9249, lng: 18.4241, label: "Cape Town" },
    },
    // Asia-Pacific: Singapore to Sydney
    {
      start: { lat: -33.9249, lng: 18.4241, label: "Cape Town" },
      end:   { lat: 25.276987, lng: 55.296249, label: "Dubai" },
    },
    // Europe to Africa: Berlin to Cape Town
    {
      start: { lat: 25.276987, lng: 55.296249, label: "Dubai" },
      end:   { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
    // South America to Europe: São Paulo to Madrid
    {
      start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
      end:   { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
    },
    {
      start: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
      end:   { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    },
  ];

  const stats = [
    {
      icon: Languages,
      value: "100+",
      label: "Languages Supported",
      description: "From major world languages to regional dialects",
    },
    {
      icon: Users,
      value: "2.5B+",
      label: "Global Users Reached",
      description: "Potential audience across all continents",
    },
    {
      icon: Globe,
      value: "195+",
      label: "Countries Covered",
      description: "Complete global coverage with local optimization",
    },
    {
      icon: Zap,
      value: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable translation service worldwide",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 text-sm font-medium mb-6 dark:from-green-400 dark:to-emerald-500">
            <Globe className="mr-2 h-4 w-4" />
            Global Reach
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 dark:text-white">
            Translate Your Website to{" "}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:via-emerald-400 dark:to-teal-400">
              Any Language Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
            Break down language barriers and reach billions of users across the globe. 
            Polygot makes your content accessible in over 100 languages with just one line of code.
          </p>
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="relative max-w-6xl mx-auto">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/50 rounded-3xl blur-3xl dark:from-green-900/40 dark:to-emerald-900/40"></div>
            
            {/* World Map - Full Screen Display */}
            <div className="relative w-full">
              <WorldMap 
                dots={globalConnections} 
                lineColor="#10b981"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 dark:bg-gray-900/80 dark:border-green-900/50 dark:shadow-emerald-900/20">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg dark:from-green-400 dark:to-emerald-500">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3 dark:from-green-400 dark:to-emerald-400">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-3 dark:text-gray-100">{stat.label}</div>
                <div className="text-sm text-gray-600 leading-relaxed dark:text-gray-300">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-16 text-white shadow-2xl dark:from-green-800 dark:via-emerald-900 dark:to-teal-900">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6 dark:text-white">
                Ready to Go Global?
              </h3>
              <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed dark:text-green-200">
                Join thousands of developers who are already reaching global audiences 
                with Polygot's powerful translation technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/docs">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-green-600 hover:bg-green-50 px-10 py-5 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-900 dark:text-green-300 dark:hover:bg-gray-800"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white hover:text-green-600 px-10 py-5 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 dark:border-green-300/30 dark:text-green-100 dark:hover:bg-green-900 dark:hover:text-white"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 