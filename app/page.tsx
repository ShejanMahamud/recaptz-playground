"use client";

import { BrowserSupport } from "@/components/layout/BrowserSupport";
import { FeatureCards } from "@/components/layout/FeatureCards";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { CaptchaPlayground } from "@/components/playground/CaptchaPlayground";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <Hero />
        <FeatureCards />

        <div id="playground" className="space-y-16 mb-16">
          <CaptchaPlayground />
        </div>

        <BrowserSupport />
        <Footer />
      </main>
    </div>
  );
}
