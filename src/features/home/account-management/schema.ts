import { UserProfile } from "firebase/auth";
import * as yup from "yup";

import { Gender } from "@/core/models/gender";
import { UserStudyYear } from "@/core/models/user-study-year";
import { APP_ERROR_MESSAGE } from "@/shared/constants/error-messages";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { YupValidation } from "@/utils/types/yup";

export const schema = yup.object().shape<YupValidation<UserProfile>>({
  fullName: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  email: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  gender: yup.mixed<Gender>().oneOf(enumToArray(Gender)).required(APP_ERROR_MESSAGE.REQUIRED),
  dateOfBirth: yup
    .date()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .typeError("Vui lòng nhập ngày đúng định dạng dd/mm/yyyy."),
  phoneNumber: yup.string().required(APP_ERROR_MESSAGE.REQUIRED).min(10, "Vui lòng nhập 10 ký tự"),
  studyUnit: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  year: yup
    .mixed<UserStudyYear>()
    .oneOf(enumToArray(UserStudyYear))
    .required(APP_ERROR_MESSAGE.REQUIRED),
  avatarUrl: yup.string(),
  avatar: yup.mixed(),
  city: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  skillSet: yup
    .array()
    .of(yup.string())
    .test("is-empty-role-manager", APP_ERROR_MESSAGE.REQUIRED, (value) => {
      return value ? value.length > 0 : false;
    }),
});
