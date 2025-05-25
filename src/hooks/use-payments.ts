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

  async function getPaymentById(id: string): Promise<Payment | null> {
    try {
      const res = await fetch(`http://localhost:3001/payments/${id}`);
      if (!res.ok) throw new Error("Erro ao buscar pagamento com ID: " + id);
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  function deletePayments(id: string) {
    return fetch(`http://localhost:3001/payments/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error("Erro ao deletar pagamento " + id);
    });
  }

  async function updatePayment(updatedPayment: Payment): Promise<void> {
    try {
      const res = await fetch(
        `http://localhost:3001/payments/${updatedPayment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayment),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Erro ao atualizar pagamento com ID: " + updatedPayment.id
        );
      }

      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === updatedPayment.id ? updatedPayment : payment
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  return {
    payments,
    loading,
    error,
    addPayment,
    deletePayments,
    getPaymentById,
    updatePayment,
  };
}
