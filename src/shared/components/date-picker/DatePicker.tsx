import { TextField } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, useEffect } from "react";

import { StrictOmit } from "@/utils/types/common";
import { AppReact } from "@/utils/types/react";

interface Props
  extends StrictOmit<
    DatePickerProps<any, any>,
    "inputFormat" | "value" | "onChange" | "renderInput"
  > {
  value: Date | null;
  placeholder?: string;
  onChange: AppReact.State.Dispatch<Date | null>;
}

export const AppDatePicker: FC<Props> = ({ value, onChange, ...datePickerProps }) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(value ? dayjs(value) : null);
  const handleChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    onChange(newValue ? newValue.toDate() : null);
  };

  useEffect(() => {
    setSelectedDate(value ? dayjs(value) : null);
  }, [value]);

  return (
    <DatePicker
      PopperProps={{
        placement: "bottom-start",
        modifiers: [
          {
            name: "flip",
            options: {
              fallbackPlacements: ["top", "left"],
            },
          },
        ],
      }}
      dayOfWeekFormatter={(day: string) => `${day}`}
      inputFormat="DD/MM/YYYY"
      value={selectedDate}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} error={false} />}
      {...datePickerProps}
    />
  );
};
