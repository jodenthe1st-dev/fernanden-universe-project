import { Input, InputProps } from "@/components/ui/input";

export const GlowingInput = (props: InputProps) => {
  return (
    <Input 
      {...props} 
      className={`focus:ring-2 focus:ring-terracotta/50 transition-all ${props.className || ""}`}
    />
  );
};
