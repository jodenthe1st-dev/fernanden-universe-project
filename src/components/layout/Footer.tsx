import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-deep-black text-white">
      <div className="container-main py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & About */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M15 8C10 16 5 20 5 25C5 30.5228 9.47715 35 15 35C20.5228 35 25 30.5228 25 25C25 20 20 16 15 8Z"
                  fill="currentColor"
                  opacity="0.8"
                />
                <path
                  d="M25 5C21 11.5 17 15 17 19C17 23.4183 20.5817 27 25 27C29.4183 27 33 23.4183 33 19C33 15 29 11.5 25 5Z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-serif text-2xl font-bold">fernanden</span>
            </Link>
            <p className="text-soft-gray body-small mb-6">
              Un design aux multiples facettes. Mode, espaces, éducation et création graphique — nous transformons vos visions en réalité.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Universes */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Nos Univers</h4>
            <ul className="space-y-3">
              {universeLinks.map((link) => (
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
          </div>

          {/* Column 3: Resources & Legal */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Ressources</h4>
            <ul className="space-y-3 mb-8">
              {resourceLinks.map((link) => (
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
            <h4 className="font-heading font-semibold text-lg mb-4">Légal</h4>
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
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <span className="text-soft-gray body-small">
                  Cabinet fernanden<br />
                  Cotonou, Bénin
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="tel:+22900000000" className="text-soft-gray hover:text-white transition-colors body-small">
                  +229 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <a href="mailto:contact@fernanden.com" className="text-soft-gray hover:text-white transition-colors body-small">
                  contact@fernanden.com
                </a>
              </li>
            </ul>

            <h4 className="font-heading font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-soft-gray body-small mb-4">
              Recevez nos inspirations et actualités.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-white/10 border-white/20 text-white placeholder:text-soft-gray"
              />
              <Button type="submit" size="icon">
                <Mail size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-soft-gray caption text-center md:text-left">
            © {new Date().getFullYear()} fernanden. Tous droits réservés. Label OAPI.
          </p>
          <p className="text-soft-gray caption">
            Créé avec passion à Cotonou, Bénin 🇧🇯
          </p>
        </div>
      </div>
    </footer>
  );
}
