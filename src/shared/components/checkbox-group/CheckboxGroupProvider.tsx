import { createContext, useContext } from "react";

import { AppReact } from "@/utils/types/react";

export type CheckboxGroupContext = {
  value: string[];
  onChange: AppReact.State.Dispatch<string[]> | null;
};

const CheckboxGroupContext = createContext<CheckboxGroupContext>({
  value: [],
  onChange: null,
});

export const CheckboxGroupProvider: AppReact.FC.PropsWithChildren<CheckboxGroupContext> = ({
  value = [],
  onChange,
  children,
}) => {
  const values = { value, onChange };
  return <CheckboxGroupContext.Provider value={values}>{children}</CheckboxGroupContext.Provider>;
};

export const useCheckboxGroupContext = (): CheckboxGroupContext => {
  const context = useContext(CheckboxGroupContext);
  if (typeof context == null) {
    throw new Error("This component must be used within radio group context.");
  }
  return context;
};
