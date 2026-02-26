import { Layout } from "@/components/layout/Layout";
import { PageMeta } from "@/components/layout/PageMeta";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logger from '@/lib/logger';
import { GlowingInput } from "@/components/animations/GlowingInput";
import { GlowingTextarea } from "@/components/animations/GlowingTextarea";
import { ContactSubscriptionsService } from "@/integrations/supabase/services";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });

  // Coordonnées exactes de Cotonou, Bénin
  const mapCoordinates = {
    lat: 6.3974,
    lng: 2.4483,
    address: "Cotonou, Littoral, Bénin"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await ContactSubscriptionsService.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message,
        source: 'Website Contact Form'
      });

      showSuccessToast("Message envoyé avec succès !");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: ''
      });
    } catch (error) {
      showErrorToast("Une erreur est survenue");
      logger.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: mapCoordinates.address,
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: (
        <div className="space-y-1">
          <a href="tel:+2290197512636" className="hover:text-primary transition-colors block font-medium">
            +229 01 97 51 26 36
          </a>
          <a href="tel:+2290148713536" className="hover:text-primary transition-colors block font-medium">
            +229 01 48 71 35 36
          </a>
        </div>
      ),
      color: "text-primary"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@fernanden.com",
      href: "mailto:contact@fernanden.com",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun - Ven: 9h - 18h | Sam: 10h - 14h",
      color: "text-primary"
    }
  ];

  return (
    <Layout>
      <PageMeta
        title="Contact"
        description="Contactez Fernanden à Cotonou, Bénin. Remplissez notre formulaire ou appelez-nous au +229 01 97 51 26 36. Nous répondons sous 24h."
      />
      {/* Hero Section - Professional Design */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-hero text-foreground mb-6">
              Contact
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="body-large text-muted-foreground max-w-2xl mx-auto"
            >
              Parlons de votre projet et transformons vos idées en réalité
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info - Professional Layout */}
      <section className="py-20 relative">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info - Clean Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="heading-subsection text-foreground mb-8">Informations</h3>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <info.icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold text-foreground mb-2">{info.title}</h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <div className="text-muted-foreground">{info.content}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form - Clean Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-card p-8 rounded-2xl border border-border/50">
                <h3 className="heading-subsection text-foreground mb-2">
                  Envoyez-nous un message
                </h3>
                <p className="body-small text-muted-foreground mb-8">
                  Décrivez votre projet et nous vous recontacterons rapidement
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <GlowingInput
                      label="Nom complet"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                    />
                    <GlowingInput
                      label="Email professionnel"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@entreprise.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <GlowingInput
                      label="Téléphone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+229 XX XX XX XX"
                    />
                    <GlowingInput
                      label="Sujet du message"
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Projet de design"
                    />
                  </div>

                  <GlowingTextarea
                    label="Décrivez votre projet"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Parlez-nous de votre vision, de vos objectifs, et de ce que vous aimeriez accomplir ensemble..."
                  />

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">*</span> Champs obligatoires
                    </p>

                    <Button
                      type="submit"
                      size="lg"
                      className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      <span className="flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Envoyer
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Map - Real Location */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background/20 z-10 pointer-events-none" />

        {/* Embedded Google Map with real coordinates */}
        <iframe
          src={`https://maps.google.com/maps?q=${mapCoordinates.lat},${mapCoordinates.lng}&z=15&output=embed`}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="FERNANDEN Location - Cotonou, Bénin"
        />

        {/* Location Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <MapPin className="text-primary" size={24} />
            <div>
              <p className="font-heading font-semibold text-foreground">FERNANDEN</p>
              <p className="text-sm text-muted-foreground">{mapCoordinates.address}</p>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Contact;
