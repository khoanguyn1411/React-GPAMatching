import { Button, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";

import { APP_ERROR_MESSAGE } from "@/shared/constants/error-messages";
import { DEFAULT_LIMIT_FILE_SIZE_READABLE, EFile, usePickImage } from "@/utils/hooks/usePickImage";

type Props = {
  defaultImageLink?: string;
  value: File | null | undefined;
  onChange: (file: File | null | undefined) => void;
};

export const AvatarPicker: React.FC<Props> = ({ value, defaultImageLink, onChange }) => {
  const [message, setMessage] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSetOverSizeMessage = () => {
    setMessage(APP_ERROR_MESSAGE.FILE_ERROR.OVERSIZE(DEFAULT_LIMIT_FILE_SIZE_READABLE));
  };

  const handleResetMessage = () => {
    setMessage("");
  };

  const { handleResetInput, handleUploadFile, handleOpenSelectFile, handleRemoveFile, fileData } =
    usePickImage({
      file: value,
      defaultImageLink,
      inputFileRef,
      onImageOverSize: handleSetOverSizeMessage,
      onPreviewSuccess: handleResetMessage,
      setFile: onChange,
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
      {(!fileData || !fileData.url) && (
        <>
          <Button
            sx={{ width: "fit-content" }}
            variant="outlined"
            type="button"
            onClick={handleOpenSelectFile}
          >
            Chọn ảnh
          </Button>
          <Typography component="span">
            Cho phép upload file dưới {DEFAULT_LIMIT_FILE_SIZE_READABLE}
          </Typography>
        </>
      )}

      {fileData && fileData.url && (
        <Stack spacing={1} direction="row" alignItems="center">
          {fileData.type === EFile.Image && (
            <>
              <Avatar
                sx={{ width: 70, height: 70 }}
                alt="img-preview"
                className="object-cover object-left h-full rounded-md"
                src={fileData.url.toString()}
              />
              <Button sx={{ height: "fit-content" }} onClick={handleRemoveFile} type="button">
                Xóa ảnh
              </Button>
            </>
          )}
        </Stack>
      )}
      {message && (
        <Typography component="span" color={"error"}>
          {message}
        </Typography>
      )}
    </Stack>
  );
};
