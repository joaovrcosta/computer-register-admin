import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { usePayments } from "@/hooks/use-payments";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddNewDeviceModal } from "@/components/modals/add-new-device";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { deletePayments, loading, error } = usePayments();

  const [tableData, setTableData] = React.useState(data);
  const [rowSelection, setRowSelection] = React.useState<{
    [key: string]: boolean;
  }>({});

  console.log(rowSelection);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  function handleDeleteSelected() {
    const selectedRowIndexes = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map(Number);

    const selectedIds = selectedRowIndexes.map(
      (index) => table.getRowModel().rows[index]?.original.id
    );

    // Deleta do servidor e do estado local
    Promise.all(selectedIds.map((id) => deletePayments(id)))
      .then(() => {
        setTableData((prev) =>
          prev.filter((item) => !selectedIds.includes(item.id))
        );
        setRowSelection({});
      })
      .catch((err) => {
        console.error("Erro ao excluir pagamentos:", err);
      });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Dialog>
          <DialogTrigger>
            <Button className="text-white">
              <Plus />
              Adicionar
            </Button>
          </DialogTrigger>
          <AddNewDeviceModal />
        </Dialog>
        {Object.values(rowSelection).some(Boolean) && (
          <Button
            onClick={handleDeleteSelected}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            disabled={loading}
            title={loading ? "Excluindo..." : "Excluir selecionados"}
          >
            <Trash />
            Excluir selecionados
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-2 text-red-600">
          Erro ao carregar/excluir pagamentos: {error.message}
        </div>
      )}

      <div className="border border-gray-200 text-blueDark bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
