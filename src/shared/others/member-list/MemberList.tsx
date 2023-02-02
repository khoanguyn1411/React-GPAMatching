import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";
import { FC, useState } from "react";

import { LeaderAvatarIcon } from "@/assets/images/leader-avatar-icon";
import { UserShort } from "@/core/models/user";

import { UserInfoDialog } from "../user-info-dialog/UserInfoDialog";

type Props = {
  list: readonly UserShort[];
  leaderId: UserShort["id"];
};

export const MemberList: FC<Props> = ({ list, leaderId }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [memberData, setMemberData] = useState<UserShort | null>(null);
  const handleOpenDialog = (member: UserShort) => () => {
    setIsOpenDialog(true);
    setMemberData(member);
  };
  const isLeader = (member: UserShort) => {
    return leaderId === member.id;
  };

  if (list.length === 0) {
    return <Typography>Chưa có thành viên nào.</Typography>;
  }
  return (
    <>
      <Stack direction="row" rowGap={1} columnGap={1.5} flexWrap="wrap">
        {list.map((member, index) => (
          <Tooltip arrow key={`${member.id}-${index}`} title={member.fullName}>
            <Box sx={{ cursor: "pointer" }} onClick={handleOpenDialog(member)}>
              {isLeader(member) && (
                <Box position="relative">
                  <Box position="absolute" right={-12} top={-10} zIndex={2}>
                    <LeaderAvatarIcon />
                  </Box>
                  <Avatar sx={{ width: 50, height: 50 }} src={member.avatarUrl} />
                </Box>
              )}
              {!isLeader(member) && (
                <Avatar sx={{ width: 50, height: 50 }} src={member.avatarUrl} />
              )}
            </Box>
          </Tooltip>
        ))}
      </Stack>
      <UserInfoDialog data={memberData} isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
    </>
  );
};
