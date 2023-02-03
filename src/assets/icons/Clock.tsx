import { AppReact } from "@/utils/types/react";

import { Props } from "./type";

export const ClockIcon: AppReact.FC.PropsWithChildren<Props> = ({ size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M20.3246 10C20.3246 15.524 15.985 20 10.6315 20C5.27806 20 0.938477 15.524 0.938477 10C0.938477 4.478 5.27806 0 10.6315 0C15.985 0 20.3246 4.478 20.3246 10Z"
        fill="currentColor"
      />
      <path
        d="M14.096 13.8145C13.969 13.8145 13.841 13.7805 13.7237 13.7095L9.91825 11.3675C9.69919 11.2315 9.56445 10.9865 9.56445 10.7225V5.67554C9.56445 5.26154 9.89014 4.92554 10.2914 4.92554C10.6927 4.92554 11.0184 5.26154 11.0184 5.67554V10.2965L14.4691 12.4195C14.8132 12.6325 14.9267 13.0925 14.7212 13.4485C14.5845 13.6835 14.3431 13.8145 14.096 13.8145Z"
        fill="currentColor"
      />
    </svg>
  );
};
