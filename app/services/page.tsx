import SubBanner from "@/app/components/subbanner";
import ServicesSection from "../components/service";

export default function ServicePage() {
  return (
    <main className="w-full min-h-screen">
      <SubBanner pageKey="services" />
      <ServicesSection/>
     
    </main>
  );
}
