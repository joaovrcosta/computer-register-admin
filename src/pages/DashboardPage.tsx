import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/tables/device-table/data-table";
import { columns } from "@/components/tables/device-table/columns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePayments } from "@/hooks/use-payments";

import { motion } from "framer-motion"; // <-- Import framer-motion

export default function Page() {
  const { payments, loading, error } = usePayments();

  if (loading) return <p>Carregando pagamentos...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div className="bg-[#e5e5e6]">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" className="text-blueDark">
                      Computadores
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block text-primary" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-blueDark">
                      Novo Dispositivo
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Animate this div with framer-motion */}
          <motion.div
            className="flex flex-1 flex-col gap-4 p-4 pt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              <div className="flex gap-3"></div>

              {/* You can animate the table separately if prefer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <DataTable columns={columns} data={payments} />
              </motion.div>
            </div>

            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </motion.div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
