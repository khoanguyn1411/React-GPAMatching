import { CircularProgress, Container } from "@mui/material";
import { FC } from "react";

type Props = {
  mode?: "full" | "normal";
};

export const CircleLoading: FC<Props> = ({ mode = "full" }) => {
  return (
    <Container
      sx={{
        height: mode === "full" ? "100vh" : "fit-content",
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
