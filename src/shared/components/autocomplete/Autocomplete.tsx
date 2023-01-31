import { Autocomplete, TextField } from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react";

import { Option } from "../select/Select";

interface AutocompleteOption extends Pick<Option, "value" | "label"> {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

interface Props {
  list: AutocompleteOption[];
  value: string;
  placeholder: string;
  onChange: (param: string) => void;
}

export const AppAutocomplete: FC<Props> = ({ list, value, placeholder, onChange }) => {
  const [selected, setSelected] = useState<AutocompleteOption | null>(() => {
    return list.find((item) => item.value === value) ?? null;
  });

  const handleInputChange = (
    _event: React.SyntheticEvent,
    option: AutocompleteOption | null,
  ): void => {
    onChange(option ? option.value : "");
    setSelected(option);
  };

  useEffect(() => {
    setSelected(list.find((item) => item.value === value) ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <Autocomplete
      options={list}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={selected}
      onChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          placeholder={placeholder}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: 0,
            },
            "& .MuiInputBase-root": {
              paddingRight: "50px !important",
            },
          }}
          {...params}
        />
      )}
    />
  );
};
