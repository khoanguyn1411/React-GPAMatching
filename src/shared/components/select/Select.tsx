import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";

import { appColors } from "@/theme/mui-theme";
import { AppReact } from "@/utils/types/react";

export interface Option extends MenuItemProps {
  label: ReactNode;
  value: string;
}

type Props = {
  list: Option[];
  value: string;
  onChange: AppReact.State.Dispatch<string>;
  placeholder?: string;
  otherProps?: SelectProps<string>;
};

export const AppSelect: FC<Props> = ({ value = "", placeholder, list, onChange, otherProps }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  return (
    <Select
      onChange={handleChange}
      displayEmpty
      sx={{
        "& .MuiInputBase-input": {
          paddingRight: "30px !important",
        },
      }}
      value={value}
      renderValue={(selected) => {
        if (!selected) {
          return (
            <Typography color={appColors.textPrimaryLight}>{placeholder ?? "Chọn"}</Typography>
          );
        }

        return list.find((item) => item.value === selected)?.label;
      }}
      {...otherProps}
    >
      {list.map(({ label, value, ...optionProps }, index) => (
        <MenuItem {...optionProps} key={`${value}-${index}`} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
