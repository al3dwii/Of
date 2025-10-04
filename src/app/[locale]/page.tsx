'use client'

import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { LOCALES, type Locale } from "@/data/locales"
import { slidesLandings } from "@/data/landings.slides"
import { useTranslation } from "@/i18n/useTranslation"
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Presentation, Video, Zap, Shield, Globe, Users } from 'lucide-react'

interface PageProps {
  params: { locale: Locale }
}

export default function HomePage({ params }: PageProps) {
  const { t, locale } = useTranslation()
  const isAr = locale === "ar"
  const featured = slidesLandings.filter((x) => x.locale === locale).slice(0, 6)

  const ar = slidesLandings.find((x) => x.locale === "ar")
  const en = slidesLandings.find((x) => x.locale === "en")

  return (
    <main className="min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.home.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.home.hero.subtitle}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}/slides`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
              >
                {t.home.hero.ctaSlides}
              </Link>
              <Link
                href={`/${locale}/video`}
                className="bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {t.home.hero.ctaVideo}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.home.features.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Slides */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t.home.features.slides.title}
              </h3>
              <p className="text-gray-600">
                {t.home.features.slides.description}
              </p>
            </div>

            {/* Feature 2: Video */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t.home.features.video.title}
              </h3>
              <p className="text-gray-600">
                {t.home.features.video.description}
              </p>
            </div>

            {/* Feature 3: Analytics */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t.home.features.analytics.title}
              </h3>
              <p className="text-gray-600">
                {t.home.features.analytics.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Landings */}
      {(ar || en) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t.home.popularLandings.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ar && (
                <Link
                  className="rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all bg-white"
                  href={`/${ar.locale}/slides/${encodeURIComponent(ar.slug)}`}
                >
                  <div className="text-sm text-gray-500 mb-1">{t.home.popularLandings.arabic}</div>
                  <div className="font-semibold text-lg text-gray-900">{ar.h1}</div>
                  <div className="text-sm text-gray-600 mt-1">{ar.description}</div>
                </Link>
              )}
              {en && (
                <Link
                  className="rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all bg-white"
                  href={`/${en.locale}/slides/${encodeURIComponent(en.slug)}`}
                >
                  <div className="text-sm text-gray-500 mb-1">{t.home.popularLandings.english}</div>
                  <div className="font-semibold text-lg text-gray-900">{en.h1}</div>
                  <div className="text-sm text-gray-600 mt-1">{en.description}</div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured Content */}
      {featured.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t.home.popularLandings.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.locale}/slides/${encodeURIComponent(item.slug)}`}
                  className="rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all bg-white"
                >
                  <div className="font-semibold text-lg text-gray-900">{item.h1}</div>
                  <div className="text-sm text-gray-600 mt-2">{item.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.home.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t.home.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/dashboard`}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t.common.getStarted}
            </Link>
            <Link
              href={`/${locale}/slides`}
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t.common.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <Script
        id={`ld-website-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: `https://yoursite.com/${locale}`,
            name: t.brand.name,
            description: t.brand.tagline,
            inLanguage: locale,
            potentialAction: {
              "@type": "SearchAction",
              target: `https://yoursite.com/${locale}/{search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>
  )
}
