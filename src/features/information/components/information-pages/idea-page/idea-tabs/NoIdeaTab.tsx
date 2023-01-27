import { TextField } from "@mui/material";
import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { UserWithNoIdea } from "@/core/models/user-with-no-idea";
import { isReadyToJoinList } from "@/features/home/project-management/tabs/my-project-tab/form/EditProjectForm";
import { FormItem } from "@/shared/components/form-item/FormItem";
import { AppSelect } from "@/shared/components/select/Select";

type Props = {
  formProps: UseFormReturn<UserWithNoIdea>;
};

export const NoIdeaTab: FC<Props> = ({ formProps }) => {
  const {
    control,
    formState: { errors },
  } = formProps;
  return (
    <>
      <FormItem
        subLabel="Bạn có thể mô tả ở dưới hoặc chèn link drive chi tiết."
        label="Kinh nghiệm cá nhân"
        isRequired
        error={errors.experience?.message}
      >
        <Controller
          control={control}
          name="experience"
          render={({ field: { value, onChange } }) => (
            <TextField
              rows={3}
              multiline
              placeholder="Mô tả kinh nghiêm cá nhân ..."
              value={value}
              InputProps={{ sx: { padding: 0 } }}
              onChange={onChange}
            />
          )}
        />
      </FormItem>
      <FormItem
        label="Trong trường hợp bạn không thể ghép đội cùng các cá nhân bạn mong muốn, bạn có sẵn sàng tham gia KNKD lần thứ XI – 2023 với số lượng thành viên hiện tại không?"
        isRequired
        error={errors.readyToJoin?.message}
      >
        <Controller
          control={control}
          name="readyToJoin"
          render={({ field: { value, onChange } }) => (
            <AppSelect
              placeholder="Chọn câu trả lời"
              value={value}
              onChange={onChange}
              list={isReadyToJoinList}
            />
          )}
        />
      </FormItem>
    </>
  );
};
