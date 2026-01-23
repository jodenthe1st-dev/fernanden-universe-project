import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-terracotta" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-african opacity-10" />

      {/* Content */}
      <div className="relative z-10 container-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-section text-white mb-6">
            Rejoignez-nous et transformez votre monde
          </h2>
          <p className="body-large text-white/80 max-w-2xl mx-auto mb-10">
            Que ce soit pour un événement unique, une garde-robe distinctive, un accompagnement éducatif ou une identité visuelle percutante — nous sommes là pour vous.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-base px-10 bg-white text-primary hover:bg-white/90"
          >
            <Link to="/contact" className="flex items-center gap-2">
              Commencer votre projet
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
