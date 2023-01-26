import { Button } from "@mui/material";
import { FC } from "react";

type Props = {
  type: "cancel" | "join" | "out" | "disable";
};

export const ProjectButton: FC<Props> = ({ type }) => {
  const getButtonText = () => {
    if (type === "cancel") {
      return "Hủy yêu cầu";
    }
    if (type === "join") {
      return "Tham gia";
    }
    return "Thoát dự án";
  };
  return (
    <Button
      variant={type !== "cancel" ? "contained" : "outlined"}
      color={type !== "out" ? "primary" : "error"}
      disabled={type === "disable"}
    >
      {getButtonText()}
    </Button>
  );
};
