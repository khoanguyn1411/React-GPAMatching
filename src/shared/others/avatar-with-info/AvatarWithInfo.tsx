import { Avatar, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";

import { UserInfoDialog } from "../user-info-dialog/UserInfoDialog";

export type Props = {
  avatarUrl: string;
  name: string;
  university: string;
};

export const AvatarWithInfo: FC<Props> = ({ name, university, avatarUrl }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  return (
    <>
      <Stack
        sx={{ all: "unset", display: "flex", cursor: "pointer" }}
        component="button"
        onClick={handleOpenModal}
        direction="row"
        spacing={1.5}
      >
        <Avatar src={avatarUrl} />
        <Stack>
          <Typography component="h2" fontWeight={600}>
            {name}
          </Typography>
          <Typography component="em" fontSize={"13px"} maxWidth="220px">
            {university}
          </Typography>
        </Stack>
      </Stack>
      <UserInfoDialog isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
};
