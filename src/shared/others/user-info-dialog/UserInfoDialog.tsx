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

import { Gender } from "@/core/models/gender";
import { Skill } from "@/core/models/skills";
import { UserShort } from "@/core/models/user";
import { UserStudyYear } from "@/core/models/user-study-year";
import { DateUtils } from "@/utils/funcs/date-utils";
import { AppReact } from "@/utils/types/react";

type Props = {
  isOpen: boolean;
  setIsOpen: AppReact.State.Dispatch<boolean>;
  data: UserShort | null;
};

const GridItem: AppReact.FC.Children = ({ children }) => {
  return (
    <Grid item xs={6} gap={1.5} width="80px" display="flex">
      {children}
    </Grid>
  );
};

export const UserInfoDialog: FC<Props> = ({ isOpen, setIsOpen, data }) => {
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (data == null) {
    return <></>;
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="avatar-picker-modal-title"
      aria-describedby="avatar-picker-modal-description"
    >
      <DialogTitle display="flex" gap={5} justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ width: 65, height: 65 }} src={data.avatarUrl} />
          <Stack spacing={0.5}>
            <Typography variant="h2">{data.fullName}</Typography>
          </Stack>
        </Stack>
        <IconButton onClick={handleCloseModal} sx={{ height: "fit-content" }}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          <GridItem>
            <Person />
            <Typography component="span">{Gender.toReadable(data.gender)}</Typography>
          </GridItem>
          <GridItem>
            <Event />
            <Typography component="span">{DateUtils.toFormat(data.dob, "VN")}</Typography>
          </GridItem>

          <GridItem>
            <AssignmentInd />
            <Typography component="span">
              Sinh viên {UserStudyYear.toReadable(data.yearOfStudent)}
            </Typography>
          </GridItem>

          <GridItem>
            <School />
            <Typography component="span">{data.school}</Typography>
          </GridItem>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1.5}>
              <Star />
              <Typography>Kỹ năng</Typography>
            </Stack>
            <Stack component="ul" direction="row" paddingX={3.5} gap={1.5} flexWrap="wrap">
              {data.skillSet.map((skill, index) => (
                <Chip key={`skill-${index}`} component="li" label={Skill.toReadable(skill)} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
