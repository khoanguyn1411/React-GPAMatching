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

export interface Option extends MenuItemProps {
  label: ReactNode;
  value: string;
}

type Props = {
  list: Option[];
  isShowOptionAll?: boolean;
  value: string | null;
  onChange: (param: string) => void;
  placeholder?: string;
  otherProps?: SelectProps<string>;
};

export const AppSelect: FC<Props> = ({
  value = "",
  isShowOptionAll = false,
  placeholder,
  list,
  onChange,
  otherProps,
}) => {
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
      value={value ?? ""}
      renderValue={(selected) => {
        if (!selected) {
          return (
            <Typography component="span" color={appColors.placeholder}>
              {placeholder ?? "Chọn"}
            </Typography>
          );
        }

        return list.find((item) => item.value === selected)?.label;
      }}
      {...otherProps}
    >
      {isShowOptionAll && (
        <MenuItem value="">
          <Typography component="span" sx={{ maxWidth: "500px", whiteSpace: "initial" }}>
            Tất cả
          </Typography>
        </MenuItem>
      )}
      {list.map(({ label, value, ...optionProps }, index) => (
        <MenuItem {...optionProps} key={`${value}-${index}`} value={value}>
          <Typography component="span" sx={{ maxWidth: "500px", whiteSpace: "initial" }}>
            {label}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
};
