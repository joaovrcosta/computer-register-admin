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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function AddNewDeviceModal() {
  const { addPayment } = usePayments();

  const [form, setForm] = useState<Omit<Payment, "id">>({
    identificator: "",
    name: "",
    status: "pending",
    patrimonialWell: "",
    date: "",
  });

  const [dateObj, setDateObj] = useState<Date>();

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
        <Input name="name" placeholder="Nome" onChange={handleChange} />
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
            className="text-white"
            onClick={handleGenerateUUID}
          >
            Gerar UUID
          </Button>
        </div>
        <Input
          name="patrimonialWell"
          placeholder="Bem Patrimonial"
          onChange={handleChange}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateObj ? format(dateObj, "dd-MM-yyyy") : "Selecionar data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateObj}
              onSelect={(date) => {
                if (date) {
                  setDateObj(date);
                  setForm((prev) => ({
                    ...prev,
                    date: format(date, "dd-MM-yyyy"),
                  }));
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleSubmit} className="text-white">
          Adicionar
        </Button>
      </div>
    </DialogContent>
  );
}
