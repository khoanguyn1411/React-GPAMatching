import { Button, Container, Typography } from "@mui/material";
import { FC } from "react";

import { firebaseAuth } from "@/firebase/firebase-config";

import { useAuth } from "../auth/useAuth";

export const InformationContainer: FC = () => {
  const { currentUser } = useAuth();
  return (
    <Container>
      <Typography>Chúc mừng bạn {currentUser?.displayName}</Typography>
      <Button
        onClick={() => {
          firebaseAuth.signOut();
        }}
      >
        SignOut
      </Button>
    </Container>
  );
};
