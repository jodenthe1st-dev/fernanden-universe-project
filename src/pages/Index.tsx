import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { UniverseCards } from "@/components/home/UniverseCards";
import { BrandDNA } from "@/components/home/BrandDNA";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <UniverseCards />
      <BrandDNA />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
