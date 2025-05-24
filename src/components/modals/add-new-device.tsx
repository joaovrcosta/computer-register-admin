import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePayments } from "@/hooks/use-payments";
import type { Payment } from "@/types/types";

export function AddNewDeviceModal() {
  const { addPayment } = usePayments();

  const [form, setForm] = useState<Omit<Payment, "id">>({
    identificator: "",
    name: "",
    status: "pending",
    patrimonialWell: "",
    date: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleGenerateUUID() {
    setForm((prev) => ({
      ...prev,
      identificator: crypto.randomUUID(),
    }));
  }

  function handleSubmit() {
    const newPayment: Payment = {
      ...form,
      id: crypto.randomUUID(),
    };

    addPayment(newPayment);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Novo Dispositivo</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            name="identificator"
            placeholder="Identificador"
            value={form.identificator}
            onChange={handleChange}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleGenerateUUID}
          >
            Gerar UUID
          </Button>
        </div>
        <Input name="name" placeholder="Nome" onChange={handleChange} />
        <Input
          name="patrimonialWell"
          placeholder="Bem Patrimonial"
          onChange={handleChange}
        />
        <Input
          name="date"
          placeholder="Data (DD-MM-YYYY)"
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Adicionar</Button>
      </div>
    </DialogContent>
  );
}
