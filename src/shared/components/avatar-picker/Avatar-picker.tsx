import { CameraAlt, Warning } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Tooltip,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";

import { APP_ERROR_MESSAGE } from "@/shared/constants/error-messages";
import { appColors } from "@/theme/mui-theme";
import { EFile, usePickImage } from "@/utils/hooks/usePickImage";

type Props = {
  defaultImageLink?: string;
  value: File | null | undefined;
  onChange: (file: File | null | undefined) => void;
};

export const AvatarPicker: React.FC<Props> = ({ value, defaultImageLink, onChange }) => {
  const [message, setMessage] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSetOverSizeMessage = () => {
    setMessage(APP_ERROR_MESSAGE.FILE_ERROR.OVERSIZE);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleResetMessage = () => {
    setMessage("");
  };

  const handleOnNotImageType = () => {
    setIsOpenModal(true);
    setMessage(APP_ERROR_MESSAGE.FILE_ERROR.NOT_IMAGE);
  };

  const { handleResetInput, handleUploadFile, handleOpenSelectFile, fileData } = usePickImage({
    file: value,
    defaultImageLink,
    inputFileRef,
    onImageOverSize: handleSetOverSizeMessage,
    onPreviewSuccess: handleResetMessage,
    setFile: onChange,
    onNotImageType: handleOnNotImageType,
  });

  return (
    <Stack direction="column" spacing={1}>
      <input
        ref={inputFileRef}
        type="file"
        hidden
        accept={EFile.Image}
        onClick={handleResetInput}
        onChange={handleUploadFile}
      />

      {
        <Stack spacing={1} direction="column" position="relative" width="fit-content">
          {fileData.type === EFile.Image && (
            <Tooltip placement="bottom-start" arrow title="Nhấn vào để chọn avatar">
              <Box>
                <Avatar
                  onClick={handleOpenSelectFile}
                  sx={{
                    width: 80,
                    height: 80,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8, transition: "0.3s ease" },
                  }}
                  alt="User avatar"
                  src={fileData.url?.toString() ?? ""}
                />
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
                {/* <Typography component="span">
                Dung lượng ảnh tối đa: {DEFAULT_LIMIT_FILE_SIZE_READABLE}
              </Typography> */}
              </Box>
            </Tooltip>
          )}
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
