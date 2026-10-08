import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import ArcSection from "@/components/ArcSection";
import WhySection from "@/components/WhySection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import RsvpSection from "@/components/RsvpSection";
import SaveSection from "@/components/SaveSection";
import VipSection from "@/components/VipSection";
import DetailsSection from "@/components/DetailsSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <Hero />
      <main>
        <ArcSection />
        <WhySection />
        <AboutSection />
        <FeaturesSection />
        <RsvpSection />
        <SaveSection />
        <VipSection />
        <DetailsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
