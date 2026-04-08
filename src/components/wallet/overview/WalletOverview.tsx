"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { calculateDailyPoints, formatPoints } from "@/lib/walletFormat";
import { useWalletStore } from "@/store/walletStore";
import { LatestTransactionsSection } from "./LatestTransactionsSection";
import { WalletSummaryCards } from "./WalletSummaryCards";
import { errorTextSx, loadingStackSx, PhoneShell } from "./WalletOverview.styles";

export function WalletOverview() {
  const {
    cardLimit,
    cardBalance,
    noPaymentDueText,
    isLoading,
    error,
    fetchWallet,
    getOrderedTransactions,
  } = useWalletStore();

  useEffect(() => {
    void fetchWallet();
  }, [fetchWallet]);

  const available = Math.max(0, cardLimit - cardBalance);
  const points = useMemo(() => formatPoints(calculateDailyPoints()), []);
  const orderedTransactions = getOrderedTransactions().slice(0, 10);

  return (
    <PhoneShell>
      {isLoading && (
        <Stack sx={loadingStackSx}>
          <CircularProgress />
        </Stack>
      )}

      {!isLoading && error && (
        <Typography color="error" sx={errorTextSx}>
          Failed to load wallet data: {error}
        </Typography>
      )}

      {!isLoading && !error && (
        <>
          <WalletSummaryCards
            cardBalance={cardBalance}
            available={available}
            noPaymentDueText={noPaymentDueText}
            points={points}
          />
          <LatestTransactionsSection transactions={orderedTransactions} />
        </>
      )}
    </PhoneShell>
  );
}
