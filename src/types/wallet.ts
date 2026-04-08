export type TransactionType = "payment" | "credit";

export type TransactionIcon = "apple" | "payment" | "ikea" | "target" | "movie" | "cart" | "sim";

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  description: string;
  location: string;
  date: string;
  pending: boolean;
  authorizedUser?: string;
  icon: TransactionIcon;
  status: "Approved";
  cardLabel: string;
};

export type WalletPayload = {
  card: {
    limit: number;
    startingBalance: number;
    noPaymentDueText: string;
  };
  transactions: Transaction[];
};
