import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import logoMain from "@/assets/logo-fernanden-main.png";

// TikTok icon component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const universeLinks = [
  { href: "/she", label: "SHE - Spaces & Events" },
  { href: "/densen", label: "DENSEN - Fashion" },
  { href: "/cafee", label: "CaFEE - Education" },
  { href: "/cafee/expressive", label: "CaFEE - Design" },
];

const resourceLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/resources", label: "Ressources" },
  { href: "/about", label: "À propos" },
];

const legalLinks = [
  { href: "/privacy", label: "Politique de confidentialité" },
  { href: "/terms", label: "Conditions d'utilisation" },
  { href: "/cookies", label: "Cookies" },
];

const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://tiktok.com", icon: TikTokIcon, label: "TikTok" },
];

export function Footer() {
  return (
    <footer className="bg-deep-black text-white relative overflow-hidden">
      {/* Decorative citron arc */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100 20 C60 20, 20 60, 20 100 C20 140, 60 180, 100 180"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
            fill="none"
          />
        </svg>
      </div>
      
      <div className="container-main py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & About */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-block mb-6 p-4 bg-cream rounded-2xl shadow-lg">
              <img 
                src={logoMain} 
                alt="fernanden" 
                className="h-24 md:h-28 object-contain"
              />
            </Link>
            <p className="text-soft-gray body-small mb-4">
              Un design 3en1 aux multiples facettes.
            </p>
            <p className="text-soft-gray body-small mb-6">
              Mode, espaces, éducation et création graphique — nous transformons vos visions en réalité.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-deep-black transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Universes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-heading font-semibold text-lg mb-6 text-secondary">Nos Univers</h4>
            <ul className="space-y-3">
              {universeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-soft-gray hover:text-white transition-colors body-small flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Resources & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-heading font-semibold text-lg mb-6 text-secondary">Ressources</h4>
            <ul className="space-y-3 mb-8">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-soft-gray hover:text-white transition-colors body-small flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-heading font-semibold text-lg mb-4 text-white/80">Légal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-soft-gray hover:text-white transition-colors body-small"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-heading font-semibold text-lg mb-6 text-secondary">Contact</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-secondary shrink-0 mt-0.5" />
                <span className="text-soft-gray body-small">
                  Cabinet fernanden<br />
                  Cotonou, Bénin
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-secondary shrink-0" />
                <div className="text-soft-gray body-small">
                  <a href="tel:+22901975126" className="hover:text-white transition-colors block">
                    +229 01 97 51 26 36
                  </a>
                  <a href="tel:+22901487135" className="hover:text-white transition-colors block">
                    01 48 71 35 36
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-secondary shrink-0" />
                <a href="mailto:fernandenentreprises@gmail.com" className="text-soft-gray hover:text-white transition-colors body-small">
                  fernandenentreprises@gmail.com
                </a>
              </li>
            </ul>

            <h4 className="font-heading font-semibold text-lg mb-4 text-white/80">Newsletter</h4>
            <p className="text-soft-gray body-small mb-4">
              Recevez nos inspirations et actualités.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-white/10 border-white/20 text-white placeholder:text-soft-gray focus:border-secondary"
              />
              <Button type="submit" size="icon" className="bg-secondary hover:bg-secondary/90 text-deep-black">
                <Mail size={18} />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-soft-gray caption text-center md:text-left">
            © {new Date().getFullYear()} fernanden®. Tous droits réservés. Label OAPI.
          </p>
          <p className="text-soft-gray caption flex items-center gap-2">
            <span>Since 2017</span>
            <span className="text-secondary">•</span>
            <span>Créé avec passion à Cotonou, Bénin 🇧🇯</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
