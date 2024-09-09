"use client";
import { NormalValuesSchemaType } from "@/lib/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./styles.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NormalValuesTable = () => {
  const columnHelper = createColumnHelper<NormalValuesSchemaType>();
  const { toast } = useToast();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
    }),

    columnHelper.accessor((row) => row.testGroup, {
      id: "testGroup",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Test Group</span>,
    }),

    columnHelper.accessor((row) => row.units, {
      id: "units",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Units</span>,
    }),

    columnHelper.accessor((row) => row.maleMin, {
      id: "maleMin",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Male Min</span>,
    }),

    columnHelper.accessor((row) => row.maleMax, {
      id: "maleMax",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Male Max</span>,
    }),

    columnHelper.accessor((row) => row.femaleMin, {
      id: "femaleMin",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Female Min</span>,
    }),

    columnHelper.accessor((row) => row.femaleMax, {
      id: "femaleMax",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Female Max</span>,
    }),
  ];

  const fetchNormalValuesData = async (): Promise<NormalValuesSchemaType[]> => {
    const res = await fetch("pages/api/normal-values");
    const data = await res.json();
    return data;
  };

  const deleteNormalValuesData = async (row: NormalValuesSchemaType) => {
    const res = await fetch("pages/api/normal-values/", {
      method: "DELETE",
      body: JSON.stringify({ id: row._id }),
    });

    const data = await res.json();
    return data;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNormalValuesData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["NormalValuesTable"] });
      toast({
        title: "Deleted",
        description: "Value deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Error deleting normal values",
        variant: "destructive",
      });
    },
  });

  const { isPending, isError, data } = useQuery({
    queryKey: ["NormalValuesTable"],
    queryFn: fetchNormalValuesData,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    toast({
      title: "Error",
      description: "Error fetching normal values",
      variant: "destructive",
    });
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <Trash2
                  size={16}
                  onClick={() => {
                    mutation.mutate(row.original);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NormalValuesTable;
