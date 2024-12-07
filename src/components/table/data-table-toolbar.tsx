import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter college by name..."
        value={(table.getColumn("college")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("college")?.setFilterValue(event.target.value)
        }
        className="max-w-sm border-2 border-gray-300 rounded-xl text-gray-600 font-medium"
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="border-2 border-gray-300 rounded-xl"
        >
          <Button variant="outline" className="ml-auto text-gray-600">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize cursor-pointer"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
