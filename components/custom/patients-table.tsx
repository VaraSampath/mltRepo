import React from "react";
import { FormSchemaType } from "./add-patient-details";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { patients } from "@/lib/constants";

const PatientsTable = () => {
  const columnHelper = createColumnHelper<FormSchemaType>();

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.refferedBy, {
      id: "refferedBy",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Reffered By</span>,
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

  const [data] = React.useState(patients);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
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
        <tbody>
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
