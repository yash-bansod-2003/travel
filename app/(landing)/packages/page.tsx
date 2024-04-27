import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/landing/page-head";
import { PackagesClient } from "./_components/client";

export default function PackagesPage() {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Search Tailored Travel Packages</PageHeaderHeading>
        <PageHeaderDescription>
          Browse our curated travel packages for your next adventure. From beach
          getaways to mountain retreats, we have your dream vacation covered.
          Start your journey with ease.
        </PageHeaderDescription>
      </PageHeader>
      <PackagesClient />
    </div>
  );
}
