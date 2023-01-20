import { Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";

import { images } from "@/assets/images";
import { firebaseAuth } from "@/firebase/firebase-config";
import { firebaseUIConfig } from "@/firebase/firebase-ui-config";
import { appColors } from "@/theme/mui-theme";

export const LoginContainer: FC = () => {
  return (
    <Stack
      sx={{
        backgroundImage: `url(images/background.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
    >
      <Stack
        sx={{ backgroundColor: appColors.backgroundBlur, borderRadius: "5px" }}
        width={"400px"}
        padding={"20px"}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <img src={images.gpaLogo} alt="GPA logo" />
        <Typography color={appColors.primary} textAlign={"center"} variant="h1">
          KHỞI NGHIỆP KINH DOANH
        </Typography>
        <Typography variant="h2">Mùa 5</Typography>
        <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={firebaseAuth} />
      </Stack>
    </Stack>
  );
};
