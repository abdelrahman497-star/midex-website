"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Solutions } from "@/components/sections/solutions"
import { Projects } from "@/components/sections/projects"
import { Clients } from "@/components/sections/clients"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { SplashScreen } from "@/components/splash-screen"

export function HomeContent() {
  const [showSplash, setShowSplash] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    // Show splash for 2 seconds, then fade out
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    // Show content slightly before splash finishes fading
    const contentTimer = setTimeout(() => {
      setContentVisible(true)
    }, 2200)

    return () => {
      clearTimeout(splashTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <>
      <SplashScreen isVisible={showSplash} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        <Navigation />
        <Hero />
        <About />
        <Solutions />
        <Projects />
        <Clients />
        <Contact />
        <Footer />
      </motion.main>
    </>
  )
}
