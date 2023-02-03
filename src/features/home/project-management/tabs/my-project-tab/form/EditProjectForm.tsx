import { Grid } from "@mui/material";
import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { IsReadyToJoin } from "@/core/models/is-ready-to-join";
import { ProjectCreation } from "@/core/models/project";
import { ProjectField } from "@/core/models/project-field";
import { ProjectStatus } from "@/core/models/project-status";
import { Skill } from "@/core/models/skills";
import { FormItem } from "@/shared/components/form-item/FormItem";
import { AppSelect, Option } from "@/shared/components/select/Select";
import { SelectMultiple } from "@/shared/components/select/SelectMultiple";
import { AppTextField } from "@/shared/components/text-field/TextField";
import { enumToArray } from "@/utils/funcs/enum-to-array";

type Props = {
  formProps: UseFormReturn<ProjectCreation>;
  mode: "edit" | "create";
  shouldHideIsReadyToJoinField?: boolean;
};

const skillSetList: Option[] = enumToArray(Skill).map((skill) => ({
  value: skill,
  label: Skill.toReadable(skill),
}));

export const projectFieldList: Option[] = enumToArray(ProjectField).map((field) => ({
  value: field,
  label: ProjectField.toReadable(field),
}));

const projectStatusList: Option[] = enumToArray(ProjectStatus).map((status) => ({
  value: status,
  label: ProjectStatus.toReadable(status),
}));

export const isReadyToJoinList: Option[] = enumToArray(IsReadyToJoin.ThreeChoices).map((ready) => ({
  value: ready,
  label: IsReadyToJoin.ThreeChoices.toReadable(ready),
}));

export const EditProjectForm: FC<Props> = ({ formProps, shouldHideIsReadyToJoinField = false }) => {
  const {
    control,
    formState: { errors },
  } = formProps;
  return (
    <>
      <FormItem label="Tên dự án" isRequired error={errors.name?.message}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <AppTextField placeholder="Tên dự án" value={value} onChange={onChange} />
          )}
        />
      </FormItem>

      <FormItem label="Mô tả tổng quan về dự án" isRequired error={errors.description?.message}>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <AppTextField
              rows={3}
              multiline
              placeholder="Mô tả dự án ..."
              value={value}
              InputProps={{ sx: { padding: 0 } }}
              onChange={onChange}
            />
          )}
        />
      </FormItem>
      <Grid container columnSpacing={2}>
        <Grid item xs={6}>
          <FormItem label="Dự án thuộc lĩnh vực" isRequired error={errors.field?.message}>
            <Controller
              control={control}
              name="field"
              render={({ field: { value, onChange } }) => (
                <AppSelect
                  placeholder="Chọn lĩnh vực"
                  value={value}
                  onChange={onChange}
                  list={projectFieldList}
                />
              )}
            />
          </FormItem>
        </Grid>
        <Grid item xs={6}>
          <FormItem label="Trạng thái dự án" isRequired error={errors.status?.message}>
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <AppSelect
                  placeholder="Chọn trạng thái"
                  value={value}
                  onChange={onChange}
                  list={projectStatusList}
                />
              )}
            />
          </FormItem>
        </Grid>

        <Grid item xs={6}>
          <FormItem
            label="Số thành viên hiện tại"
            isRequired
            error={errors.currentMemberQuantity?.message}
          >
            <Controller
              control={control}
              name="currentMemberQuantity"
              render={({ field: { value, onChange } }) => (
                <AppTextField
                  type="number"
                  placeholder="Số thành viên hiện tại"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>
        </Grid>

        <Grid item xs={6}>
          <FormItem
            label="Số thành viên đang tìm kiếm"
            isRequired
            error={errors.findingMemberQuantity?.message}
          >
            <Controller
              control={control}
              name="findingMemberQuantity"
              render={({ field: { value, onChange } }) => (
                <AppTextField
                  type="number"
                  placeholder="Số thành viên đang tìm kiếm"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>
        </Grid>
      </Grid>

      <FormItem label="Các kỹ năng dự án yêu cầu" isRequired error={errors.requiredSkills?.message}>
        <Controller
          control={control}
          name="requiredSkills"
          render={({ field: { value, onChange } }) => (
            <SelectMultiple
              placeholder="Chọn câu trả lời"
              value={value as string[]}
              onChange={onChange}
              list={skillSetList}
            />
          )}
        />
      </FormItem>

      {!shouldHideIsReadyToJoinField && (
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
      )}
    </>
  );
};
