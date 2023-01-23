import { FormControlLabel, FormControlLabelProps, Radio, RadioProps } from "@mui/material";
import { FC } from "react";

type Props = {
  value: string;
  label: string;
  radioProps?: RadioProps;
  formControlLabelProps?: FormControlLabelProps;
};

export const AppRadio: FC<Props> = ({ value = "", label, radioProps, formControlLabelProps }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio {...radioProps} />}
      label={label}
      {...formControlLabelProps}
    />
  );
};
