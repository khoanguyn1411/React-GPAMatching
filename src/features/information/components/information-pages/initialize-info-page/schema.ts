import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants/error-messages";
import { Gender } from "@/core/models/gender";
import { StudyYear } from "@/core/models/studyYear";
import { User } from "@/core/models/user";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { YupValidation } from "@/utils/types/yup";

export const schema = yup.object().shape<YupValidation<User>>({
  fullName: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  email: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  gender: yup.mixed<Gender>().oneOf(enumToArray(Gender)).required(APP_ERROR_MESSAGE.REQUIRED),
  dateOfBirth: yup.date().required(APP_ERROR_MESSAGE.REQUIRED),
  phoneNumber: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  facebookUrl: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  studyUnit: yup
    .mixed<StudyYear>()
    .oneOf(enumToArray(StudyYear))
    .required(APP_ERROR_MESSAGE.REQUIRED),
  year: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  knownVia: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  isReadyToJoin: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  avatarUrl: yup.string(),
  avatar: yup.mixed(),
});
