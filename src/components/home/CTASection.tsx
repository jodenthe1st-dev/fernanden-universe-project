import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden bg-deep-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container-main">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-primary/50" />
                <div className="w-2 h-2 rotate-45 border border-primary" />
                <div className="w-12 h-[1px] bg-primary/50" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Prêt à transformer
              <br />
              <span className="text-primary">votre vision ?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Que ce soit pour un événement unique, une garde-robe distinctive ou une identité visuelle percutante — nous sommes là pour vous accompagner.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-base px-10 h-14 bg-primary hover:bg-primary/90 group"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <span>Commencer un projet</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-10 h-14 border-white/20 text-white hover:bg-white hover:text-deep-black"
              >
                <Link to="/portfolio">Voir nos réalisations</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
