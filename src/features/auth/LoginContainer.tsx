import { Stack, Typography } from "@mui/material";
import { FC } from "react";

export const LoginContainer: FC = () => {
  return (
    <Stack
      sx={{ backgroundColor: "black" }}
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
    >
      <Stack
        sx={{ backgroundColor: "white", borderRadius: "5px", opacity: 0.8 }}
        width={"300px"}
        padding={"20px"}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography textAlign={"center"} variant="h1">
          KHỞI NGHIỆP KINH DOANH
        </Typography>
        <Typography>Mùa 5</Typography>
      </Stack>
    </Stack>
  );
};
