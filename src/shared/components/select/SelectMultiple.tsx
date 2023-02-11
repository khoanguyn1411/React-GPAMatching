import { Clear } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import Typography from "@mui/material/Typography/Typography";
import { FC } from "react";

import { appColors } from "@/theme/mui-theme";
import { AppReact } from "@/utils/types/react";

import { Option } from "./Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  list: Option[];
  value: string[];
  onChange: AppReact.State.Dispatch<string[]>;
  placeholder?: string;
  otherProps?: SelectProps<string[]>;
};

export const SelectMultiple: FC<Props> = ({
  list,
  value = [],
  onChange,
  placeholder,
  otherProps,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    onChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleDelete = (deletedValue: string) => () => {
    onChange(value.filter((_value) => _value !== deletedValue));
  };

  return (
    <Select
      multiple
      value={value}
      displayEmpty
      sx={{
        "& .MuiInputBase-root": {
          paddingRight: "30px !import",
        },
      }}
      onChange={handleChange}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return (
            <Typography component="span" color={appColors.placeholder}>
              {placeholder ?? "Chọn"}
            </Typography>
          );
        }
        return (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                sx={{ height: "25px" }}
                key={value}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onDelete={handleDelete(value)}
                label={list.find((item) => item.value === value)?.label}
              />
            ))}
          </Box>
        );
      }}
      MenuProps={MenuProps}
      {...otherProps}
    >
      {list.map(({ label, value: _value, ...optionProps }, index) => (
        <MenuItem
          sx={{ display: "flex", justifyContent: "space-between" }}
          {...optionProps}
          key={`${_value}-${index}`}
          value={_value}
        >
          <Typography component="span" sx={{ maxWidth: "500px", whiteSpace: "initial" }}>
            {label}
          </Typography>
          {value.includes(_value) && <Clear />}
        </MenuItem>
      ))}
    </Select>
  );
};
