import { CircularProgress } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { Container } from "@mui/system";
import { atom } from "jotai";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { useAuth } from "@/features/auth/useAuth";
import { AppReact } from "@/utils/types/react";

export const isRouteLoadingAtom = atom<boolean>(false);

export const RouterProvider: AppReact.FC.Children = ({ children }) => {
  const { isPending } = useAuth();
  return (
    <Suspense
      fallback={
        <LinearProgress
          variant="indeterminate"
          sx={{ position: "fixed", height: "2.8px", top: 0, width: "100%", zIndex: 9999 }}
        />
      }
    >
      {isPending && (
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
      )}
      {!isPending && <BrowserRouter>{children}</BrowserRouter>}
    </Suspense>
  );
};
