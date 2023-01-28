import { Avatar, Box, Button, Stack, Tooltip } from "@mui/material";
import { FC, useState } from "react";

import { LeaderAvatarIcon } from "@/assets/images/leader-avatar-icon";

import { UserInfoDialog } from "../user-info-dialog/UserInfoDialog";

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
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  return (
    <>
      <Stack direction="row" rowGap={1} columnGap={1.5} flexWrap="wrap">
        {list.map((member) => (
          <Tooltip arrow key={member.id} title={member.fullName}>
            <Box sx={{ cursor: "pointer" }} onClick={handleOpenDialog}>
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
      <UserInfoDialog isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
    </>
  );
};
