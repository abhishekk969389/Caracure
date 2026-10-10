import SubBanner from "@/app/components/subbanner";
import TeamSection from "../components/teams";

export default function TeamsPage() {
  return (
    <main className="w-full min-h-screen">
      <SubBanner pageKey="teams" />
      <TeamSection isGrid={true} />
    </main>
  );
}
