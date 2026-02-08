import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import logoMain from "@/assets/logo-fernanden-main.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

// TikTok icon component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const universeLinks = [
  { href: "/she", label: "SHE - Spaces & Events" },
  { href: "/dense", label: "DENSE - Fashion" },
  { href: "/cafee", label: "CaFEE - Education & Design" },
];

const resourceLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/about", label: "À propos" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Politique de Confidentialité" },
  { href: "/legal-mentions", label: "Mentions Légales" },
];

const socialLinks = [
  { href: "https://www.facebook.com/share/1A4ToZPFmk/", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/fernanden_design?utm_source=qr&igsh=ZmFrMnhoYjFrOGZv", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/fernanden-entreprises/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.tiktok.com/@fernanden_design?_r=1&_t=ZS-93XhMG6RF5O", icon: TikTokIcon, label: "TikTok" },
];

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setNewsletterEmail('');
    setIsSubscribing(false);
    // You could add a toast notification here
  };

  return (
    <footer className="relative bg-deep-black text-white">
      {/* Simple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10" />
      
      <div className="container-main py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Brand Column - Enhanced */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-block mb-8 group">
              <img 
                src={logoMain} 
                alt="fernanden" 
                className="h-24 lg:h-32 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  fernanden
                </h3>
                <p className="text-soft-gray body-regular leading-relaxed">
                  Design 3-en-1 aux multiples facettes. Mode, espaces, éducation et création graphique — nous transformons vos visions en réalité depuis 2017.
                </p>
              </div>
              
              {/* Social Media - Enhanced */}
              <div className="space-y-4">
                <h4 className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wider">
                  Rejoignez Notre Communauté
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-secondary hover:text-deep-black transition-all duration-300 group border border-white/10"
                      aria-label={social.label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Column - Professional */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-8">
              <div>
                <h4 className="font-heading font-bold text-white text-lg mb-6 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-secondary" />
                  Nos Univers
                </h4>
                <ul className="space-y-3">
                  {universeLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-soft-gray hover:text-white transition-all duration-300 body-regular flex items-center gap-3 group py-1"
                      >
                        <ChevronRight 
                          size={14} 
                          className="text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" 
                        />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-bold text-white text-lg mb-6 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-primary" />
                  Ressources
                </h4>
                <ul className="space-y-3">
                  {resourceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-soft-gray hover:text-white transition-all duration-300 body-regular flex items-center gap-3 group py-1"
                      >
                        <ChevronRight 
                          size={14} 
                          className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" 
                        />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Column - Professional */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h4 className="font-heading font-bold text-white text-lg mb-6 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-densen-gold" />
                  Contactez-nous
                </h4>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/30 transition-colors duration-300">
                      <MapPin size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h5 className="font-heading font-medium text-white mb-2">Notre Siège</h5>
                      <p className="text-soft-gray body-regular leading-relaxed">
                        Cabinet fernanden<br />
                        Lot 265S Parcelle S Quartier Sèmè Aïtchedji<br />
                        Cotonou, Bénin
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors duration-300">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-heading font-medium text-white mb-2">Téléphone</h5>
                      <div className="space-y-1">
                        <a href="tel:+22901975126" className="text-soft-gray hover:text-white transition-colors body-regular block">
                          +229 01 97 51 26 36
                        </a>
                        <a href="tel:+22901487135" className="text-soft-gray hover:text-white transition-colors body-regular block">
                          01 48 71 35 36
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-densen-gold/20 flex items-center justify-center shrink-0 group-hover:bg-densen-gold/30 transition-colors duration-300">
                      <Mail size={20} className="text-densen-gold" />
                    </div>
                    <div>
                      <h5 className="font-heading font-medium text-white mb-2">Email</h5>
                      <a href="mailto:fernandenentreprises@gmail.com" className="text-soft-gray hover:text-white transition-colors body-regular">
                        fernandenentreprises@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Newsletter Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h4 className="font-heading font-bold text-white text-2xl mb-4">
                Restez Inspiré
              </h4>
              <p className="text-soft-gray body-regular leading-relaxed">
                Recevez nos dernières créations, actualités et offres exclusives directement dans votre boîte mail.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-soft-gray focus:border-secondary focus:ring-secondary flex-1 h-12 rounded-xl"
                disabled={isSubscribing}
              />
              <Button 
                type="submit" 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-deep-black px-8 font-semibold h-12 rounded-xl transition-all duration-300 hover:scale-105"
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin" />
                    Inscription...
                  </span>
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar - Enhanced */}
      <div className="border-t border-white/10">
        <div className="container-main py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center lg:text-left">
              <p className="text-soft-gray body-regular">
                {new Date().getFullYear()} fernanden. Tous droits réservés.
              </p>
              <div className="flex items-center gap-6">
                <Link 
                  to="/privacy-policy" 
                  className="text-soft-gray hover:text-white transition-colors body-regular text-sm"
                >
                  Confidentialité
                </Link>
                <span className="text-soft-gray/50">•</span>
                <Link 
                  to="/legal-mentions" 
                  className="text-soft-gray hover:text-white transition-colors body-regular text-sm"
                >
                  Mentions Légales
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-center">
              <div className="flex items-center gap-3 text-soft-gray body-regular text-sm">
                <span>Since 2017</span>
                <span className="text-secondary">•</span>
                <span>Fièrement fabriqué au Bénin </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-soft-gray body-regular text-sm">Label OAPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
