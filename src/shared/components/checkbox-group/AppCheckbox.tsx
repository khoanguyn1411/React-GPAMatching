import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps } from "@mui/material";
import { FC } from "react";

import { StrictOmit } from "@/utils/types/common";

import { useCheckboxGroupContext } from "./CheckboxGroupProvider";

interface Props {
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: StrictOmit<FormControlLabelProps, "control" | "label">;
  value: string;
  label: string;
}

export const AppCheckbox: FC<Props> = ({
  value: muiValue,
  label,
  checkboxProps,
  formControlLabelProps,
}) => {
  const { value, onChange } = useCheckboxGroupContext();

  const handleSetSelectedItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.value;
    if (!onChange) {
      return;
    }
    const hasItemInList = value.includes(checked);
    if (hasItemInList) {
      onChange(value.filter((item) => checked !== item));
      return;
    }
    onChange([...value, checked]);
  };

  return (
    <FormControlLabel
      {...formControlLabelProps}
      control={
        <Checkbox
          {...checkboxProps}
          value={muiValue}
          onChange={handleSetSelectedItem}
          checked={value.includes(muiValue)}
        />
      }
      label={label}
    />
  );
};
