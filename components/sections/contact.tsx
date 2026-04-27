"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { MapPin, Phone, Mail, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Engineering Boulevard", "Riyadh, Saudi Arabia 12345"]
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+966 11 234 5678", "+966 11 234 5679"]
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@midex.com", "projects@midex.com"]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-48 lg:py-64 relative overflow-hidden section-divider">
      {/* Animated Cinematic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[250px] animate-breathe" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] animate-breathe" style={{ animationDelay: "-4s" }} />
        
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
            Get In Touch
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tight mb-14 leading-[1.02]"
          >
            Let&apos;s Build{" "}
            <span className="gradient-text font-light">Together</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl xl:text-3xl text-muted-foreground leading-relaxed font-light"
          >
            Ready to start your next project? Our team of experts is here to help 
            bring your vision to life.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid sm:grid-cols-2 gap-10">
                <motion.div variants={itemVariants} className="space-y-4">
                  <label htmlFor="name" className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">
                    Full Name
                  </label>
                  <motion.div
                    animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      id="name"
                      placeholder="John Smith"
                      className="bg-secondary/30 border-border/50 focus:border-primary h-16 rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-500 hover:border-border text-lg"
                      required
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-4">
                  <label htmlFor="email" className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">
                    Email Address
                  </label>
                  <motion.div
                    animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="bg-secondary/30 border-border/50 focus:border-primary h-16 rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-500 hover:border-border text-lg"
                      required
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-4">
                <label htmlFor="company" className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">
                  Company Name
                </label>
                <motion.div
                  animate={{ scale: focusedField === 'company' ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    id="company"
                    placeholder="Your Company"
                    className="bg-secondary/30 border-border/50 focus:border-primary h-16 rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-500 hover:border-border text-lg"
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <label htmlFor="subject" className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">
                  Subject
                </label>
                <motion.div
                  animate={{ scale: focusedField === 'subject' ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    id="subject"
                    placeholder="Project Inquiry"
                    className="bg-secondary/30 border-border/50 focus:border-primary h-16 rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-500 hover:border-border text-lg"
                    required
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <label htmlFor="message" className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">
                  Message
                </label>
                <motion.div
                  animate={{ scale: focusedField === 'message' ? 1.01 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    className="bg-secondary/30 border-border/50 focus:border-primary min-h-[220px] resize-none rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-500 hover:border-border text-lg"
                    required
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-18 text-lg group rounded-full button-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.span 
                      className="flex items-center gap-4"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Send className="w-5 h-5" />
                      Sending...
                    </motion.span>
                  ) : (
                    <span className="flex items-center gap-4">
                      Send Message
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-12 hover:bg-secondary/20 transition-all duration-700 group card-premium"
              >
                <div className="flex items-start gap-10">
                  <motion.div 
                    className="w-18 h-18 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-8 h-8" strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-light text-foreground mb-5 group-hover:text-primary transition-colors duration-500">
                      {item.title}
                    </h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground font-light text-lg">{detail}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass rounded-3xl p-4 overflow-hidden card-premium"
            >
              <div className="aspect-[4/3] rounded-2xl bg-secondary/30 flex items-center justify-center relative overflow-hidden">
                {/* Animated decorative grid */}
                <motion.div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                  animate={{ 
                    backgroundPosition: ['0px 0px', '40px 40px']
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
                <motion.div 
                  className="text-center relative z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <MapPin className="w-16 h-16 text-primary/30 mx-auto mb-5" strokeWidth={1} />
                  <p className="text-muted-foreground font-light text-xl">Interactive Map</p>
                  <p className="text-sm text-muted-foreground/50 mt-2">Coming Soon</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
