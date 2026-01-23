import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "fernanden a transformé notre mariage en une expérience inoubliable. Chaque détail reflétait notre histoire et notre culture avec une élégance extraordinaire.",
    author: "Aïcha & Kofi",
    role: "Mariage à Cotonou",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "L'accompagnement psychopédagogique de CaFEE a changé notre approche parentale. Notre fils s'épanouit comme jamais auparavant.",
    author: "Marie-Claire Dossou",
    role: "Mère de famille, Cotonou",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "DENSEN incarne parfaitement ce que signifie porter son identité avec fierté. Ces vêtements racontent notre histoire africaine.",
    author: "Emmanuel Agbossou",
    role: "Entrepreneur, Lagos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 4,
    quote: "L'identité visuelle créée par CaFEE Expressive a propulsé notre marque. Un travail d'exception qui capture notre essence.",
    author: "Startup AfriTech",
    role: "Client Corporate",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">
            Ce que disent nos <span className="text-primary">clients</span>
          </h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment nous avons transformé leurs visions en réalités mémorables.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-cream rounded-2xl p-8 md:p-12 border-l-4 border-primary overflow-hidden min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-primary/20 mb-6" />

                {/* Quote Text */}
                <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading font-semibold text-foreground">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="body-small text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-card shadow-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-card shadow-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
