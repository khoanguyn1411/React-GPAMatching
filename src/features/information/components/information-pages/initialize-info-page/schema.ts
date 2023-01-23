import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants/error-messages";
import { Gender } from "@/core/models/gender";
import { StudyYear } from "@/core/models/study-year";
import { User } from "@/core/models/user";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { YupValidation } from "@/utils/types/yup";

export const schema = yup.object().shape<YupValidation<User>>({
  fullName: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  email: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  gender: yup.mixed<Gender>().oneOf(enumToArray(Gender)).required(APP_ERROR_MESSAGE.REQUIRED),
  dateOfBirth: yup
    .date()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .typeError("Vui lòng nhập ngày đúng định dạng dd/mm/yyyy."),
  phoneNumber: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  facebookUrl: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  studyUnit: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  year: yup.mixed<StudyYear>().oneOf(enumToArray(StudyYear)).required(APP_ERROR_MESSAGE.REQUIRED),
  knownVia: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  isReadyToJoin: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  avatarUrl: yup.string(),
  avatar: yup.mixed(),
});
