import Image from "next/image";
import TopBar from "./components/topbar";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import AboutSection from "./components/about";
import ServicesSection from "./components/service";
import HelpSection from "./components/needhelp";
import TeamSection from "./components/teams";
import Testimonials from "./components/testimonial";
import LatestNews from "./components/blog";
import Footer from "./components/footer";

export default function Home() {
  return (
   <>
   <TopBar/>
   <Navbar/>
   <Banner/>
   <AboutSection/>
   <ServicesSection/>
   <HelpSection/>
   <TeamSection/>
   <Testimonials/>
   <LatestNews/>
   <Footer/>
   </>
  );
}
