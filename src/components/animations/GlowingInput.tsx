import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function GlowingInput({ label, className, ...props }: GlowingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      {label && (
        <motion.label
          initial={false}
          animate={{
            y: isFocused || value ? -24 : 0,
            scale: isFocused || value ? 0.85 : 1,
            color: isFocused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none origin-left font-heading font-medium"
        >
          {label}
        </motion.label>
      )}
      
      <motion.div
        className="relative"
        animate={{
          boxShadow: isFocused 
            ? "0 0 0 3px hsl(var(--primary) / 0.2), 0 4px 20px hsl(var(--primary) / 0.15)" 
            : "0 0 0 0px transparent, 0 2px 8px hsl(var(--foreground) / 0.05)",
        }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: "0.75rem" }}
      >
        <input
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full px-4 py-4 bg-card border-2 rounded-xl font-sans text-foreground",
            "placeholder:text-transparent transition-colors duration-300",
            "focus:outline-none focus:border-primary",
            isFocused ? "border-primary" : "border-border",
            className
          )}
        />
        
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
          initial={{ width: "0%", x: "50%" }}
          animate={{ 
            width: isFocused ? "100%" : "0%",
            x: isFocused ? "0%" : "50%"
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>

      {/* Floating particles on focus */}
      {isFocused && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary"
              initial={{ 
                opacity: 0,
                x: Math.random() * 100,
                y: 0 
              }}
              animate={{ 
                opacity: [0, 1, 0],
                y: -30 - Math.random() * 20,
                x: Math.random() * 100
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              style={{ left: `${20 + i * 30}%`, bottom: "100%" }}
            />
          ))}
        </>
      )}
    </div>
  );
}
