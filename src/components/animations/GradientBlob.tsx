import { motion } from "framer-motion";

interface GradientBlobProps {
  className?: string;
  color1?: string;
  color2?: string;
  size?: string;
  blur?: string;
  animate?: boolean;
}

export function GradientBlob({ 
  className = "",
  color1 = "hsl(var(--primary) / 0.3)",
  color2 = "hsl(var(--secondary) / 0.2)",
  size = "400px",
  blur = "80px",
  animate = true
}: GradientBlobProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 70%)`,
        filter: `blur(${blur})`,
      }}
      animate={animate ? {
        scale: [1, 1.2, 1],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      } : undefined}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
