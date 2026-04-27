"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, MapPin } from "lucide-react"

const projects = [
  {
    title: "Pharmaceutical Manufacturing Facility",
    location: "Riyadh, Saudi Arabia",
    category: "Pharmaceutical",
    description: "Complete turnkey pharmaceutical manufacturing facility with WHO-GMP certification, including cleanrooms, HVAC, and water systems.",
    year: "2024",
    scale: "45,000 m²"
  },
  {
    title: "Water Treatment Plant",
    location: "Dubai, UAE",
    category: "Water Systems",
    description: "Large-scale industrial water treatment and purification system serving multiple manufacturing units.",
    year: "2023",
    scale: "120,000 L/day"
  },
  {
    title: "Biotech Research Center",
    location: "Cairo, Egypt",
    category: "Life Sciences",
    description: "State-of-the-art biotechnology research facility with advanced containment and environmental control systems.",
    year: "2023",
    scale: "18,000 m²"
  },
  {
    title: "Food Processing Complex",
    location: "Jeddah, Saudi Arabia",
    category: "Industrial",
    description: "Hygienic food processing facility with integrated automation and compliance to international food safety standards.",
    year: "2022",
    scale: "32,000 m²"
  }
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

export function Projects() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section id="projects" className="py-48 lg:py-64 relative overflow-hidden section-divider">
      {/* Animated Cinematic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/2 left-0 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[250px] -translate-y-1/2 animate-breathe" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[200px] animate-breathe" style={{ animationDelay: "-4s" }} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      <div className="container mx-auto px-8 lg:px-16 xl:px-24 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-14 mb-28"
        >
          <div className="max-w-4xl">
            <motion.span 
              variants={itemVariants}
              className="text-primary text-xs tracking-[0.35em] uppercase mb-10 block font-medium"
            >
              Featured Projects
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tight leading-[1.02]"
            >
              Landmark{" "}
              <span className="gradient-text font-light">Achievements</span>
            </motion.h2>
          </div>
          <motion.p 
            variants={itemVariants}
            className="text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-lg font-light leading-relaxed"
          >
            Discover our portfolio of transformative projects that showcase engineering 
            excellence across diverse industries.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-10 lg:gap-14"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
              className="group cursor-pointer"
            >
              <div className="glass rounded-3xl p-14 lg:p-16 h-full hover:bg-secondary/20 transition-all duration-700 relative overflow-hidden card-premium">
                {/* Animated hover gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Year & Scale Badge */}
                <div className="absolute top-12 right-12 lg:top-14 lg:right-14 flex items-center gap-5">
                  <motion.span 
                    className="text-sm text-muted-foreground font-light"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {project.scale}
                  </motion.span>
                  <span className="w-px h-5 bg-border" />
                  <motion.span 
                    className="text-sm text-muted-foreground font-light"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {project.year}
                  </motion.span>
                </div>

                {/* Category */}
                <motion.span 
                  className="inline-block px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase rounded-full bg-primary/10 text-primary mb-12 font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {project.category}
                </motion.span>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-light mb-5 text-foreground group-hover:text-primary transition-colors duration-500 flex items-start gap-5 leading-tight pr-20">
                  {project.title}
                  <motion.span
                    initial={{ opacity: 0, y: 5, x: -5 }}
                    whileHover={{ opacity: 1, y: 0, x: 0 }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <ArrowUpRight className="w-7 h-7 lg:w-9 lg:h-9 flex-shrink-0" />
                  </motion.span>
                </h3>

                {/* Location */}
                <p className="text-primary/70 mb-10 flex items-center gap-3 font-light text-lg">
                  <MapPin className="w-5 h-5" />
                  {project.location}
                </p>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-light">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
