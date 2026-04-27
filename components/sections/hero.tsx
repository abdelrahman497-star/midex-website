"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [videoZoom, setVideoZoom] = useState(1)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.75, 0.98])
  
  // Smooth spring values for mouse movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Slow zoom effect on video
  useEffect(() => {
    const zoomAnimation = animate(1, 1.15, {
      duration: 30,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      onUpdate: (latest) => setVideoZoom(latest)
    })
    return () => zoomAnimation.stop()
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 30
      const y = (clientY / innerHeight - 0.5) * 30
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: clientX, y: clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Multi-Layer Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient layer */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 150% 100% at 10% 10%, oklch(0.18 0.08 220) 0%, oklch(0.06 0.02 250) 40%, oklch(0.04 0.01 250) 100%)",
              "radial-gradient(ellipse 120% 130% at 90% 20%, oklch(0.14 0.06 200) 0%, oklch(0.06 0.02 250) 40%, oklch(0.04 0.01 250) 100%)",
              "radial-gradient(ellipse 130% 120% at 50% 90%, oklch(0.16 0.05 230) 0%, oklch(0.06 0.02 250) 40%, oklch(0.04 0.01 250) 100%)",
              "radial-gradient(ellipse 150% 100% at 10% 10%, oklch(0.18 0.08 220) 0%, oklch(0.06 0.02 250) 40%, oklch(0.04 0.01 250) 100%)",
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Secondary moving gradient layer */}
        <motion.div 
          className="absolute inset-0 opacity-60"
          animate={{
            background: [
              "radial-gradient(circle 800px at 80% 60%, oklch(0.12 0.06 195/0.5) 0%, transparent 70%)",
              "radial-gradient(circle 800px at 20% 40%, oklch(0.12 0.06 195/0.5) 0%, transparent 70%)",
              "radial-gradient(circle 800px at 60% 80%, oklch(0.12 0.06 195/0.5) 0%, transparent 70%)",
              "radial-gradient(circle 800px at 80% 60%, oklch(0.12 0.06 195/0.5) 0%, transparent 70%)",
            ]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Video Background with Slow Zoom & Parallax */}
      <motion.div 
        style={{ 
          y: videoY, 
          scale: videoScale,
          x: smoothMouseX,
        }}
        className="absolute inset-0 z-[1]"
      >
        <motion.div
          style={{ scale: videoZoom }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-110"
            poster="/images/hero-poster.jpg"
          >
            <source 
              src="https://videos.pexels.com/video-files/4481264/4481264-uhd_2560_1440_24fps.mp4" 
              type="video/mp4" 
            />
          </video>
        </motion.div>
      </motion.div>

      {/* Layered Dark Cinematic Overlays */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[2] bg-gradient-to-b from-[oklch(0.02_0.02_250)] via-[oklch(0.04_0.02_250/0.85)] to-[oklch(0.02_0.02_250)]" 
      />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[oklch(0.02_0.02_250/0.97)] via-[oklch(0.03_0.02_250/0.6)] to-[oklch(0.02_0.02_250/0.97)]" />
      <div className="absolute inset-0 z-[2] bg-[oklch(0.03_0.02_250/0.7)]" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[oklch(0.015_0.02_250)] via-transparent to-[oklch(0.015_0.02_250/0.6)]" />
      
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 z-[3] opacity-[0.015] pointer-events-none noise-overlay" />

      {/* Cinematic Moving Light Effects */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        {/* Primary floating orb with mouse interaction */}
        <motion.div 
          style={{ 
            x: useTransform(smoothMouseX, (v) => v * -2),
            y: useTransform(smoothMouseY, (v) => v * -2)
          }}
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-[oklch(0.72_0.14_195/0.5)] rounded-full blur-[250px]" 
        />
        
        {/* Secondary accent orb */}
        <motion.div 
          style={{ 
            x: useTransform(smoothMouseX, (v) => v * 1.5),
            y: useTransform(smoothMouseY, (v) => v * 1.5)
          }}
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-[oklch(0.72_0.13_55/0.35)] rounded-full blur-[220px]" 
        />
        
        {/* Center glow pulse */}
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.08, 0.2, 0.08]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[oklch(0.60_0.12_210/0.25)] rounded-full blur-[300px]" 
        />

        {/* Top light beam sweep */}
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05],
            x: ["-20%", "20%", "-20%"],
            scaleY: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[70vh] bg-gradient-to-b from-[oklch(0.72_0.14_195/0.2)] to-transparent blur-[120px]"
        />
        
        {/* Rotating light ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[oklch(0.72_0.14_195/0.1)] rounded-full blur-[150px]" />
        </motion.div>
      </div>

      {/* Interactive spotlight following mouse */}
      <motion.div
        className="absolute z-[5] pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          x: "-50%",
          y: "-50%"
        }}
      >
        <div className="w-[600px] h-[600px] bg-[oklch(0.72_0.14_195/0.06)] rounded-full blur-[150px]" />
      </motion.div>

      {/* Subtle animated grid pattern */}
      <div className="absolute inset-0 z-[6] pointer-events-none">
        <motion.div
          animate={{ opacity: [0.01, 0.025, 0.01] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '120px 120px'
          }}
        />
      </div>

      {/* Cinematic vignette with depth */}
      <div className="absolute inset-0 z-[7] pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[oklch(0.025_0.02_250)] via-[oklch(0.03_0.02_250/0.6)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[oklch(0.025_0.02_250)] via-[oklch(0.03_0.02_250/0.7)] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-[oklch(0.03_0.02_250/0.9)] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-[oklch(0.03_0.02_250/0.9)] to-transparent" />
      </div>

      {/* Main Content with Enhanced Parallax */}
      <motion.div 
        style={{ 
          y: contentY, 
          opacity: contentOpacity,
          x: useTransform(smoothMouseX, (v) => v * -0.3),
        }}
        className="container mx-auto px-8 lg:px-16 xl:px-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Animated accent line above */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-20 w-40 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.14_195)] to-transparent"
          />

          {/* Overline Badge with glow */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 relative"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 blur-xl bg-primary/20 rounded-full"
            />
            <span className="relative inline-flex items-center gap-5 px-10 py-5 rounded-full bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] text-sm text-white/70 tracking-[0.3em] uppercase shadow-[0_12px_40px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <motion.span 
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-[oklch(0.72_0.14_195)]" 
              />
              Engineering Excellence Since 2005
            </span>
          </motion.div>

          {/* MIDEX Title with Enhanced Neon Glow Effect */}
          <motion.div
            initial={{ opacity: 0, y: 80, filter: "blur(25px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10"
          >
            {/* Multi-layer glow behind text */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-extralight tracking-[-0.03em] text-[oklch(0.72_0.14_195)] blur-[80px]">
                MIDEX
              </span>
            </motion.div>
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-extralight tracking-[-0.03em] text-[oklch(0.72_0.13_55)] blur-[100px]">
                MIDEX
              </span>
            </motion.div>
            
            {/* Main title */}
            <h1 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-extralight tracking-[-0.03em] leading-[0.85] text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.2)] neon-glow">
              MIDEX
            </h1>
          </motion.div>

          {/* Integrated subtitle with enhanced gradient */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-tight gradient-text">
              Integrated
            </span>
          </motion.div>

          {/* Tagline with character stagger effect */}
          <motion.p
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/45 font-extralight max-w-5xl mx-auto mb-24 leading-relaxed tracking-wide"
          >
            Delivering world-class pharmaceutical, industrial,{" "}
            <span className="text-white/75">and hygienic water systems</span> with{" "}
            <span className="gradient-text-gold font-light">precision engineering</span>.
          </motion.p>

          {/* CTA Buttons with Enhanced Hover Glow */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-10 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              {/* Multi-layer button glow */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-[oklch(0.72_0.14_195)] via-[oklch(0.65_0.12_210)] to-[oklch(0.72_0.13_55)] rounded-full opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-700"
              />
              <motion.div
                className="absolute -inset-1 bg-[oklch(0.72_0.14_195)] rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"
              />
              <Button
                asChild
                size="lg"
                className="relative bg-[oklch(0.72_0.14_195)] hover:bg-[oklch(0.78_0.14_195)] text-[oklch(0.06_0.02_250)] px-14 py-9 text-lg font-medium group rounded-full shadow-[0_10px_50px_-10px_oklch(0.72_0.14_195/0.6)] hover:shadow-[0_16px_60px_-10px_oklch(0.72_0.14_195/0.8)] transition-all duration-700"
              >
                <a href="#solutions">
                  Explore Solutions
                  <ArrowRight className="ml-5 h-5 w-5 transition-transform duration-500 group-hover:translate-x-3" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              {/* Outline button glow effect */}
              <motion.div
                className="absolute -inset-2 bg-white/25 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700"
              />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="relative border-white/15 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/30 text-white px-14 py-9 text-lg font-light rounded-full backdrop-blur-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700"
              >
                <a href="#contact">Start a Project</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Decorative animated lines below */}
          <div className="mt-28 flex flex-col items-center gap-3">
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-px h-24 bg-gradient-to-b from-[oklch(0.72_0.14_195/0.8)] via-[oklch(0.72_0.14_195/0.3)] to-transparent origin-top"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="w-2 h-2 rounded-full bg-primary/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator with enhanced animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-5 text-white/35 hover:text-white/70 transition-colors duration-700 group"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase font-medium">Discover</span>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 bg-primary/30 rounded-full blur-md"
            />
            <ChevronDown className="h-6 w-6 group-hover:text-[oklch(0.72_0.14_195)] transition-colors duration-500" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  )
}
