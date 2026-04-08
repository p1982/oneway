"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency } from "@/lib/walletFormat";
import { Card, SoftTitle } from "./WalletOverview.styles";
import {
  availableValueSx,
  balanceValueSx,
  cardFullHeightSx,
  checkCircleSx,
  checkIconStyle,
  checkWrapSx,
  gridSx,
  noPaymentTextSx,
  pointsValueSx,
} from "./WalletSummaryCards.styles";

type WalletSummaryCardsProps = {
  cardBalance: number;
  available: number;
  noPaymentDueText: string;
  points: string;
};

export function WalletSummaryCards({
  cardBalance,
  available,
  noPaymentDueText,
  points,
}: WalletSummaryCardsProps) {
  return (
    <Box sx={gridSx}>
      <Box>
        <Card>
          <SoftTitle>Card Balance</SoftTitle>
          <Typography sx={balanceValueSx}>{formatCurrency(cardBalance)}</Typography>
          <Typography sx={availableValueSx}>{formatCurrency(available)} Available</Typography>
        </Card>
      </Box>
      <Box>
        <Card sx={cardFullHeightSx}>
          <SoftTitle>No Payment Due</SoftTitle>
          <Typography sx={noPaymentTextSx}>{noPaymentDueText}</Typography>
          <Stack sx={checkWrapSx}>
            <Box sx={checkCircleSx}>
              <FontAwesomeIcon icon={faCheck} style={checkIconStyle} />
            </Box>
          </Stack>
        </Card>
      </Box>
      <Box>
        <Card>
          <SoftTitle>Daily Points</SoftTitle>
          <Typography sx={pointsValueSx}>{points}</Typography>
        </Card>
      </Box>
    </Box>
  );
}
