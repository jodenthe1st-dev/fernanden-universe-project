import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Phone, Mail, MapPin, Clock } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  icon: string;
  active: boolean;
  order: number;
  // Add missing properties to match admin interface
  items?: string[];
  image?: string;
  route?: string;
  isActive?: boolean;
}

interface SHEHeroProps {
  config: {
    hero?: {
      badge?: string;
      title?: string;
      subtitle?: string;
      description?: string;
      backgroundImage?: string;
      ctaText?: string;
      ctaLink?: string;
      phone?: string;
    };
  };
}

export const SHEHero = ({ config }: SHEHeroProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${config.hero.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-she-saffron/20 via-she-terracotta/10 to-she-coral/5" />
      </div>
      
      <div className="relative z-10 container-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-she-saffron/90 text-black border-she-saffron/30 px-6 py-2 text-sm font-semibold backdrop-blur-sm">
            {config.hero.badge}
          </Badge>
          
          <h1 className="heading-hero text-foreground mb-6">
            {config.hero.title}
          </h1>
          
          <p className="heading-subsection text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {config.hero.subtitle}
          </p>
          
          <p className="body-large text-muted-foreground mb-12 max-w-2xl mx-auto">
            {config.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button
              size="lg"
              className="rounded-full bg-she-saffron hover:bg-she-saffron/90 text-black font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir nos services
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-she-saffron text-she-saffron hover:bg-she-saffron hover:text-black font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              <Phone className="mr-2" size={20} />
              {config.hero.phone}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

interface SHEServicesProps {
  services: Service[];
  onRealizationClick: (route: string) => void;
}

export const SHEServices = ({ services, onRealizationClick }: SHEServicesProps) => {
  return (
    <section id="services" className="py-24 bg-muted/20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">
            Nos Services <span className="text-she-saffron">Premium</span>
          </h2>
          <p className="heading-subsection text-muted-foreground max-w-3xl mx-auto">
            Des solutions sur mesure pour transformer vos espaces en lieux de vie exceptionnels
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full hover:shadow-2xl transition-all duration-500 border-border/50 overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-she-saffron/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-she-saffron/20 transition-colors">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  
                  <h3 className="heading-subsection text-foreground mb-4 group-hover:text-she-saffron transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-she-saffron flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border/20">
                    <span className="text-xl font-bold text-she-saffron">{service.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-she-saffron text-she-saffron hover:bg-she-saffron hover:text-black transition-all duration-300"
                      onClick={() => onRealizationClick(`/she/${service.id}`)}
                    >
                      En savoir plus
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
