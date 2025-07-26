"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, FileText, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { AuthButton } from "@/components/auth/AuthButton";

export function ResizableHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Pricing", link: "/pricing" },
    { name: "Docs", link: "/docs" },
    { name: "Features", link: "/upcoming" },
  ];

  const dropdownItems = [
    {
      icon: FileText,
      label: "Docs",
      href: "/docs",
      description: "Complete documentation",
    },
    {
      icon: Star,
      label: "New Features",
      href: "/upcoming",
      description: "Late 2025",
    },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        
        <NavItems items={navItems} />
        
        <div className="flex items-center gap-4">
          {/* Developer Dropdown */}
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 rounded-lg hover:bg-emerald-50">
              Developer
              <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>

            {/* Animated Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                >
                  {dropdownItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors duration-200">
                          <item.icon className="h-4 w-4 text-gray-600 group-hover:text-emerald-600 transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500 group-hover:text-emerald-600/70 transition-colors duration-200">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Dropdown Arrow */}
                  <div className="absolute -top-1 left-6 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AuthButton />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-4 w-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-lg font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Developer Section */}
            <div className="border-t pt-4 mt-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Developer</div>
              {dropdownItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                    <item.icon className="h-3 w-3 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Auth Button */}
            <div className="border-t pt-4 mt-4">
              <AuthButton />
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
} 