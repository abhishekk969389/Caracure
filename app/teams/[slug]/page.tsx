import { notFound } from "next/navigation";
import { getTeamMemberBySlug, getTeamSlugs } from "@/data/index";
import SubBanner from "@/app/components/subbanner";
import TeamDetailSection from "@/app/components/teams/teamdetail";

export async function generateStaticParams() {
  const slugs = getTeamSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return { title: "Not Found" };
  return { 
    title: `${member.name} | CarAcure`,
    description: member.bio
  };
}

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <>
      <SubBanner pageKey="teamDetail" />
      <TeamDetailSection member={member} />
    </>
  );
}
