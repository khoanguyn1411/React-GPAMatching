import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { FC, useEffect, useRef } from "react";

import { appColors } from "@/theme/mui-theme";

type Props = {
  label?: string;
  subLabel?: string;
  error?: string;
  description?: string;
  isRequired?: boolean;
  isNoSpace?: boolean;
  isHidden?: boolean;
  children: JSX.Element;
};

export const FormItem: FC<Props> = ({
  label,
  error,
  description,
  isRequired,
  isNoSpace,
  isHidden,
  children,
  subLabel,
}) => {
  const focusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (error && focusRef && focusRef.current) {
      focusRef.current.scrollIntoView({ block: "center" });
    }
  }, [error]);
  return (
    <Box sx={{ marginBottom: isNoSpace ? 0 : 1.5, display: isHidden ? "none" : "block" }}>
      <Stack>
        {label && (
          <Typography marginBottom={1} fontWeight={600} component="label" htmlFor="title">
            {label}{" "}
            {isRequired ? (
              <Typography component="span" color="error">
                *
              </Typography>
            ) : null}
          </Typography>
        )}
        {subLabel && (
          <Typography
            fontSize="15px"
            fontStyle="italic"
            color={appColors.textPrimaryLight}
            sx={{ marginBottom: 1, marginTop: -1 }}
          >
            {subLabel}
          </Typography>
        )}
      </Stack>
      <div ref={focusRef}>{children}</div>

      {error && (
        <Typography
          marginTop={1}
          display="block"
          color="error"
          className="animate__animated animate__fadeIn animate__faster"
        >
          {error}
        </Typography>
      )}

      {description && <Typography marginTop={2}>{description}</Typography>}
    </Box>
  );
};
