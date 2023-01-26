import { Camera, CameraAlt, Warning } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { bgcolor } from "@mui/system";
import React, { useRef, useState } from "react";

import { APP_ERROR_MESSAGE } from "@/shared/constants/error-messages";
import { appColors } from "@/theme/mui-theme";
import { DEFAULT_LIMIT_FILE_SIZE_READABLE, EFile, usePickImage } from "@/utils/hooks/usePickImage";

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
        <Stack spacing={1} direction="column" position="relative">
          {fileData.type === EFile.Image && (
            <>
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
            </>
          )}
        </Stack>
      }
      {message && (
        <Dialog
          open={isOpenModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
