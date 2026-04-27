"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Quote } from "lucide-react"

const clientLogos = [
  { name: "Saudi Pharmaceutical", initials: "SP" },
  { name: "Gulf Industries", initials: "GI" },
  { name: "MENA Medical", initials: "MM" },
  { name: "Royal Healthcare", initials: "RH" },
  { name: "Emirates Water", initials: "EW" },
  { name: "Arab Biotech", initials: "AB" },
  { name: "Petra Pharma", initials: "PP" },
  { name: "National Industries", initials: "NI" },
]

const testimonials = [
  {
    quote: "MIDEX delivered our pharmaceutical facility on time and exceeded all quality expectations. Their attention to detail and regulatory knowledge is exceptional.",
    author: "Dr. Ahmed Al-Rashid",
    role: "Operations Director",
    company: "Saudi Pharmaceutical Industries"
  },
  {
    quote: "The water treatment system designed by MIDEX has been operating flawlessly for over three years. Their ongoing support has been invaluable.",
    author: "Eng. Sarah Hassan",
    role: "Plant Manager",
    company: "Gulf Water Solutions"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function Clients() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section id="clients" className="py-48 lg:py-64 relative overflow-hidden section-divider">
      {/* Animated Cinematic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-accent/5 rounded-full blur-[250px] animate-breathe" />
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[200px] animate-breathe" style={{ animationDelay: "-3s" }} />
        
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
            Our Clients
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tight mb-14 leading-[1.02]"
          >
            Trusted by{" "}
            <span className="gradient-text font-light">Industry Leaders</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl xl:text-3xl text-muted-foreground leading-relaxed font-light"
          >
            We&apos;ve partnered with leading organizations across the region, 
            delivering excellence in every project.
          </motion.p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-36"
        >
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="glass rounded-2xl p-10 lg:p-12 flex items-center justify-center hover:bg-secondary/20 transition-all duration-700 group card-premium"
            >
              <div className="text-center">
                <motion.div 
                  className="w-22 h-22 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-700"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-2xl font-light gradient-text">{client.initials}</span>
                </motion.div>
                <span className="text-sm text-muted-foreground font-light">{client.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-10 lg:gap-14"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
              className="glass rounded-3xl p-14 lg:p-18 hover:bg-secondary/20 transition-all duration-700 card-premium group relative overflow-hidden"
            >
              {/* Animated hover gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Quote Icon */}
              <motion.div 
                className="absolute top-12 right-12 lg:top-14 lg:right-14"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Quote className="w-12 h-12 text-primary/20 group-hover:text-primary/40 transition-colors duration-700" />
              </motion.div>

              {/* Decorative line */}
              <motion.div 
                className="w-16 h-px bg-gradient-to-r from-primary to-transparent mb-12"
                initial={{ width: 0 }}
                animate={isInView ? { width: 64 } : {}}
                transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
              />
              
              {/* Quote */}
              <blockquote className="text-xl lg:text-2xl xl:text-3xl font-extralight text-foreground leading-relaxed mb-14 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-7 relative z-10">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-medium text-xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </motion.div>
                <div>
                  <div className="font-medium text-foreground text-xl">{testimonial.author}</div>
                  <div className="text-base text-muted-foreground font-light">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary/70 mt-1 font-light">
                    {testimonial.company}
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
