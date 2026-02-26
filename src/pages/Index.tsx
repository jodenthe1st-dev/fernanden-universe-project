import { Layout } from "@/components/layout/Layout";
import { PageMeta } from "@/components/layout/PageMeta";
import { HeroSection } from "@/components/home/HeroSection";
import { UniverseCards } from "@/components/home/UniverseCards";
import { BrandDNA } from "@/components/home/BrandDNA";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <PageMeta
        title="Accueil"
        description="Fernanden — Design 3-en-1 : SHE (espaces & événements), DENSE (mode éthique), CaFEE (éducation & design). Basé à Cotonou, Bénin."
      />
      <HeroSection />
      <UniverseCards />
      <BrandDNA />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
