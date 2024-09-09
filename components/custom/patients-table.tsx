import React from "react";
import { PatientSchemaType } from "@/lib/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./styles.module.css";
import { useQuery } from "@tanstack/react-query";

const PatientsTable = () => {
  const columnHelper = createColumnHelper<PatientSchemaType>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.referredBy, {
      id: "referredBy",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>referred By</span>,
    }),
    columnHelper.accessor((row) => row.gender, {
      id: "gender",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Gender</span>,
    }),

    columnHelper.accessor((row) => row.age, {
      id: "age",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Age</span>,
    }),
    columnHelper.accessor((row) => row.village, {
      id: "village",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Village</span>,
    }),
    columnHelper.accessor((row) => row.phone, {
      id: "phone",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Phone</span>,
    }),
    columnHelper.accessor((row) => row.amount, {
      id: "amount",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Amount</span>,
    }),
  ];

  const fetchPatientsData = async (): Promise<PatientSchemaType[]> => {
    const res = await fetch("pages/api/patients");
    const data = await res.json();
    return data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["patientsTable"],
    queryFn: fetchPatientsData,
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
    return <span>Error: {error.message}</span>;
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
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default PatientsTable;
