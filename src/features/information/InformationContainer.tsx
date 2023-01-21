import { Container, Typography } from "@mui/material";
import { FC } from "react";

import { firebaseConfig } from "@/firebase/firebase-config";

import { useAuth } from "../auth/useAuth";

export const InformationContainer: FC = () => {
  const { currentUser } = useAuth();
  console.log(firebaseConfig);
  return (
    <Container>
      <Typography>
        Chúc mừng bạn {currentUser?.displayName} đã bị hack mất tài khoản Google.
      </Typography>
    </Container>
  );
};
