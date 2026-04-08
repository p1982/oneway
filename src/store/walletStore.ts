"use client";

import { create } from "zustand";
import { transactionsApiService } from "@/shared/api";
import type { Transaction, WalletPayload } from "@/types/wallet";

type WalletState = {
  cardLimit: number;
  cardBalance: number;
  noPaymentDueText: string;
  transactions: Record<string, Transaction>;
  transactionsId: string[];
  isLoading: boolean;
  error: string | null;
  getOrderedTransactions: () => Transaction[];
  getTransactionById: (id: string) => Transaction | null;
  fetchWallet: () => Promise<void>;
};

const toRandomCardBalance = (base: number, limit: number): number => {
  const min = Math.max(1, Math.floor(base * 100));
  const max = Math.floor(limit * 90);
  const randomCents = Math.floor(Math.random() * (max - min + 1)) + min;
  return Number((randomCents / 100).toFixed(2));
};

const toWalletState = (
  payload: WalletPayload,
): Omit<
  WalletState,
  "isLoading" | "error" | "fetchWallet" | "getOrderedTransactions" | "getTransactionById"
> => {
  const transactions = payload.transactions.reduce<Record<string, Transaction>>(
    (acc, transaction) => {
      acc[transaction.id] = transaction;
      return acc;
    },
    {},
  );

  return {
    cardLimit: payload.card.limit,
    cardBalance: toRandomCardBalance(payload.card.startingBalance, payload.card.limit),
    noPaymentDueText: payload.card.noPaymentDueText,
    transactions,
    transactionsId: payload.transactions.map((transaction) => transaction.id),
  };
};

export const useWalletStore = create<WalletState>((set, get) => ({
  cardLimit: 0,
  cardBalance: 0,
  noPaymentDueText: "",
  transactions: {},
  transactionsId: [],
  isLoading: false,
  error: null,
  getOrderedTransactions: () => {
    const { transactions, transactionsId } = get();
    return transactionsId
      .map((id) => transactions[id])
      .filter((tx): tx is Transaction => Boolean(tx));
  },
  getTransactionById: (id: string) => get().transactions[id] ?? null,
  fetchWallet: async () => {
    if (get().isLoading || get().transactionsId.length > 0) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const payload = await transactionsApiService.getWalletData();
      set({
        ...toWalletState(payload),
        isLoading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch wallet data";
      set({ error: message, isLoading: false });
    }
  },
}));
