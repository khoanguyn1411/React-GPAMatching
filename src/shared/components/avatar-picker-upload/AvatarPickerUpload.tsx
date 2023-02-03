import { CameraAlt, Warning } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { FC, useRef, useState } from "react";

import { UploadService } from "@/services/uploadService";
import { APP_ERROR_MESSAGE } from "@/shared/constants/error-messages";
import { appColors } from "@/theme/mui-theme";
import { DEFAULT_LIMIT_FILE_SIZE, EFile } from "@/utils/hooks/usePickImage";

import { CircleLoading } from "../loading/CircleLoading";

type Props = {
  value: string;
  shouldShowButton?: boolean;
  onChange: (value: string) => void;
};

export const AvatarPickerUpload: FC<Props> = ({ value, shouldShowButton = false, onChange }) => {
  const [message, setMessage] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { isLoading, mutate } = useMutation({
    mutationFn: UploadService.uploadAvatar,
    onError: () => {
      setMessage("Có lỗi xảy ra trong quá trình chọn avatar. Vui lòng thử lại.");
      setIsOpenModal(true);
    },
    onSuccess: (avatarUrl) => {
      onChange(avatarUrl);
    },
  });

  const handleOpenSelectFile = () => {
    if (!inputFileRef.current) {
      return;
    }
    inputFileRef.current.click();
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) {
      return;
    }
    const file = event.target.files[0];
    if (file.size > DEFAULT_LIMIT_FILE_SIZE) {
      setMessage(APP_ERROR_MESSAGE.FILE_ERROR.OVERSIZE);
      setIsOpenModal(true);
      return;
    }
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      setIsOpenModal(true);
      setMessage(APP_ERROR_MESSAGE.FILE_ERROR.NOT_IMAGE);
      return;
    }
    mutate({ avatar: file });
  };

  return (
    <Stack direction="column" spacing={1}>
      <input
        ref={inputFileRef}
        type="file"
        hidden
        disabled={isLoading}
        accept={EFile.Image}
        onChange={handleUploadFile}
      />

      {
        <Stack spacing={1} direction="column" position="relative" width="fit-content">
          <Box>
            {isLoading && (
              <Box sx={{ position: "absolute", zIndex: 10, top: 15, right: 0, left: 0, bottom: 0 }}>
                <CircleLoading mode="normal" />
              </Box>
            )}
            <Tooltip placement="bottom-start" arrow title="Nhấn vào để chọn avatar">
              <Avatar
                onClick={handleOpenSelectFile}
                sx={{
                  width: 80,
                  height: 80,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8, transition: "0.3s ease" },
                }}
                alt="User avatar"
                src={value}
              />
            </Tooltip>
            {shouldShowButton && (
              <Box
                position="absolute"
                right={-110}
                top={0}
                bottom={0}
                display="flex"
                alignItems="center"
              >
                <Button
                  onClick={handleOpenSelectFile}
                  variant="outlined"
                  sx={{ height: "fit-content" }}
                >
                  Chọn ảnh
                </Button>
              </Box>
            )}
            <CameraAlt
              fontSize="medium"
              sx={{
                position: "absolute",
                right: "-3px",
                bottom: "-3px",
                bgcolor: appColors.backgroundBlur,
                borderRadius: "8px",
                padding: "3px",
              }}
            />
          </Box>
        </Stack>
      }
      {message && (
        <Dialog
          open={isOpenModal}
          onClose={handleCloseModal}
          aria-labelledby="avatar-picker-modal-title"
          aria-describedby="avatar-picker-modal-description"
        >
          <DialogTitle display="flex" alignItems="center" gap={2}>
            <Warning color="warning" />
            Lỗi tải lên hình ảnh
          </DialogTitle>
          <DialogContent>
            <Typography component="span">{message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>OKE</Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
};
