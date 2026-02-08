import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function GlowingTextarea({ label, className, placeholder, ...props }: GlowingTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      {label && (
        <motion.label
          initial={false}
          animate={{
            y: isFocused || value ? -28 : 0,
            scale: isFocused || value ? 0.85 : 1,
            color: isFocused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-4 top-4 pointer-events-none origin-left font-heading font-medium"
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
        <textarea
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused || value ? "" : (placeholder || label)}
          className={cn(
            "w-full px-4 py-4 bg-card border-2 rounded-xl font-sans text-foreground resize-none",
            "placeholder:text-muted-foreground transition-colors duration-300",
            "focus:outline-none focus:border-primary",
            isFocused ? "border-primary" : "border-border",
            className
          )}
        />
        
        {/* Animated border */}
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
    </div>
  );
}
