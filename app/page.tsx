"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Image as ImageIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/30 dark:bg-gray-950/30 border-b border-gray-200/20 dark:border-gray-800/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white dark:text-gray-900" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              ImageStory AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-gray-800 to-gray-950 hover:from-gray-700 hover:to-gray-900 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Real-time AI Image Generation
              </span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
              Create Stories
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-400 dark:to-gray-100 bg-clip-text text-transparent">
              With Every Word
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Watch your imagination come to life instantly. Type, and AI-powered images appear in real-time,
            crafting beautiful visual stories as you create.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-gray-800 to-gray-950 hover:from-gray-700 hover:to-gray-900 text-white text-lg px-8 py-6">
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-gray-300 dark:border-gray-700">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Instant Generation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Images appear as you type. No waiting, no delays. Experience true real-time AI generation.
              </p>
            </Card>

            <Card className="p-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 flex items-center justify-center mb-4">
                <ImageIcon className="h-6 w-6 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Stunning Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Powered by FLUX.1, the latest AI model delivering photorealistic, high-quality images.
              </p>
            </Card>

            <Card className="p-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Story Builder
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your images into beautiful stories. Create, save, and share your visual narratives.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-100 border-0 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white dark:text-gray-900">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-gray-300 dark:text-gray-700 text-lg mb-8">
              Join thousands of creators bringing their stories to life with AI
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white hover:bg-gray-100 text-gray-900 text-lg px-8 py-6 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/20 dark:border-gray-800/20 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 ImageStory AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
