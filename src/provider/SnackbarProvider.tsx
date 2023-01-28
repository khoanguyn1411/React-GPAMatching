import { Alert, Snackbar } from "@mui/material";
import { atom, useAtom } from "jotai";
import React from "react";

import { AppReact } from "@/utils/types/react";

export type SnackbarCustom = {
  isOpen: boolean;
  message: string;
  variant: "error" | "warning" | "info" | "success";
};

export const muiSnackBarAtom = atom<SnackbarCustom>({
  isOpen: false,
  message: "",
  variant: "info",
});

export const SnackbarProvider: AppReact.FC.Children = ({ children }) => {
  const [snackbarStatus, setSnackbarStatus] = useAtom(muiSnackBarAtom);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarStatus((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <>
      {children}
      <Snackbar open={snackbarStatus.isOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={snackbarStatus.variant}
          sx={{ width: "100%", color: "white" }}
        >
          {snackbarStatus.message}
        </Alert>
      </Snackbar>
    </>
  );
};
