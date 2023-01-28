import { useAtom } from "jotai";

import { muiSnackBarAtom, SnackbarCustom } from "@/provider/SnackbarProvider";

export const useNotify = () => {
  const [, setSnackbarStatus] = useAtom(muiSnackBarAtom);
  const notify = (options: Pick<SnackbarCustom, "message" | "variant">) => {
    setSnackbarStatus({ ...options, isOpen: true });
  };
  return {
    notify,
  };
};
