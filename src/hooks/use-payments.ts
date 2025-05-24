import type { Payment } from "@/types/types";
import { useState, useEffect } from "react";

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/payments")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar pagamentos");
        return res.json();
      })
      .then((data) => setPayments(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  function addPayment(newPayment: Payment) {
    setPayments((prev) => [...prev, newPayment]);

    fetch("http://localhost:3001/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPayment),
    }).catch((err) => {
      console.error("Erro ao adicionar pagamento:", err);
    });
  }

  function deletePayments(id: string) {
    return fetch(`http://localhost:3001/payments/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error("Erro ao deletar pagamento " + id);
    });
  }

  return { payments, loading, error, addPayment, deletePayments };
}
