import { Card, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";

import { images } from "@/assets/images";
import { firebaseAuth } from "@/firebase/firebase-config";
import { firebaseUIConfig } from "@/firebase/firebase-ui-config";
import { appColors } from "@/theme/mui-theme";

import style from "./LoginContainer.module.css";

export const LoginContainer: FC = () => {
  return (
    <Stack
      sx={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
    >
      <Card>
        <Stack
          sx={{ backgroundColor: appColors.backgroundBlur, borderRadius: "8px" }}
          width={"400px"}
          padding={"20px"}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3.2}
        >
          <Stack direction="row" spacing={3}>
            <img src={images.gpaLogo} className={style["logo-images"]} alt="GPA logo" />
            <img src={images.symlodyLogo} className={style["logo-images"]} alt="GPA logo" />
          </Stack>
          <Typography textAlign={"center"} variant="h1">
            Nền tảng kết nối các ý tưởng và tìm kiếm đồng đội
          </Typography>
          <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={firebaseAuth} />
          <Typography
            component="span"
            color={appColors.textPrimaryLight}
            fontSize={"12px"}
            fontWeight={500}
          >
            Powed by Symlody Team
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
};
