import { Autocomplete, LinearProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FC, ReactNode, useEffect, useState } from "react";

import { Option } from "../select/Select";

interface AutocompleteOption extends Pick<Option, "value" | "label"> {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

interface Props {
  value: string;
  placeholder: string;
  list?: AutocompleteOption[];
  isLoading?: boolean;
  onChange: (param: string) => void;
}

export const AppAutocomplete: FC<Props> = ({
  isLoading = false,
  list = [],
  value,
  placeholder,
  onChange,
}) => {
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
  }, [value, list]);
  return (
    <Autocomplete
      options={list}
      loading={isLoading}
      loadingText="Đang tải ..."
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={selected}
      onChange={handleInputChange}
      renderInput={(params) => (
        <Box position={"relative"}>
          {isLoading && (
            <LinearProgress
              sx={{ width: "100%", zIndex: 2, position: "absolute", top: 0, left: 0 }}
            />
          )}
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
        </Box>
      )}
    />
  );
};
