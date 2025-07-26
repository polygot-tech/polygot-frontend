"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Globe } from "lucide-react"
import { type LanguageCodes, languages } from "@/types/language"

interface LanguageSelectorProps {
  currentLanguage: LanguageCodes
  onLanguageChange: (language: LanguageCodes) => void
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 min-w-[200px] justify-between bg-white border-green-200 hover:bg-green-50 hover:border-green-300 dark:bg-gray-900 dark:border-green-700 dark:hover:bg-green-900/30 dark:hover:border-green-600"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-lg">{currentLang.flag}</span>
            <span className="font-medium dark:text-white">{currentLang.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-green-600 dark:text-green-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] max-h-[300px] overflow-y-auto">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => {
              onLanguageChange(language.code)
              setIsOpen(false)
            }}
            className={`flex items-center gap-3 cursor-pointer ${
              currentLanguage === language.code ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300" : ""
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
            <span className="text-xs text-gray-500 ml-auto">{language.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
