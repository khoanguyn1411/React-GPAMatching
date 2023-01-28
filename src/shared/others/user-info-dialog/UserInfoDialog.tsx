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
import { FC } from "react";

import { AppReact } from "@/utils/types/react";

type Props = {
  isOpen: boolean;
  setIsOpen: AppReact.State.Dispatch<boolean>;
};

const GridItem: AppReact.FC.Children = ({ children }) => {
  return (
    <Grid item xs={6} gap={1.5} width="80px" display="flex" alignItems="center">
      {children}
    </Grid>
  );
};

export const UserInfoDialog: FC<Props> = ({ isOpen, setIsOpen }) => {
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
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
  );
};
