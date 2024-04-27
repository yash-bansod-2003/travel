import { State } from "@prisma/client";
import { State as StateColumn, columns } from "./columns";
import { DataTable } from "./data-table";

interface StateClientProps {
  states: State[];
}

export function StateClient({ states }: StateClientProps) {
  const formattedStateArray: StateColumn[] = states.reduce<StateColumn[]>(
    (acc, state) => {
      const { id, name } = state;
      acc.push({
        id,
        name,
      });
      return acc;
    },
    [],
  );

  return (
    <div>
      <DataTable columns={columns} data={formattedStateArray} />
    </div>
  );
}
