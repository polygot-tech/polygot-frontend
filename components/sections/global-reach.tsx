"use client";

import { motion } from "framer-motion";
import { WorldMap } from "@/components/ui/world-map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Languages, Zap } from "lucide-react";
import Link from "next/link";

export default function GlobalReachSection() {
  // Sample global connections showing translation reach
  const globalConnections = [
    // North America to Europe
    {
      start: { lat: 40.7128, lng: -74.0060, label: "New York" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    // North America to Asia
    {
      start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
      end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
    },
    // Europe to Asia
    {
      start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
      end: { lat: 39.9042, lng: 116.4074, label: "Beijing" },
    },
    // Europe to Africa
    {
      start: { lat: 52.5200, lng: 13.4050, label: "Berlin" },
      end: { lat: -26.2041, lng: 28.0473, label: "Johannesburg" },
    },
    // Asia to Australia
    {
      start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
    // South America connections
    {
      start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
      end: { lat: 40.7128, lng: -74.0060, label: "New York" },
    },
    // Middle East to Europe
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    // India to Europe
    {
      start: { lat: 19.0760, lng: 72.8777, label: "Mumbai" },
      end: { lat: 48.8566, lng: 2.3522, label: "Paris" },
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
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 text-sm font-medium mb-6">
            <Globe className="mr-2 h-4 w-4" />
            Global Reach
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Translate Your Website to{" "}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Any Language Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
          <div className="relative">
            <WorldMap 
              dots={globalConnections} 
              lineColor="#10b981"
            />
            
            {/* Floating Stats Cards */}
            <div className="absolute inset-0 pointer-events-none">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className={`absolute bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-200 ${
                    index === 0 ? "top-4 left-4" :
                    index === 1 ? "top-4 right-4" :
                    index === 2 ? "bottom-4 left-4" :
                    "bottom-4 right-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              className="text-center group"
            >
              <div className="inline-flex p-4 rounded-2xl bg-green-100 text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
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
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Go Global?
            </h3>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already reaching global audiences 
              with Polygot's powerful translation technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-medium"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-medium"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 