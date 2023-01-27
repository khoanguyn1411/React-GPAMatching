import { Avatar, Stack } from "@mui/material";
import { FC, Fragment } from "react";

type MemberList = {
  id: number;
  avatarUrl: string;
  isLeader: boolean;
};

type Props = {
  list: MemberList[];
};

export const MemberList: FC<Props> = ({ list }) => {
  return (
    <Stack direction="row" spacing={1.5}>
      {list.map((member) => (
        <Fragment key={member.id}>
          {member.isLeader && <Avatar sx={{ width: 50, height: 50 }} src={member.avatarUrl} />}
          {!member.isLeader && <Avatar sx={{ width: 50, height: 50 }} src={member.avatarUrl} />}
        </Fragment>
      ))}
    </Stack>
  );
};
