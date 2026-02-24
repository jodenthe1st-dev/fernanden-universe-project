import { Textarea, TextareaProps } from "@/components/ui/textarea";

export const GlowingTextarea = (props: TextareaProps) => {
  return (
    <Textarea 
      {...props} 
      className={`focus:ring-2 focus:ring-terracotta/50 transition-all ${props.className || ""}`}
    />
  );
};
