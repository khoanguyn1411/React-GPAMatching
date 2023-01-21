import { CircularProgress, Container } from "@mui/material";
import { FC } from "react";

export const CircleLoading: FC = () => {
  return (
    <Container
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};
