export type LanguageCodes =
  | "en" // English
  | "zh" // Chinese (Mandarin)
  | "hi" // Hindi
  | "es" // Spanish
  | "fr" // French
  | "ar" // Arabic
  | "bn" // Bengali
  | "ru" // Russian
  | "pt" // Portuguese
  | "ur" // Urdu
  | "id" // Indonesian
  | "de" // German
  | "ja" // Japanese
  | "sw" // Swahili
  | "pa" // Punjabi
  | "mr" // Marathi
  | "te" // Telugu
  | "ta" // Tamil
  | "vi" // Vietnamese
  | "tr" // Turkish
  | "ko" // Korean
  | "fa" // Persian (Farsi)
  | "it" // Italian
  | "pl" // Polish
  | "nl" // Dutch

export interface Language {
  code: LanguageCodes
  name: string
  flag: string
}


export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "Chinese (Mandarin)", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "sw", name: "Swahili", flag: "🇰🇪" },
  { code: "pa", name: "Punjabi", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "fa", name: "Persian (Farsi)", flag: "🇮🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
]
