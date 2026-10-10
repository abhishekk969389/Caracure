import SubBanner from "@/app/components/subbanner";
import ContactSection from "../components/contact/contactsec";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen">
      <SubBanner pageKey="contact" />
      <ContactSection/>
    </main>
  );
}
