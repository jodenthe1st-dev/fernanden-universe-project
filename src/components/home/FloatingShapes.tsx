import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingShapeProps {
  className?: string;
  variant?: "light" | "dark";
}

export function FloatingShapes({ className = "", variant = "light" }: FloatingShapeProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  const baseColor = variant === "light" ? "primary" : "white";

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating Circle 1 */}
      <motion.div
        style={{ y: y1, rotate: rotate1, scale }}
        className={`absolute top-[20%] right-[15%] w-24 h-24 rounded-full border border-${baseColor}/10 backdrop-blur-sm`}
      />

      {/* Floating Diamond */}
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className={`absolute bottom-[30%] left-[10%] w-16 h-16 rotate-45 border border-${baseColor}/15`}
      />

      {/* Floating Ring */}
      <motion.div
        style={{ y: y3 }}
        className={`absolute top-[40%] left-[20%] w-32 h-32 rounded-full border-2 border-${baseColor}/5`}
      />

      {/* Gradient Orb 1 */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
      />

      {/* Gradient Orb 2 */}
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-gradient-to-tl from-secondary/5 to-transparent blur-3xl"
      />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>
    </div>
  );
}
