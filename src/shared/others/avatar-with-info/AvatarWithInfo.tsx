import { AssignmentInd, Clear, Event, Person, School, Star } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

import { AppReact } from "@/utils/types/react";

export type Props = {
  avatarUrl: string;
  name: string;
  university: string;
};

const GridItem: AppReact.FC.Children = ({ children }) => {
  return (
    <Grid item xs={6} gap={1.5} width="80px" display="flex" alignItems="center">
      {children}
    </Grid>
  );
};

export const AvatarWithInfo: FC<Props> = ({ name, university, avatarUrl }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  return (
    <>
      <Stack
        sx={{ cursor: "pointer" }}
        component="div"
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

      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="avatar-picker-modal-title"
        aria-describedby="avatar-picker-modal-description"
      >
        <DialogTitle display="flex" gap={5} justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ width: 65, height: 65 }} />
            <Stack spacing={0.5}>
              <Typography variant="h2">Nguyễn Văn A</Typography>
              <Typography component="span">linhdk20411c@st.uel.edu.vn</Typography>
            </Stack>
          </Stack>
          <IconButton onClick={handleCloseModal} sx={{ height: "fit-content" }}>
            <Clear />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <GridItem>
              <Person />
              <Typography component="span">Nữ</Typography>
            </GridItem>
            <GridItem>
              <Event />
              <Typography component="span">19/11/2001</Typography>
            </GridItem>

            <GridItem>
              <AssignmentInd />
              <Typography component="span">Sinh viên năm 1</Typography>
            </GridItem>

            <GridItem>
              <School />
              <Typography component="span">Dai hoc Kinh te - Luat</Typography>
            </GridItem>

            <Grid item xs={12}>
              <Stack direction="row" spacing={1.5}>
                <Star />
                <Typography>Kỹ năng</Typography>
              </Stack>
              <Stack component="ul" direction="row" paddingX={3.5} gap={1.5} flexWrap="wrap">
                <Chip component="li" label="Lap trinh" />
                <Chip component="li" label="Lap trinh" />
                <Chip component="li" label="Lap trinh" />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
