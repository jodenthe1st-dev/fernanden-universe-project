import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventType {
  id: string;
  title: string;
  description: string;
  price: string;
  capacity: string;
  features: string[];
  image: string;
}

interface EventFeaturesProps {
  features: string[];
}

export const EventFeatures = ({ features }: EventFeaturesProps) => {
  return (
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <FeatureItem key={`feature-${index}-${feature.replace(/\s+/g, '-')}`} feature={feature} />
      ))}
    </ul>
  );
};

const FeatureItem = ({ feature }: { feature: string }) => (
  <li className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
    <FeatureIcon />
    {feature}
  </li>
);

const FeatureIcon = () => (
  <div className="w-6 h-6 bg-she-saffron/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-she-saffron/20 transition-colors">
    <Check size={14} className="text-she-saffron" />
  </div>
);
