"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Linkedin, Twitter, Facebook, Instagram, ArrowUpRight } from "lucide-react"

const footerLinks = {
  solutions: [
    { name: "Pharmaceutical Systems", href: "#solutions" },
    { name: "Water Treatment", href: "#solutions" },
    { name: "Industrial Processing", href: "#solutions" },
    { name: "Automation & Control", href: "#solutions" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Projects", href: "#projects" },
    { name: "Careers", href: "#" },
    { name: "News & Insights", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ]
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
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
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <footer ref={ref} className="relative pt-40 pb-20 border-t border-border/30">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[250px] animate-breathe" />

      <div className="container mx-auto px-8 lg:px-16 xl:px-24 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-12 gap-20 lg:gap-16 mb-24"
        >
          {/* Brand Column */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4"
          >
            <motion.div 
              className="flex items-center gap-5 mb-10"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-2xl">M</span>
              </div>
              <span className="text-3xl font-light tracking-tight">MIDEX</span>
            </motion.div>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-sm text-lg font-light">
              Engineering excellence for pharmaceutical, industrial, and hygienic 
              water systems. Building the future of critical infrastructure.
            </p>
            <div className="flex gap-5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-500"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-16 lg:gap-12">
            <motion.div variants={itemVariants}>
              <h4 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-10 font-medium">Solutions</h4>
              <ul className="space-y-6">
                {footerLinks.solutions.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-foreground/80 hover:text-primary transition-colors duration-500 font-light group flex items-center gap-2 text-lg"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-10 font-medium">Company</h4>
              <ul className="space-y-6">
                {footerLinks.company.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-foreground/80 hover:text-primary transition-colors duration-500 font-light group flex items-center gap-2 text-lg"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-10 font-medium">Legal</h4>
              <ul className="space-y-6">
                {footerLinks.legal.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-foreground/80 hover:text-primary transition-colors duration-500 font-light group flex items-center gap-2 text-lg"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-14 border-t border-border/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-base text-muted-foreground font-light">
              © {new Date().getFullYear()} MIDEX Integrated Projects & Contracting. All rights reserved.
            </p>
            <motion.p 
              className="text-base text-muted-foreground/50 font-light tracking-wide"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Engineering Excellence Since 2005
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
