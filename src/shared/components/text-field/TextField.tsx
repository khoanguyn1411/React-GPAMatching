import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

import { StrictOmit } from "@/utils/types/common";

type Props = StrictOmit<TextFieldProps, "value" | "onChange"> & {
  value: string;
  onChange: (param: string) => void;
};

export const AppTextField: FC<Props> = ({ value = "", onChange, ...others }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return <TextField autoComplete="off" onChange={handleInputChange} value={value} {...others} />;
};
