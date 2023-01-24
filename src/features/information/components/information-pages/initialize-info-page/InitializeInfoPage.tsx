import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { Gender } from "@/core/models/gender";
import { IsReadyToJoin } from "@/core/models/is-ready-to-join";
import { KnownVia } from "@/core/models/known-via";
import { User } from "@/core/models/user";
import { UserStudyYear } from "@/core/models/user-study-year";
import { useAuth } from "@/features/auth/useAuth";
import { AvatarPicker } from "@/shared/components/avatar-picker/Avatar-picker";
import { AppDatePicker } from "@/shared/components/date-picker/DatePicker";
import { FormItem } from "@/shared/components/form-item/FormItem";
import { AppSelect, Option } from "@/shared/components/select/Select";
import { AppTextField } from "@/shared/components/text-field/TextField";
import { enumToArray } from "@/utils/funcs/enum-to-array";

import { informationActivePageAtomFn, informationUserAtom } from "../../../information-atoms";
import { InformationGPALogo } from "../../information-gpa-logo/InformationGPALogo";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";
import { schema } from "./schema";

const genderList: Option[] = enumToArray(Gender).map((gender) => ({
  label: Gender.toReadable(gender),
  value: gender,
}));

const studyYearList: Option[] = enumToArray(UserStudyYear).map((year) => ({
  label: UserStudyYear.toReadable(year),
  value: year,
}));

const isReadyToJoinList: Option[] = [true, false].map((isReady) => ({
  label: IsReadyToJoin.toReadable(isReady),
  value: isReady.toString(),
}));

const knownViaList: Option[] = enumToArray(KnownVia).map((knownVia) => ({
  label: KnownVia.toReadable(knownVia),
  value: knownVia,
}));

export const InitializeInfoPage: FC = () => {
  const [, increasePage] = useAtom(informationActivePageAtomFn.increasePage);
  const { currentUser } = useAuth();

  const [userInformation, setUserInformation] = useAtom(informationUserAtom);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({
    resolver: yupResolver(schema),
    defaultValues: userInformation
      ? {
          email: currentUser?.email ?? "",
          fullName: userInformation.fullName,
          gender: userInformation.gender,
          dateOfBirth: userInformation.dateOfBirth,
          phoneNumber: userInformation.phoneNumber,
          facebookUrl: userInformation.facebookUrl,
          studyUnit: userInformation.studyUnit,
          knownVia: userInformation.knownVia,
          year: userInformation.year,
          isReadyToJoin: userInformation.isReadyToJoin,
        }
      : {
          email: currentUser?.email ?? "",
        },
  });

  const handleSubmitPage1 = (data: User): void => {
    increasePage();
    setUserInformation(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitPage1)}>
      <InformationContentWrapper>
        <Stack direction="row" alignItems="center" padding="10px 0" spacing={1}>
          <InformationGPALogo />
          <Typography fontWeight={600}>Khởi tạo thông tin cá nhân</Typography>
        </Stack>
        <FormItem label="Avatar" error={errors.avatar?.message}>
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
        </FormItem>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <FormItem label="Họ và tên" isRequired error={errors.fullName?.message}>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { value, onChange } }) => (
                  <AppTextField placeholder="Họ và tên" value={value} onChange={onChange} />
                )}
              />
            </FormItem>
          </Grid>

          <Grid item xs={6}>
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
          </Grid>

          <Grid item xs={6}>
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
          </Grid>

          <Grid item xs={6}>
            <FormItem label="Ngày sinh" isRequired error={errors.dateOfBirth?.message}>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { value, onChange } }) => (
                  <AppDatePicker value={value} onChange={onChange} />
                )}
              />
            </FormItem>
          </Grid>

          <Grid item xs={6}>
            <FormItem label="Số điện thoại" isRequired error={errors.phoneNumber?.message}>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { value, onChange } }) => (
                  <AppTextField
                    inputProps={{ maxLength: 12 }}
                    value={value}
                    onChange={onChange}
                    placeholder="Vd: 0909090902"
                  />
                )}
              />
            </FormItem>
          </Grid>

          <Grid item xs={6}>
            <FormItem label="Link facebook" isRequired error={errors.facebookUrl?.message}>
              <Controller
                control={control}
                name="facebookUrl"
                render={({ field: { value, onChange } }) => (
                  <AppTextField value={value} onChange={onChange} placeholder="http://..." />
                )}
              />
            </FormItem>
          </Grid>

          <Grid item xs={6}>
            <FormItem label="Đơn vị học tập" isRequired error={errors.studyUnit?.message}>
              <Controller
                control={control}
                name="studyUnit"
                render={({ field: { value, onChange } }) => (
                  <AppTextField
                    value={value}
                    onChange={onChange}
                    placeholder="Vd: Đại học Kinh tế - Luật"
                  />
                )}
              />
            </FormItem>
          </Grid>

          <Grid item xs={6}>
            <FormItem label="Bạn đang là sinh viên năm" isRequired error={errors.year?.message}>
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
          </Grid>
        </Grid>

        <FormItem label="Bạn biết đến KNKD qua" isRequired error={errors.knownVia?.message}>
          <Controller
            control={control}
            name="knownVia"
            render={({ field: { value, onChange } }) => (
              <AppSelect
                placeholder="Chọn câu trả lời"
                value={value}
                onChange={onChange}
                list={knownViaList}
              />
            )}
          />
        </FormItem>

        <FormItem
          isNoSpace
          error={errors.isReadyToJoin?.message}
          label="Bạn sẵn sàng tham gia Networking Day (25/02/2023) của KNKD để có thêm cơ hội giao lưu học hỏi và trực tiếp ghép đội thi không? (trắc nghiệm) (bắt buộc)"
          isRequired
        >
          <Controller
            control={control}
            name="isReadyToJoin"
            render={({ field: { value, onChange } }) => (
              <AppSelect
                placeholder="Chọn câu trả lời"
                value={value ? value.toString() : ""}
                onChange={onChange}
                list={isReadyToJoinList}
              />
            )}
          />
        </FormItem>
      </InformationContentWrapper>
      <InformationActionWrapper>
        <Button type="submit" variant="contained">
          Tiếp theo
        </Button>
      </InformationActionWrapper>
    </form>
  );
};
