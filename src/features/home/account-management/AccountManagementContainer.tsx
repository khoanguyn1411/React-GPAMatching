import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Skill } from "@/core/models/skills";
import { useAuth } from "@/features/auth/useAuth";
import {
  genderList,
  studyYearList,
  universityList,
} from "@/features/information/components/information-pages/initialize-info-page/InitializeInfoPage";
import { ProfileService } from "@/services/profileService";
import { AppAutocomplete } from "@/shared/components/autocomplete/Autocomplete";
import { AvatarPickerUpload } from "@/shared/components/avatar-picker-upload/AvatarPickerUpload";
import { AppDatePicker } from "@/shared/components/date-picker/DatePicker";
import { FormItem } from "@/shared/components/form-item/FormItem";
import { LoadingButton } from "@/shared/components/loading-button/LoadingButton";
import { ProvinceAutocomplete } from "@/shared/components/province-autocomplete/ProvinceAutocomplete";
import { AppSelect, Option } from "@/shared/components/select/Select";
import { SelectMultiple } from "@/shared/components/select/SelectMultiple";
import { AppTextField } from "@/shared/components/text-field/TextField";
import { QUERY_KEY } from "@/store/key";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { useCommon } from "@/utils/hooks/useCommon";
import { useNotify } from "@/utils/hooks/useNotify";
import { AppReact } from "@/utils/types/react";

import { schema, UserProfileForm } from "./schema";

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
  useCommon();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { notify } = useNotify();
  const {
    control,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UserProfileForm>({
    resolver: yupResolver(schema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: ProfileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.PROFILE]);
      notify({ message: "Cập nhật thông tin thành công", variant: "success" });
    },
    onError: () => {
      notify({ message: "Cập nhật thông tin thất bại", variant: "error" });
    },
  });
  const handleUpdateUserProfile = (user: UserProfileForm) => {
    if (currentUser == null) {
      return;
    }
    mutate({
      data: { ...user, id: currentUser.id, isFilledInformation: true },
      currentUser,
    });
  };

  useEffect(() => {
    reset({
      email: currentUser?.email,
      fullName: currentUser?.fullName,
      avatarUrl: currentUser?.avatarUrl,
      dob: currentUser?.dob,
      yearOfStudent: currentUser?.yearOfStudent,
      gender: currentUser?.gender,
      school: currentUser?.school,
      phoneNumber: currentUser?.phoneNumber,
      homeAddress: currentUser?.homeAddress,
      skillSet: currentUser?.skillSet,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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
          name="avatarUrl"
          render={({ field: { value, onChange } }) => (
            <AvatarPickerUpload value={value} onChange={onChange} />
          )}
        />

        <Stack>
          <Typography component="span" variant="h2">
            {currentUser?.fullName}
          </Typography>
          <Typography component="span">{currentUser?.email}</Typography>
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
                  <AppTextField
                    placeholder="Họ và tên"
                    name="fullName"
                    value={value}
                    onChange={onChange}
                  />
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
                    name="email"
                    placeholder="Vd: abc@gmail.com"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Ngày sinh" isRequired error={errors.dob?.message}>
              <Controller
                control={control}
                name="dob"
                render={({ field: { value, onChange } }) => (
                  <AppDatePicker disableFuture value={value} onChange={onChange} />
                )}
              />
            </FormItem>
          </GridItem>

          <GridItem>
            <FormItem label="Năm" isRequired error={errors.yearOfStudent?.message}>
              <Controller
                control={control}
                name="yearOfStudent"
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
            <FormItem label="Đơn vị học tập" isRequired error={errors.school?.message}>
              <Controller
                control={control}
                name="school"
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
                    name="phoneNumber"
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
            <FormItem label="Chọn tỉnh thành" isRequired error={errors.homeAddress?.message}>
              <Controller
                control={control}
                name="homeAddress"
                render={({ field: { value, onChange } }) => (
                  <ProvinceAutocomplete value={value} onChange={onChange} />
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
      <LoadingButton
        sx={{ alignSelf: "end" }}
        isLoading={isLoading}
        variant="contained"
        disabled={!isDirty}
        type="submit"
      >
        Cập nhật
      </LoadingButton>
    </Stack>
  );
};
