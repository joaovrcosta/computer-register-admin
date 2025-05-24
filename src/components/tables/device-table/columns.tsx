import { type ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Bem Patrimonial",
  },
  {
    accessorKey: "amount",
    header: "Identificador",
  },
  {
    accessorKey: "date",
    header: "Data Compra",
  },
];
