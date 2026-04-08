"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Box, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { formatCurrency, formatDetailsDate } from "@/lib/walletFormat";
import { useWalletStore } from "@/store/walletStore";
import {
  amountSx,
  backIconStyle,
  backLinkStyle,
  cardLabelSx,
  cardSx,
  dateSx,
  dividerSx,
  headerSx,
  loadingSx,
  nameSx,
  notFoundTextSx,
  PhoneShell,
  statusSx,
  totalRowSx,
} from "./TransactionDetails.styles";

export function TransactionDetails({ slug }: { slug: string }) {
  const { transactionsId, fetchWallet, isLoading, getTransactionById } = useWalletStore();

  useEffect(() => {
    if (!transactionsId.length) {
      void fetchWallet();
    }
  }, [transactionsId.length, fetchWallet]);

  const tx = getTransactionById(slug);

  if (isLoading && !tx) {
    return (
      <PhoneShell>
        <Stack sx={loadingSx}>
          <CircularProgress />
        </Stack>
      </PhoneShell>
    );
  }

  if (!tx) {
    return (
      <PhoneShell>
        <Link href="/" style={backLinkStyle}>
          <FontAwesomeIcon icon={faChevronLeft} style={backIconStyle} />
        </Link>
        <Typography sx={notFoundTextSx}>Transaction not found.</Typography>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <Link href="/" style={backLinkStyle}>
        <FontAwesomeIcon icon={faChevronLeft} style={backIconStyle} />
      </Link>

      <Stack sx={headerSx}>
        <Typography sx={amountSx}>{formatCurrency(tx.amount)}</Typography>
        <Typography sx={nameSx}>{tx.name}</Typography>
        <Typography sx={dateSx}>{formatDetailsDate(tx.date)}</Typography>
      </Stack>

      <Box sx={cardSx}>
        <Typography sx={statusSx}>Status: {tx.status}</Typography>
        <Typography sx={cardLabelSx}>{tx.cardLabel}</Typography>
        <Divider sx={dividerSx} />
        <Stack direction="row" sx={totalRowSx}>
          <Typography sx={statusSx}>Total</Typography>
          <Typography sx={statusSx}>{formatCurrency(tx.amount)}</Typography>
        </Stack>
      </Box>
    </PhoneShell>
  );
}
