import { Google } from "@mui/icons-material";
import { Button, Card, Stack, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAtom } from "jotai";
import { FC } from "react";

import { images } from "@/assets/images";
import { firebaseAuth } from "@/firebase/firebase-config";
import { oauthCredentialAtom } from "@/providers/AuthProvider";
import { appColors } from "@/theme/mui-theme";
import { useCommon } from "@/utils/hooks/useCommon";
import { useNotify } from "@/utils/hooks/useNotify";

import style from "./LoginContainer.module.css";
const provider = new GoogleAuthProvider();

export const LoginContainer: FC = () => {
  useCommon();

  const [, setOauthCredential] = useAtom(oauthCredentialAtom);
  const { notify } = useNotify();
  const handleLoginFirebase = () => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const googleCredential = GoogleAuthProvider.credentialFromResult(result);
        setOauthCredential(googleCredential);
      })
      .catch(() => notify({ message: "Đăng nhập thất bại", variant: "error" }));
  };
  return (
    <Stack
      sx={{
        backgroundColor: appColors.backgroundBlur,
      }}
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
    >
      <Card>
        <Stack
          sx={{ borderRadius: "8px" }}
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
          <Button variant="contained" startIcon={<Google />} onClick={handleLoginFirebase}>
            Đăng nhập với Google
          </Button>
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
