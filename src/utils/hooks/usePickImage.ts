import { useCallback, useEffect, useState } from "react";

export const DEFAULT_LIMIT_FILE_SIZE = 3e5;
export const DEFAULT_LIMIT_FILE_SIZE_READABLE = "300kb";
export enum EFile {
  Image = "image/*",
}

type TFileData = {
  url: string | ArrayBuffer | undefined | null;
  type: EFile;
};

type THookPickImage = {
  defaultImageLink?: string;
  file: File | null | undefined;
  isDisable?: boolean;
  inputFileRef: React.MutableRefObject<HTMLInputElement | null>;
  setFile: (file: File | undefined | null) => void;
  onImageOverSize?: () => void;
  onPreviewSuccess?: () => void;
  onNotImageType?: () => void;
};

export const usePickImage = ({
  defaultImageLink,
  file,
  isDisable = false,
  inputFileRef,
  setFile,
  onImageOverSize,
  onNotImageType,
  onPreviewSuccess,
}: THookPickImage) => {
  const [fileData, setFileData] = useState<TFileData>({
    url: defaultImageLink,
    type: EFile.Image,
  });

  const handleOpenSelectFile = () => {
    if (isDisable) {
      return;
    }
    if (!inputFileRef.current) {
      return;
    }
    inputFileRef.current.click();
  };

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setFileData({ url: null, type: EFile.Image });
  }, [setFile]);

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisable || event.target.files == null) {
      return;
    }

    const file = event.target.files[0];
    if (file.size > DEFAULT_LIMIT_FILE_SIZE) {
      onImageOverSize?.();
      return;
    }
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      onNotImageType?.();
      return;
    }
    onPreviewSuccess?.();
    setFile(file);
  };

  const handleResetInput = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  useEffect(() => {
    setFile(undefined);
    setFileData({ url: defaultImageLink, type: EFile.Image });
  }, [defaultImageLink, handleRemoveFile, setFile]);

  useEffect(() => {
    let fileReader: FileReader | null = null,
      isCancel = false;
    if (!file) {
      return;
    }

    fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (event.target == null) {
        return;
      }
      const { result } = event.target;
      if (result && !isCancel) {
        setFileData({ type: EFile.Image, url: result });
      }
    };
    fileReader.readAsDataURL(file);
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, handleRemoveFile]);

  const isHasImage = fileData && fileData.url && fileData.type === EFile.Image;

  return {
    handleResetInput,
    handleUploadFile,
    handleOpenSelectFile,
    handleRemoveFile,
    isHasImage,
    fileData,
  };
};
