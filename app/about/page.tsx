import SubBanner from "@/app/components/subbanner";
import AboutSection from "../components/about";
import HelpSection from "../components/needhelp";
import TeamSection from "../components/teams";
import WhyChooseUs from "../components/about/whychoose";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen">
      <SubBanner pageKey="about" />
      <AboutSection/>
      <WhyChooseUs/>
      <HelpSection/>
      <TeamSection/>
    </main>
  );
}
