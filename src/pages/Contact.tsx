import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GlowingInput } from "@/components/animations/GlowingInput";
import { GlowingTextarea } from "@/components/animations/GlowingTextarea";
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { MagneticButton } from "@/components/animations/MagneticButton";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Cabinet fernanden, Cotonou, Bénin",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: (
        <>
          <a href="tel:+22901975126" className="hover:text-primary transition-colors block">
            +229 01 97 51 26 36
          </a>
          <a href="tel:+22901487135" className="hover:text-primary transition-colors block">
            01 48 71 35 36
          </a>
        </>
      ),
      href: null,
    },
    {
      icon: Mail,
      title: "Email",
      content: "fernandenentreprises@gmail.com",
      href: "mailto:fernandenentreprises@gmail.com",
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun - Ven: 9h - 18h | Sam: 10h - 14h",
    },
  ];

  return (
    <Layout>
      {/* Hero Section - More compact with animation */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        {/* Background blobs */}
        <GradientBlob 
          className="-top-40 -right-40" 
          color1="hsl(var(--primary) / 0.15)"
          color2="hsl(var(--secondary) / 0.1)"
          size="600px"
        />
        <GradientBlob 
          className="-bottom-20 -left-40" 
          color1="hsl(var(--secondary) / 0.1)"
          color2="hsl(var(--primary) / 0.15)"
          size="400px"
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Sparkles size={16} className="text-primary" />
              <span className="font-heading text-sm font-medium text-primary">Parlons de votre projet</span>
            </motion.div>
            
            <h1 className="heading-hero text-foreground mb-4">
              <AnimatedLetters text="Contactez-nous" type="wave" />
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="body-large text-muted-foreground max-w-xl mx-auto"
            >
              Nous sommes là pour transformer vos idées en réalité
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info - Dense layout */}
      <section className="py-12 relative">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info - Compact sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-card p-5 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <info.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">{info.title}</h4>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="body-small text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="body-small text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}

              {/* Social CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-deep-black text-white p-6 rounded-2xl"
              >
                <h4 className="font-heading font-semibold mb-2">Suivez-nous</h4>
                <p className="body-small text-white/70 mb-4">Restez connectés avec nos actualités</p>
                <div className="flex gap-3">
                  {["FB", "IG", "LI", "YT"].map((social, i) => (
                    <motion.button
                      key={social}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium hover:bg-primary transition-colors"
                    >
                      {social}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form - Modern with glowing inputs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <h3 className="heading-subsection text-foreground mb-2">
                    Envoyez-nous un message
                  </h3>
                  <p className="body-small text-muted-foreground mb-8">
                    Décrivez votre projet et nous vous recontacterons rapidement
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <GlowingInput label="Nom complet" required />
                      <GlowingInput label="Email" type="email" required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <GlowingInput label="Téléphone" />
                      <GlowingInput label="Sujet" required />
                    </div>

                    <GlowingTextarea label="Votre message" rows={5} required />

                    <MagneticButton strength={0.2}>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full md:w-auto min-w-[200px] rounded-xl relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                          animate={{ x: isSubmitting ? ["0%", "100%"] : "0%" }}
                          transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                        />
                        <span className="relative flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Envoyer le message
                            </>
                          )}
                        </span>
                      </Button>
                    </MagneticButton>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder - Full width */}
      <section className="h-64 bg-muted relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"
        />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')",
            filter: "grayscale(100%) contrast(0.8)"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-card px-6 py-3 rounded-full shadow-xl flex items-center gap-3"
          >
            <MapPin className="text-primary" size={20} />
            <span className="font-heading font-medium">Cotonou, Bénin</span>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
