import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Payment } from "@/types/types";
import { useState, useEffect } from "react";
import { usePayments } from "@/hooks/use-payments";

interface ViewDeviceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Payment;
}

export function ViewDeviceModal({
  open,
  onOpenChange,
  data,
}: ViewDeviceModalProps) {
  const [formData, setFormData] = useState<Payment>(data);
  const { updatePayment } = usePayments();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    await updatePayment(formData);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Pagamento</DialogTitle>
          <DialogDescription className="space-y-2">
            <div>
              <label>Nome</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Identificador</label>
              <Input
                name="identificator"
                value={formData.identificator}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Bem Patrimonial</label>
              <Input
                name="patrimonialWell"
                value={formData.patrimonialWell}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Data</label>
              <Input
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <Button onClick={handleSave}>Salvar</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
