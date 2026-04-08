import type { SxProps, Theme } from "@mui/material/styles";

export const gridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 1.2,
};

export const balanceValueSx: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: 34,
  lineHeight: 1.1,
};

export const availableValueSx: SxProps<Theme> = {
  color: "#9ca3af",
  fontSize: 14,
};

export const noPaymentTextSx: SxProps<Theme> = {
  color: "#9ca3af",
  fontSize: 16,
  maxWidth: 180,
  lineHeight: 1.2,
};

export const cardFullHeightSx: SxProps<Theme> = {
  height: "100%",
};

export const checkWrapSx: SxProps<Theme> = {
  alignItems: "flex-end",
  mt: 1.5,
};

export const checkCircleSx: SxProps<Theme> = {
  width: 46,
  height: 46,
  borderRadius: "50%",
  bgcolor: "#f3f4f6",
  display: "grid",
  placeItems: "center",
};

export const checkIconStyle = { fontSize: 24 };

export const pointsValueSx: SxProps<Theme> = {
  color: "#6b7280",
  fontSize: 28,
  lineHeight: 1.1,
};
