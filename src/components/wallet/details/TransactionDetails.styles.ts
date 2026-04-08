import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

export const PhoneShell = styled(Box)({
  width: "100%",
  maxWidth: 430,
  margin: "0 auto",
  minHeight: "100vh",
  background: "#f8fafc",
  padding: 16,
  boxSizing: "border-box",
});

export const loadingSx: SxProps<Theme> = {
  minHeight: "90vh",
  alignItems: "center",
  justifyContent: "center",
};

export const backLinkStyle = {
  textDecoration: "none",
};

export const backIconStyle = {
  color: "#60a5fa",
  fontSize: 20,
};

export const notFoundTextSx: SxProps<Theme> = {
  mt: 3,
};

export const headerSx: SxProps<Theme> = {
  mt: 4,
  alignItems: "center",
};

export const amountSx: SxProps<Theme> = {
  fontSize: 64,
  fontWeight: 800,
  lineHeight: 1,
};

export const nameSx: SxProps<Theme> = {
  color: "#6b7280",
  mt: 0.6,
};

export const dateSx: SxProps<Theme> = {
  color: "#9ca3af",
  mt: 0.4,
};

export const cardSx: SxProps<Theme> = {
  bgcolor: "#fff",
  borderRadius: 2,
  mt: 4,
  p: 2,
};

export const statusSx: SxProps<Theme> = {
  fontWeight: 700,
};

export const cardLabelSx: SxProps<Theme> = {
  color: "#6b7280",
  mt: 0.5,
};

export const dividerSx: SxProps<Theme> = {
  my: 1.5,
};

export const totalRowSx: SxProps<Theme> = {
  justifyContent: "space-between",
};
