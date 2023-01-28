import "dayjs/locale/vi";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { AppReact } from "@/utils/types/react";

export const AppLocalizationProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <LocalizationProvider
      adapterLocale="vi"
      localeText={{ nextMonth: "Tháng tiếp theo", previousMonth: "Tháng trước" }}
      dateAdapter={AdapterDayjs}
    >
      {children}
    </LocalizationProvider>
  );
};
