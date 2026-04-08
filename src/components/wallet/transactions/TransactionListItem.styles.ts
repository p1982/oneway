import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import type { SxProps, Theme } from "@mui/material/styles";

export const RowLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "block",
});

export const RightText = styled(Typography)({
  fontWeight: 700,
  fontSize: 24,
});

export const PercentTag = styled(Box)({
  color: "#9ca3af",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  padding: "1px 4px",
  fontSize: 11,
  lineHeight: "11px",
});

export const rowSx: SxProps<Theme> = {
  alignItems: "center",
  py: 1,
  borderBottom: "1px solid #f1f5f9",
};

export const contentSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
};

export const titleSx: SxProps<Theme> = {
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.1,
};

export const detailsSx: SxProps<Theme> = {
  fontSize: 15,
  color: "#9ca3af",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const dateSx: SxProps<Theme> = {
  fontSize: 15,
  color: "#9ca3af",
};

export const rightSx: SxProps<Theme> = {
  alignItems: "center",
};

export const amountWrapSx: SxProps<Theme> = {
  textAlign: "right",
};

export const chevronStyle = {
  color: "#cbd5e1",
  fontSize: 14,
};
