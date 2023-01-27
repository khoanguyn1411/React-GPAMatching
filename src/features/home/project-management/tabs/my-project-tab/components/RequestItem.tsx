import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";

import { AvatarWithInfo } from "@/shared/others/avatar-with-info/AvatarWithInfo";

type Props = {
  onRejected?: (id: number) => void;
  onApproved?: (id: number) => void;
};

export const RequestItem: FC<Props> = ({ onRejected, onApproved }) => {
  const handleApproved = () => {
    onApproved?.(123);
  };
  const handleRejected = () => {
    onRejected?.(123);
  };
  return (
    <Stack spacing={1.5}>
      <AvatarWithInfo avatarUrl={""} name={"123"} university={"1231231312"} />
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
