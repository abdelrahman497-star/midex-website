"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Droplets, Factory, FlaskConical, Cog, Zap, Shield, ArrowRight } from "lucide-react"

const solutions = [
  {
    icon: FlaskConical,
    title: "Pharmaceutical Systems",
    description: "State-of-the-art pharmaceutical manufacturing facilities designed to meet FDA, EMA, and WHO-GMP standards.",
    features: ["Clean Room Design", "HVAC Systems", "Process Piping"]
  },
  {
    icon: Droplets,
    title: "Water Treatment",
    description: "Advanced purified water, WFI, and wastewater treatment systems for critical applications.",
    features: ["RO/EDI Systems", "WFI Generation", "Distribution Loops"]
  },
  {
    icon: Factory,
    title: "Industrial Processing",
    description: "Comprehensive industrial solutions for manufacturing, processing, and production facilities.",
    features: ["Process Design", "Equipment Supply", "System Integration"]
  },
  {
    icon: Cog,
    title: "Mechanical Systems",
    description: "Complete mechanical engineering services including HVAC, utilities, and building services.",
    features: ["HVAC Design", "Utilities", "Fire Protection"]
  },
  {
    icon: Zap,
    title: "Automation & Control",
    description: "Intelligent automation solutions with PLC/SCADA systems for optimal process control.",
    features: ["PLC Programming", "SCADA Systems", "DCS Integration"]
  },
  {
    icon: Shield,
    title: "Validation Services",
    description: "Comprehensive qualification and validation services ensuring regulatory compliance.",
    features: ["IQ/OQ/PQ", "CSV Services", "Documentation"]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
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

export function Solutions() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section id="solutions" className="py-48 lg:py-64 relative overflow-hidden section-divider">
      {/* Animated Cinematic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[250px] animate-breathe" />
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] animate-breathe" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[180px] animate-breathe" style={{ animationDelay: "-6s" }} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      <div className="container mx-auto px-8 lg:px-16 xl:px-24 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-5xl mx-auto mb-32"
        >
          <motion.span 
            variants={itemVariants}
            className="text-primary text-xs tracking-[0.35em] uppercase mb-10 block font-medium"
          >
            Our Solutions
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tight mb-14 leading-[1.02]"
          >
            Comprehensive{" "}
            <span className="gradient-text font-light">Engineering</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl xl:text-3xl text-muted-foreground leading-relaxed font-light"
          >
            From concept to commissioning, we deliver integrated solutions that 
            transform your vision into operational excellence.
          </motion.p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
              className="group"
            >
              <div className="glass rounded-3xl p-10 lg:p-14 h-full hover:bg-secondary/20 transition-all duration-700 relative overflow-hidden card-premium">
                {/* Animated hover gradient accent */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Decorative corner with shimmer */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-bl-full shimmer" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className="mb-12 inline-flex items-center justify-center w-18 h-18 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <solution.icon className="w-9 h-9" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title with arrow */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl lg:text-2xl font-light text-foreground group-hover:text-primary transition-colors duration-500">
                      {solution.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-500"
                    >
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-12 font-light text-lg">
                    {solution.description}
                  </p>

                  {/* Features with staggered animation */}
                  <div className="flex flex-wrap gap-3">
                    {solution.features.map((feature, featureIndex) => (
                      <motion.span
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.5 + index * 0.1 + featureIndex * 0.05 
                        }}
                        className="px-5 py-2.5 text-xs tracking-wide rounded-full bg-secondary/50 text-secondary-foreground border border-border/50 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
