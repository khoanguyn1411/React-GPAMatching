import { AppReact } from "@/utils/types/react";

import { CheckboxGroupContext, CheckboxGroupProvider } from "./CheckboxGroupProvider";

type Props = CheckboxGroupContext;

export const CheckboxGroup: AppReact.FC.PropsWithChildren<Props> = ({ children, ...props }) => {
  return <CheckboxGroupProvider {...props}>{children}</CheckboxGroupProvider>;
};
