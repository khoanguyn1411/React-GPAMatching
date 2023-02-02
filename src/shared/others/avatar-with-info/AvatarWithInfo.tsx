import { Avatar, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";

import { UserShort } from "@/core/models/user";

import { UserInfoDialog } from "../user-info-dialog/UserInfoDialog";

export type Props = {
  data: UserShort;
};

export const AvatarWithInfo: FC<Props> = ({ data }) => {
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
        <Avatar src={data.avatarUrl} />
        <Stack>
          <Typography component="h2" fontWeight={600} title={data.fullName}>
            {data.fullName}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
            fontSize={"13px"}
            title={data.school}
            fontWeight={500}
            maxWidth="220px"
          >
            {data.school}
          </Typography>
        </Stack>
      </Stack>
      <UserInfoDialog data={data} isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  );
};
