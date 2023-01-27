import { Avatar, Box, Stack, Tooltip } from "@mui/material";
import { FC } from "react";

import { LeaderAvatarIcon } from "@/assets/images/leader-avatar-icon";

type MemberList = {
  id: number;
  fullName: string;
  avatarUrl: string;
  isLeader: boolean;
};

type Props = {
  list: MemberList[];
};

export const MemberList: FC<Props> = ({ list }) => {
  return (
    <Stack direction="row" gap={1.5} flexWrap="wrap">
      {list.map((member) => (
        <Tooltip arrow key={member.id} title={member.fullName}>
          <Box>
            {member.isLeader && (
              <Box position="relative">
                <Box position="absolute" right={-12} top={-10} zIndex={2}>
                  <LeaderAvatarIcon />
                </Box>
                <Avatar sx={{ width: 50, height: 50 }} src={member.avatarUrl} />
              </Box>
            )}
            {!member.isLeader && <Avatar sx={{ width: 50, height: 50 }} src={member.avatarUrl} />}
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
};
