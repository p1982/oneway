"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Box, Stack, Typography } from "@mui/material";
import { formatTransactionAmount, formatTransactionDateLine } from "@/lib/walletFormat";
import type { Transaction } from "@/types/wallet";
import { TransactionIconBadge } from "./TransactionIcon";
import {
  amountWrapSx,
  chevronStyle,
  contentSx,
  dateSx,
  detailsSx,
  PercentTag,
  rightSx,
  RightText,
  rowSx,
  RowLink,
  titleSx,
} from "./TransactionListItem.styles";

export function TransactionListItem({ transaction }: { transaction: Transaction }) {
  const detailsLine = [
    transaction.pending ? "Pending - " : "",
    transaction.description || transaction.location,
  ]
    .join("")
    .trim();

  return (
    <RowLink href={`/transactions/${transaction.id}`}>
      <Stack direction="row" spacing={1} sx={rowSx}>
        <TransactionIconBadge icon={transaction.icon} seed={transaction.id} />
        <Box sx={contentSx}>
          <Typography sx={titleSx}>{transaction.name}</Typography>
          <Typography sx={detailsSx}>{detailsLine}</Typography>
          <Typography sx={dateSx}>{formatTransactionDateLine(transaction)}</Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={rightSx}>
          <Box sx={amountWrapSx}>
            <RightText>{formatTransactionAmount(transaction)}</RightText>
            <PercentTag>3%</PercentTag>
          </Box>
          <FontAwesomeIcon icon={faChevronRight} style={chevronStyle} />
        </Stack>
      </Stack>
    </RowLink>
  );
}
