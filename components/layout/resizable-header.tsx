"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, FileText, Star, Moon, Sun } from "lucide-react";
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
import { useEffect } from "react";

export function ResizableHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDark = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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
            <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 rounded-lg hover:bg-emerald-25">
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
                  className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
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
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200 group dark:text-gray-200 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/30"
                      >
                        <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors duration-200 dark:bg-gray-800 dark:group-hover:bg-emerald-900/50">
                          <item.icon className="h-4 w-4 text-gray-600 group-hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:group-hover:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500 group-hover:text-emerald-600/70 transition-colors duration-200 dark:text-gray-400 dark:group-hover:text-emerald-400/70">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Dropdown Arrow */}
                  <div className="absolute -top-1 left-6 w-2 h-2 bg-white dark:bg-gray-900 border-l border-t border-gray-200 dark:border-gray-700 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="relative z-10 p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            style={{ zIndex: 1000 }}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            )}
          </button>
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
                className="text-lg font-medium text-gray-700 hover:text-emerald-600 transition-colors dark:text-gray-200 dark:hover:text-emerald-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Developer Section */}
            <div className="border-t pt-4 mt-4 dark:border-gray-700">
              <div className="text-sm font-medium text-gray-500 mb-2 dark:text-gray-400">Developer</div>
              {dropdownItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors dark:text-gray-200 dark:hover:text-emerald-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center dark:bg-gray-800">
                    <item.icon className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Auth Button and Dark Toggle */}
            <div className="border-t pt-4 mt-4 flex items-center gap-4 dark:border-gray-700">
              <AuthButton />
              <button
                onClick={toggleDark}
                aria-label="Toggle dark mode"
                className="relative z-10 p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                style={{ zIndex: 1000 }}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
} 