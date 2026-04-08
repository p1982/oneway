import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const IconBox = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 36,
  height: 36,
  borderRadius: 8,
  display: "grid",
  placeItems: "center",
  color: "#fff",
  background: bgcolor,
  flexShrink: 0,
}));
