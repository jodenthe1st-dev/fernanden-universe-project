import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Mail, Phone, MapPin, Star, Shield, Check } from "lucide-react";
import { useState } from "react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import logoDensen from "@/assets/logo-densen.png";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { ContactSubscriptionsService } = await import("@/integrations/supabase/services/contactSubscriptions");
      await ContactSubscriptionsService.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: `RDV Styliste DENSE - ${formData.date} à ${formData.time}`,
        message: formData.message,
        source: 'DENSE Appointment Form'
      });

      setIsSubmitted(true);
      const { showSuccessToast } = await import("@/lib/toast");
      showSuccessToast("Votre demande de rendez-vous a été envoyée avec succès !");
    } catch (error: unknown) {
      console.error('Error submitting DENSE contact form:', error);
      const { showErrorToast } = await import("@/lib/toast");
      showErrorToast(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  return (
    <Layout>
      <section className="py-20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-densen-gold/5 via-transparent to-primary/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--soft-gold)/0.08),transparent_50%)]" />

        <div className="container-main relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-densen-gold/20 to-primary/20 backdrop-blur-md rounded-full border border-densen-gold/30 mb-6">
              <Calendar size={16} className="text-densen-gold animate-pulse" />
              <span className="font-heading text-sm font-medium text-densen-gold">RDV Personnalisé</span>
              <Star size={16} className="text-primary animate-pulse delay-300" />
            </div>

            <h1 className="heading-section text-foreground mb-6">
              Prendre <span className="bg-gradient-to-r from-densen-gold to-primary bg-clip-text text-transparent">Rendez-vous</span>
            </h1>

            <p className="body-large text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Un RDV personnalisé avec notre styliste pour découvrir la pièce qui vous ressemble et transformer votre style
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/20 shadow-2xl shadow-densen-gold/10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border/30 focus:border-densen-gold/50 focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                          placeholder="Votre nom"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border/30 focus:border-densen-gold/50 focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-border/30 focus:border-densen-gold/50 focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                        placeholder="+33 6 XX XX XX XX"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Date souhaitée *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 rounded-xl border border-border/30 focus:border-densen-gold/50 focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Heure souhaitée *
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border/30 focus:border-densen-gold/50 focus:outline-none transition-colors bg-background/50 backdrop-blur-sm"
                        >
                          <option value="">Choisir une heure</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message (optionnel)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-border/30 focus:border-densen-gold/50 focus:outline-none transition-colors bg-background/50 backdrop-blur-sm resize-none"
                        placeholder="Décrivez vos besoins, votre style, ou toute question..."
                      />
                    </div>

                    <MagneticButton>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-gradient-to-r from-densen-gold to-primary hover:from-densen-gold/90 hover:to-primary/90 text-black shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                            />
                            Envoi en cours...
                          </div>
                        ) : (
                          "Confirmer le rendez-vous"
                        )}
                      </Button>
                    </MagneticButton>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={40} className="text-green-500" />
                    </div>

                    <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                      Rendez-vous confirmé !
                    </h3>

                    <p className="text-muted-foreground mb-8">
                      Nous vous enverrons une confirmation par email dans les prochaines minutes.
                    </p>

                    <MagneticButton>
                      <Button variant="outline" className="rounded-xl border-densen-gold text-densen-gold hover:bg-densen-gold hover:text-black transition-all duration-300">
                        <Link to="/dense" className="flex items-center gap-2">
                          Retour à DENSE
                          <ArrowLeft size={20} />
                        </Link>
                      </Button>
                    </MagneticButton>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Why book with us */}
              <div className="bg-gradient-to-br from-deep-black to-black/90 text-white rounded-3xl p-8 shadow-2xl">
                <h3 className="font-heading font-bold text-2xl text-densen-gold mb-6">
                  Pourquoi prendre RDV avec nous ?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-densen-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-densen-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg mb-1">30 minutes gratuit</h4>
                      <p className="text-white/70 text-sm">Consultation personnalisée sans engagement</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg mb-1">Expert certifié</h4>
                      <p className="text-white/70 text-sm">Styliste professionnel avec 10+ ans d'expérience</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg mb-1">100% personnalisé</h4>
                      <p className="text-white/70 text-sm">Analyse de style sur mesure selon votre personnalité</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-card rounded-3xl p-8 border border-border/20">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                  Informations de contact
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-densen-gold/20 rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-densen-gold" />
                    </div>
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-muted-foreground">+229 01 97 51 26 36</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">fernandenentreprises@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                      <MapPin size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">Notre Siège</p>
                      <p className="text-muted-foreground">
                        Cabinet fernanden<br />
                        Lot 265S Parcelle S Quartier Sèmè Aïtchedji<br />
                        Cotonou, Bénin
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/20">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Disponible 7j/7</span>
                    <span>Réponse sous 2h</span>
                  </div>
                </div>
              </div>

              {/* Back button */}
              <MagneticButton>
                <Button variant="outline" size="lg" className="w-full rounded-xl border-densen-gold text-densen-gold hover:bg-densen-gold hover:text-black transition-all duration-300">
                  <Link to="/dense#collections" className="flex items-center justify-center gap-2">
                    <ArrowLeft size={20} />
                    Retour aux collections
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
  const getErrorMessage = (error: unknown): string => {
    return error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi.";
  };
