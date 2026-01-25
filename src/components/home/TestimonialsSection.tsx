import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Fernanden a transformé notre événement en une expérience inoubliable. Leur attention aux détails et leur créativité sont exceptionnelles.",
    author: "Marie Kouassi",
    role: "Directrice Marketing",
    company: "Groupe Ecobank",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "Les créations DENSEN reflètent parfaitement l'élégance africaine. Chaque pièce raconte une histoire unique.",
    author: "Jean-Pierre Mensah",
    role: "CEO",
    company: "AfricaConnect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "L'accompagnement CaFEE a été déterminant pour le développement de notre identité visuelle. Professionnalisme et créativité au rendez-vous.",
    author: "Aminata Diallo",
    role: "Fondatrice",
    company: "StartupLab Dakar",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] bg-gradient-to-r from-primary/5 to-transparent" />
      
      <div className="container-main relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-primary" />
              <span className="font-heading text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Témoignages
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Ce que disent
              <span className="text-primary block">nos clients</span>
            </h2>

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center group"
              >
                <ChevronLeft size={20} className="text-muted-foreground group-hover:text-primary" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center group"
              >
                <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary" />
              </button>
            </div>
          </motion.div>

          {/* Right - Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-border/50 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-terracotta">
                <Quote size={18} className="text-white" />
              </div>

              {/* Content */}
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-serif italic">
                  "{testimonials[current].quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].author}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <p className="font-heading font-semibold text-foreground">
                      {testimonials[current].author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[current].role}, {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Dots */}
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === current 
                        ? "w-8 bg-primary" 
                        : "w-1.5 bg-border hover:bg-primary/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
