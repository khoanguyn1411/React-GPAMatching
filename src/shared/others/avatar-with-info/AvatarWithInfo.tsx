import { Avatar, Stack, Typography } from "@mui/material";
import { FC } from "react";

export type Props = {
  avatarUrl: string;
  name: string;
  university: string;
};

export const AvatarWithInfo: FC<Props> = ({ name, university, avatarUrl }) => {
  return (
    <Stack direction="row" spacing={1.5}>
      <Avatar src={avatarUrl} />
      <Stack>
        <Typography component="h2" fontWeight={600}>
          {name}
        </Typography>
        <Typography component="em" fontSize={"13px"}>
          {university}
        </Typography>
      </Stack>
    </Stack>
  );
};
