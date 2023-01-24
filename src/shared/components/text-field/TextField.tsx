import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

type Props = TextFieldProps & {
  value: string;
};

export const AppTextField: FC<Props> = ({ value = "", ...others }) => {
  return <TextField value={value} {...others} />;
};
