import { db } from "@/lib/db";
import { Hero } from "@/components/landing/hero";
import { LandingClient } from "./_components/client";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/landing/page-head";

export default async function Home() {
  const packages = await db.package.findMany({
    include: {
      cities: true,
    },
  });

  return (
    <>
      <Hero />
      <div className="container relative">
        <PageHeader>
          <PageHeaderHeading>
            Explore Tailored Travel Packages
          </PageHeaderHeading>
          <PageHeaderDescription>
            Browse our curated travel packages for your next adventure. From
            beach getaways to mountain retreats, we have your dream vacation
            covered. Start your journey with ease.
          </PageHeaderDescription>
        </PageHeader>
        <LandingClient packages={packages} />
      </div>
    </>
  );
}
