type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    name: "novo",
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    name: "novo",
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    name: "novo",
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    name: "novo",
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];
