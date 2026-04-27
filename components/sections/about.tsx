"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Award, Users, Globe, Shield } from "lucide-react"

const stats = [
  { value: "18+", label: "Years Experience", icon: Award },
  { value: "500+", label: "Projects Completed", icon: Globe },
  { value: "150+", label: "Expert Engineers", icon: Users },
  { value: "100%", label: "Quality Assured", icon: Shield },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 80, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  return (
    <section id="about" className="py-48 lg:py-64 relative overflow-hidden section-divider">
      {/* Animated Cinematic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] bg-primary/5 rounded-full blur-[250px] animate-breathe" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] animate-breathe" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[180px] animate-breathe" style={{ animationDelay: "-2s" }} />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      <div className="container mx-auto px-8 lg:px-16 xl:px-24 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mb-32"
        >
          <motion.span 
            variants={itemVariants}
            className="text-primary text-xs tracking-[0.35em] uppercase mb-10 block font-medium"
          >
            About MIDEX
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tight mb-14 leading-[1.02]"
          >
            Building the{" "}
            <span className="gradient-text font-light">Future</span>
            <br />
            <span className="text-muted-foreground">of Industrial Excellence</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl xl:text-3xl text-muted-foreground leading-relaxed font-light max-w-4xl"
          >
            MIDEX Integrated Projects & Contracting stands at the forefront of engineering 
            innovation, delivering comprehensive solutions for pharmaceutical manufacturing, 
            industrial processing, and hygienic water treatment systems across the Middle East 
            and beyond.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-36"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
              className="glass rounded-3xl p-10 lg:p-14 text-center group hover:bg-secondary/20 transition-all duration-700 card-premium"
            >
              <motion.div 
                className="mb-10 inline-flex items-center justify-center w-18 h-18 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-9 h-9" strokeWidth={1.5} />
              </motion.div>
              <motion.div 
                className="text-5xl lg:text-7xl font-extralight gradient-text mb-5 tracking-tight"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs text-muted-foreground tracking-[0.25em] uppercase font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-10 lg:gap-14"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.4 } }}
            className="glass rounded-3xl p-14 lg:p-18 hover:bg-secondary/20 transition-all duration-700 card-premium group relative overflow-hidden"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            <motion.div 
              className="w-16 h-px bg-gradient-to-r from-primary to-transparent mb-10"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <h3 className="text-2xl lg:text-4xl font-light mb-10 text-foreground group-hover:text-primary transition-colors duration-500">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-light">
              To deliver exceptional engineering solutions that meet the highest international 
              standards, ensuring operational excellence and sustainable practices for our 
              clients across all industries we serve.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.4 } }}
            className="glass rounded-3xl p-14 lg:p-18 hover:bg-secondary/20 transition-all duration-700 card-premium group relative overflow-hidden"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
            
            <motion.div 
              className="w-16 h-px bg-gradient-to-r from-accent to-transparent mb-10"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <h3 className="text-2xl lg:text-4xl font-light mb-10 text-foreground group-hover:text-accent transition-colors duration-500">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-light">
              To become the region&apos;s most trusted partner for integrated engineering 
              solutions, recognized globally for our commitment to innovation, quality, 
              and transformative impact on critical infrastructure.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
