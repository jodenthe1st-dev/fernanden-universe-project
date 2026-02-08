import { motion } from "framer-motion";

interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  type?: "slide" | "scale" | "wave";
}

export function AnimatedLetters({ 
  text, 
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  type = "wave"
}: AnimatedLettersProps) {
  const letters = text.split("");

  const getVariants = () => {
    const createTransition = (stiffness: number, damping?: number) => ({
      delay: delay + staggerDelay,
      type: "spring" as const,
      stiffness,
      ...(damping && { damping }),
    });

    switch (type) {
      case "slide":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: createTransition(100),
          }),
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0 },
          visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: createTransition(200),
          }),
        };
      case "wave":
      default:
        return {
          hidden: { opacity: 0, y: 20, rotateX: 90 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: createTransition(100, 10),
          }),
        };
    }
  };

  const variants = getVariants();

  return (
    <span className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ 
            display: letter === " " ? "inline" : "inline-block",
            whiteSpace: letter === " " ? "pre" : "normal"
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
