export type Payment = {
  id: string;
  identificator: string;
  name: string;
  status: "pending" | "processing" | "success" | "failed";
  patrimonialWell: string;
  date: string;
};
