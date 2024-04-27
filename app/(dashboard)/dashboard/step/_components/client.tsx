import { Bus, Hotel, Package, Step, Train } from "@prisma/client";
import { Step as StepColumn, columns } from "./columns";
import { DataTable } from "./data-table";

interface IStep extends Step {
  package: Package;
}

interface StepClientProps {
  steps: IStep[];
}

export function StepClient({ steps }: StepClientProps) {
  const formattedStepsArray: StepColumn[] = steps.reduce<StepColumn[]>(
    (acc, step) => {
      const { id, order, package: package1 } = step;
      acc.push({
        id,
        order,
        package: `${package1.name}-${package1.duration}-${package1.price}`,
      });
      return acc;
    },
    [],
  );

  return (
    <div>
      <DataTable columns={columns} data={formattedStepsArray} />
    </div>
  );
}
