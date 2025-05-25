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
import { ViewDeviceModal } from "@/components/modals/view-device";
import type { Payment } from "@/types/types";

interface DataTableProps<TData extends Payment, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Payment, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { deletePayments, getPaymentById, loading, error } = usePayments();

  const [selectedRowData, setSelectedRowData] = React.useState<TData | null>(
    null
  );
  const [viewModalOpen, setViewModalOpen] = React.useState(false);

  const [tableData, setTableData] = React.useState(data);
  const [rowSelection, setRowSelection] = React.useState<{
    [key: string]: boolean;
  }>({});

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  async function handleRowDoubleClick(rowData: TData) {
    const latestData = await getPaymentById(rowData.id);

    if (latestData) {
      setSelectedRowData(latestData as TData);
      setViewModalOpen(true);
    } else {
      console.error("Erro ao buscar os dados da linha");
    }
  }

  function handleDeleteSelected() {
    const selectedRowIndexes = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map(Number);

    const selectedIds = selectedRowIndexes.map(
      (index) => table.getRowModel().rows[index]?.original.id
    );

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
      {selectedRowData && (
        <ViewDeviceModal
          open={viewModalOpen}
          onOpenChange={setViewModalOpen}
          data={selectedRowData}
        />
      )}

      <div className="flex items-center gap-3 mb-4">
        <Dialog>
          <DialogTrigger>
            <Button className="text-white">
              <Plus className="mr-2 h-4 w-4" />
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
            <Trash className="mr-2 h-4 w-4" />
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
                  onDoubleClick={() => handleRowDoubleClick(row.original)}
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
