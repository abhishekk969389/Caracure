import SubBanner from "@/app/components/subbanner";
import FaqSection from "../components/faq/faqsec";

export default function FaqPage() {
  return (
    <main className="w-full min-h-screen">
      <SubBanner pageKey="faq" />
      <FaqSection/>
    </main>
  );
}
