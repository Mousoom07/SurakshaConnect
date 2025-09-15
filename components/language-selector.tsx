"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Languages, Volume2, VolumeX, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl?: boolean
}

const supportedLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", rtl: true },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
]

interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void
  showTTS?: boolean
  compact?: boolean
}

export function LanguageSelector({ onLanguageChange, showTTS = true, compact = false }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(supportedLanguages[0])
  const [isTTSEnabled, setIsTTSEnabled] = useState(true)
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    // Auto-detect browser language
    const browserLang = navigator.language.split("-")[0]
    const detectedLang = supportedLanguages.find((lang) => lang.code === browserLang)
    if (detectedLang) {
      setSelectedLanguage(detectedLang)
      onLanguageChange?.(detectedLang)
    }
  }, [onLanguageChange])

  const handleLanguageChange = (languageCode: string) => {
    const language = supportedLanguages.find((lang) => lang.code === languageCode)
    if (language) {
      setSelectedLanguage(language)
      onLanguageChange?.(language)
      setIsTranslating(true)
      // Simulate translation delay
      setTimeout(() => setIsTranslating(false), 1000)
    }
  }

  const testTTS = async (text: string) => {
    if (!isTTSEnabled) return

    try {
      // In real implementation, this would use a proper TTS API
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage.code
      speechSynthesis.speak(utterance)
    } catch (error) {
      console.error("TTS error:", error)
    }
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Select value={selectedLanguage.code} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue>
              <div className="flex items-center gap-2">
                <span>{selectedLanguage.flag}</span>
                <span className="text-sm">{selectedLanguage.code.toUpperCase()}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {supportedLanguages.map((language) => (
              <SelectItem key={language.code} value={language.code}>
                <div className="flex items-center gap-2">
                  <span>{language.flag}</span>
                  <span>{language.nativeName}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {showTTS && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsTTSEnabled(!isTTSEnabled)}
            className={cn(!isTTSEnabled && "opacity-50")}
          >
            {isTTSEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        )}

        {isTranslating && <Badge variant="outline">Translating...</Badge>}
      </div>
    )
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5" />
          Language & Accessibility
        </CardTitle>
        <CardDescription>
          Choose your preferred language for emergency communications and enable text-to-speech for audio guidance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Language Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Select Language</label>
          <Select value={selectedLanguage.code} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{selectedLanguage.flag}</span>
                  <div>
                    <p className="font-medium">{selectedLanguage.nativeName}</p>
                    <p className="text-sm text-muted-foreground">{selectedLanguage.name}</p>
                  </div>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{language.flag}</span>
                    <div>
                      <p className="font-medium">{language.nativeName}</p>
                      <p className="text-sm text-muted-foreground">{language.name}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isTranslating && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="animate-pulse">
                <Globe className="w-3 h-3 mr-1" />
                Translating interface...
              </Badge>
            </div>
          )}
        </div>

        {/* Text-to-Speech Settings */}
        {showTTS && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Audio Assistance</label>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {isTTSEnabled ? (
                    <Volume2 className="w-5 h-5 text-primary" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Text-to-Speech</p>
                  <p className="text-sm text-muted-foreground">
                    Hear instructions read aloud in {selectedLanguage.nativeName}
                  </p>
                </div>
              </div>
              <Button
                variant={isTTSEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setIsTTSEnabled(!isTTSEnabled)}
              >
                {isTTSEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            {isTTSEnabled && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  testTTS(
                    selectedLanguage.code === "en"
                      ? "This is a test of the emergency text-to-speech system."
                      : "Test message in " + selectedLanguage.nativeName,
                  )
                }
                className="w-full"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Test Audio in {selectedLanguage.nativeName}
              </Button>
            )}
          </div>
        )}

        {/* Language Features */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Language Features</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Voice Recognition</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Real-time Translation</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Emergency Phrases</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Cultural Context</span>
            </div>
          </div>
        </div>

        {/* Emergency Phrases */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Quick Emergency Phrases</label>
          <div className="space-y-2">
            {[
              { en: "I need help", translated: getTranslation("I need help", selectedLanguage.code) },
              { en: "Medical emergency", translated: getTranslation("Medical emergency", selectedLanguage.code) },
              { en: "I am trapped", translated: getTranslation("I am trapped", selectedLanguage.code) },
              { en: "Send rescue team", translated: getTranslation("Send rescue team", selectedLanguage.code) },
            ].map((phrase, index) => (
              <div key={index} className="flex items-center justify-between p-2 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{phrase.translated}</p>
                  <p className="text-xs text-muted-foreground">{phrase.en}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => testTTS(phrase.translated)} disabled={!isTTSEnabled}>
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Mock translation function - in real app, this would use a translation API
function getTranslation(text: string, languageCode: string): string {
  const translations: Record<string, Record<string, string>> = {
    es: {
      "I need help": "Necesito ayuda",
      "Medical emergency": "Emergencia médica",
      "I am trapped": "Estoy atrapado",
      "Send rescue team": "Enviar equipo de rescate",
    },
    fr: {
      "I need help": "J'ai besoin d'aide",
      "Medical emergency": "Urgence médicale",
      "I am trapped": "Je suis piégé",
      "Send rescue team": "Envoyer équipe de secours",
    },
    de: {
      "I need help": "Ich brauche Hilfe",
      "Medical emergency": "Medizinischer Notfall",
      "I am trapped": "Ich bin gefangen",
      "Send rescue team": "Rettungsteam senden",
    },
    zh: {
      "I need help": "我需要帮助",
      "Medical emergency": "医疗紧急情况",
      "I am trapped": "我被困了",
      "Send rescue team": "派遣救援队",
    },
    ar: {
      "I need help": "أحتاج مساعدة",
      "Medical emergency": "حالة طوارئ طبية",
      "I am trapped": "أنا محاصر",
      "Send rescue team": "أرسل فريق الإنقاذ",
    },
  }

  return translations[languageCode]?.[text] || text
}
