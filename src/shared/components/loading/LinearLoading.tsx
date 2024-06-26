import { LinearProgress } from "@mui/material";
import { FC } from "react";

export const LinearLoading: FC = () => {
  return (
    <LinearProgress
      variant="indeterminate"
      sx={{ position: "fixed", height: "4px", top: 0, width: "100%", zIndex: 9999 }}
    />
  );
};
