import { Box, Typography } from "@mui/material";
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

export const Card = styled(Box)({
  background: "#fff",
  borderRadius: 12,
  padding: 12,
});

export const SoftTitle = styled(Typography)({
  color: "#6b7280",
  fontSize: 13,
  fontWeight: 600,
});

export const loadingStackSx: SxProps<Theme> = {
  minHeight: "90vh",
  alignItems: "center",
  justifyContent: "center",
};

export const errorTextSx: SxProps<Theme> = {
  mt: 4,
  textAlign: "center",
};
