"use client";

import { Box, Typography } from "@mui/material";
import type { Transaction } from "@/types/wallet";
import { TransactionListItem } from "@/components/wallet/transactions/TransactionListItem";
import { listContainerSx, titleSx } from "./LatestTransactionsSection.styles";

export function LatestTransactionsSection({ transactions }: { transactions: Transaction[] }) {
  return (
    <>
      <Typography sx={titleSx}>Latest Transactions</Typography>
      <Box sx={listContainerSx}>
        {transactions.map((tx) => (
          <TransactionListItem key={tx.id} transaction={tx} />
        ))}
      </Box>
    </>
  );
}
