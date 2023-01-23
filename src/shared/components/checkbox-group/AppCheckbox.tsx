import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { FC } from "react";

import { useCheckboxGroupContext } from "./CheckboxGroupProvider";

interface Props extends CheckboxProps {
  value: string;
  label: string;
}

export const AppCheckbox: FC<Props> = ({ value: muiValue, label, ...props }) => {
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
      control={
        <Checkbox
          {...props}
          value={muiValue}
          onChange={handleSetSelectedItem}
          checked={value.includes(muiValue)}
        />
      }
      label={label}
    />
  );
};
