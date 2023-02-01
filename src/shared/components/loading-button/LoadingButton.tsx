import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";

interface Props extends ButtonProps {
  isLoading: boolean;
}

export const LoadingButton: FC<Props> = ({ isLoading, ...otherProps }) => {
  return (
    <Button
      startIcon={isLoading && <CircularProgress size={17} color="inherit" />}
      disabled={isLoading}
      {...otherProps}
    >
      {otherProps.children}
    </Button>
  );
};
