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
          <div className="relative max-w-6xl mx-auto">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/50 rounded-3xl blur-3xl"></div>
            
            {/* Map Container with Enhanced Styling */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-100/50">
              <WorldMap 
                dots={globalConnections} 
                lineColor="#10b981"
              />
              
              {/* Floating Stats Cards - Enhanced */}
              <div className="absolute inset-0 pointer-events-none">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    className={`absolute bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-200/50 hover:shadow-2xl transition-all duration-300 ${
                      index === 0 ? "top-6 left-6" :
                      index === 1 ? "top-6 right-6" :
                      index === 2 ? "bottom-6 left-6" :
                      "bottom-6 right-6"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-800 mb-3">{stat.label}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{stat.description}</div>
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
          <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-16 text-white shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6">
                Ready to Go Global?
              </h3>
              <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers who are already reaching global audiences 
                with Polygot's powerful translation technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/docs">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-green-600 hover:bg-green-50 px-10 py-5 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white hover:text-green-600 px-10 py-5 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
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