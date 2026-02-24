interface GradientBlobProps {
  color1?: string;
  color2?: string;
  className?: string;
}

export const GradientBlob = ({ 
  color1 = "rgba(255, 100, 100, 0.1)", 
  color2 = "rgba(100, 100, 255, 0.1)",
  className = ""
}: GradientBlobProps) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${color1}, transparent 50%), radial-gradient(circle at 80% 20%, ${color2}, transparent 40%)`,
      }}
    />
  );
};
