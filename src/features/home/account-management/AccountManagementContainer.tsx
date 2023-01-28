import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { Skill } from "@/core/models/skills";
import { UserProfile } from "@/core/models/user";
import { useAuth } from "@/features/auth/useAuth";
import {
  genderList,
  provinceList,
  studyYearList,
  universityList,
} from "@/features/information/components/information-pages/initialize-info-page/InitializeInfoPage";
import { AppAutocomplete } from "@/shared/components/autocomplete/Autocomplete";
import { AvatarPicker } from "@/shared/components/avatar-picker/Avatar-picker";
import { AppDatePicker } from "@/shared/components/date-picker/DatePicker";
import { FormItem } from "@/shared/components/form-item/FormItem";
import { AppSelect, Option } from "@/shared/components/select/Select";
import { SelectMultiple } from "@/shared/components/select/SelectMultiple";
import { AppTextField } from "@/shared/components/text-field/TextField";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { useScrollToTop } from "@/utils/hooks/useScrollToTop";
import { AppReact } from "@/utils/types/react";

import { schema } from "./schema";

const GridItem: AppReact.FC.Children = ({ children }) => {
  return (
    <Grid item xs={6}>
      {children}
    </Grid>
  );
};

const skillList: Option[] = enumToArray(Skill).map((skill) => ({
  label: Skill.toReadable(skill),
  value: skill,
}));

export const AccountManagementContainer: FC = () => {
  useScrollToTop();
  const { currentUser } = useAuth();
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UserProfile>({
    resolver: yupResolver(schema),
    defaultValues: { email: currentUser?.email ?? "" },
  });

  const handleUpdateUserProfile = (user: UserProfile) => {
    console.log(user);
  };

  return (
    <Stack
      onSubmit={handleSubmit(handleUpdateUserProfile)}
      component="form"
      direction="column"
      spacing={3}
    >
      <Typography component="h1" variant="h1">
        Thông tin cá nhân
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Controller
          control={control}
          name="avatar"
          render={({ field: { value, onChange } }) => (
            <AvatarPicker
              defaultImageLink={currentUser?.photoURL ?? ""}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Stack>
          <Typography component="span" variant="h2">
            Đặng Khánh Linh
          </Typography>
          <Typography component="span">linhdk20411c@st.uel.edu.vn</Typography>
        </Stack>
      </Stack>
      <Stack>
        <Grid container columnSpacing={2}>
          <GridItem>
            <FormItem label="Họ và tên" isRequired error={errors.fullName?.message}>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { value, onChange } }) => (
                  <AppTextField placeholder="Họ và tên" value={value} onChange={onChange} />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Email" isRequired error={errors.email?.message}>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <AppTextField
                    type="email"
                    disabled
                    placeholder="Vd: abc@gmail.com"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Ngày sinh" isRequired error={errors.dateOfBirth?.message}>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { value, onChange } }) => (
                  <AppDatePicker disableFuture value={value} onChange={onChange} />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Năm" isRequired error={errors.year?.message}>
              <Controller
                control={control}
                name="year"
                render={({ field: { value, onChange } }) => (
                  <AppSelect
                    placeholder="Chọn năm"
                    value={value}
                    onChange={onChange}
                    list={studyYearList}
                  />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
              <Controller
                control={control}
                name="gender"
                render={({ field: { value, onChange } }) => (
                  <AppSelect
                    placeholder="Giới tính"
                    value={value}
                    onChange={onChange}
                    list={genderList}
                  />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Đơn vị học tập" isRequired error={errors.studyUnit?.message}>
              <Controller
                control={control}
                name="studyUnit"
                render={({ field: { value, onChange } }) => (
                  <AppAutocomplete
                    placeholder="Tìm và chọn trường"
                    list={universityList}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Số điện thoại" isRequired error={errors.phoneNumber?.message}>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { value, onChange } }) => (
                  <AppTextField
                    type="tel"
                    inputProps={{ maxLength: 10 }}
                    value={value}
                    onChange={onChange}
                    placeholder="Vd: 0909090902"
                  />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Chọn tỉnh thành" isRequired error={errors.city?.message}>
              <Controller
                control={control}
                name="city"
                render={({ field: { value, onChange } }) => (
                  <AppAutocomplete
                    placeholder="Tìm và chọn tỉnh thành"
                    list={provinceList}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormItem>
          </GridItem>
        </Grid>
        <FormItem label="Kĩ năng" isRequired error={errors.skillSet?.message}>
          <Controller
            control={control}
            name="skillSet"
            render={({ field: { value, onChange } }) => (
              <SelectMultiple
                placeholder="Chọn kĩ năng"
                value={value as string[]}
                onChange={onChange}
                list={skillList}
              />
            )}
          />
        </FormItem>
      </Stack>
      <Button type="submit" disabled={!isDirty} sx={{ alignSelf: "end" }} variant="contained">
        Cập nhật
      </Button>
    </Stack>
  );
};
