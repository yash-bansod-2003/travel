import { DashboardHeader } from "@/components/header";
import { db } from "@/lib/db";
import { PackageDeleteButton } from "../_components/remove-button";
import { Icons } from "@/components/icons";
import { PackageForm } from "../_components/form";

interface PackagePageProps {
  params: {
    packageId: string;
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const package1 = await db.package.findFirst({
    where: {
      id: params.packageId,
    },
    include: {
      cities: true,
    },
  });

  const cities = await db.city.findMany();

  return (
    <>
      <DashboardHeader heading={`${package1 ? "Update" : "Create"} Package`}>
        {package1 && (
          <PackageDeleteButton variant="destructive" packageId={package1.id}>
            <Icons.trash />
          </PackageDeleteButton>
        )}
      </DashboardHeader>
      <PackageForm package1={package1} cities={cities} />
    </>
  );
}
