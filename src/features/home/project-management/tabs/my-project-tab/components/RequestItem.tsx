import { Button, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";

import { UserShort } from "@/core/models/user";
import { AvatarWithInfo } from "@/shared/others/avatar-with-info/AvatarWithInfo";

type Props = {
  onRejected?: (user: UserShort) => void;
  onApproved?: (user: UserShort) => void;
  user: UserShort;
};

export const RequestItem: FC<Props> = ({ user, onRejected, onApproved }) => {
  const handleApproved = () => {
    onApproved?.(user);
  };
  const handleRejected = () => {
    onRejected?.(user);
  };
  return (
    <Stack spacing={1.5}>
      <Divider />
      <AvatarWithInfo data={user} />
      <Stack direction="row" spacing={2}>
        <Button onClick={handleApproved} sx={{ flex: 1 }} variant="contained">
          Duyệt tham gia
        </Button>
        <Button onClick={handleRejected} sx={{ flex: 1 }} variant="outlined">
          Từ chối
        </Button>
      </Stack>
    </Stack>
  );
};
