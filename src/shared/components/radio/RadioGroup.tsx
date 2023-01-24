import { RadioGroup, RadioGroupProps } from "@mui/material";

import { AppReact } from "@/utils/types/react";

type Props = {
  value: string;
  onChange: (param: string) => void;
  otherProps?: RadioGroupProps;
};

export const AppRadioGroup: AppReact.FC.PropsWithChildren<Props> = ({
  children,
  value,
  otherProps,
  onChange,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };
  return (
    <RadioGroup
      aria-labelledby="radio-buttons-group"
      value={value}
      onChange={handleOnChange}
      {...otherProps}
    >
      {children}
    </RadioGroup>
  );
};
