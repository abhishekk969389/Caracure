import Image from "next/image";
import Banner from "./components/banner";
import AboutSection from "./components/about";
import ServicesSection from "./components/service";
import HelpSection from "./components/needhelp";
import TeamSection from "./components/teams";
import Testimonials from "./components/testimonial";
import LatestNews from "./components/blog";

export default function Home() {
  return (
   <>
   <Banner/>
   <AboutSection/>
   <ServicesSection/>
   <HelpSection/>
   <TeamSection/>
   <Testimonials/>
   <LatestNews/>
   </>
  );
}
