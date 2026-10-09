import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import ArcSection from "@/components/ArcSection";
import WhySection from "@/components/WhySection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import RsvpSection from "@/components/RsvpSection";
import SaveSection from "@/components/SaveSection";
import VipSection from "@/components/VipSection";
import TablePackagesSection from "@/components/TablePackagesSection";
import DetailsSection from "@/components/DetailsSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import SponsorsSection from "@/components/SponsorsSection";
import { getSiteContent } from "@/lib/content-store";

// Content is edited from /admin/content, so render on every request.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteContent();
  return { title: c.meta.title, description: c.meta.description };
}

export default async function HomePage() {
  const c = await getSiteContent();
  return (
    <>
      <SiteNav c={c.nav} />
      <Hero c={c.hero} />
      <main>
        <ArcSection c={c.arc} />
        <WhySection c={c.why} />
        <AboutSection c={c.about} />
        <FeaturesSection c={c.features} />
        <RsvpSection c={c.rsvp} />
        <SaveSection c={c.save} />
        <TablePackagesSection c={c.packages} />
        <VipSection c={c.vip} packages={c.packages} />
        <DetailsSection c={c.details} />
        <ContactSection c={c.contact} />
        <SponsorsSection c={c.sponsors} />
      </main>
      <SiteFooter c={c.footer} />
    </>
  );
}
