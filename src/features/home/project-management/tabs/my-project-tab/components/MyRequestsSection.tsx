import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { FC } from "react";

import { RequestItem } from "./RequestItem";

export const MyRequestsSection: FC = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Yêu cầu xin vào nhóm</Typography>
      <Stack spacing={4}>
        <Typography>Bạn không có yêu cầu nào.</Typography>
        <RequestItem />
        <RequestItem />
        <RequestItem />
        <RequestItem />
        <RequestItem />
        <RequestItem />
      </Stack>
    </Stack>
  );
};
