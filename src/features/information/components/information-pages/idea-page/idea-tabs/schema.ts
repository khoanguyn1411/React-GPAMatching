import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants/error-messages";
import { IsReadyToJoin } from "@/core/models/is-ready-to-join";
import { Project } from "@/core/models/project";
import { ProjectField } from "@/core/models/project-field";
import { ProjectStatus } from "@/core/models/project-status";
import { UserWithNoIdea } from "@/core/models/user-with-no-idea";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { YupValidation } from "@/utils/types/yup";

export const projectSchema = yup.object().shape<YupValidation<Project>>({
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  description: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  field: yup
    .mixed<ProjectField>()
    .oneOf(enumToArray(ProjectField))
    .required(APP_ERROR_MESSAGE.REQUIRED),
  status: yup
    .mixed<ProjectStatus>()
    .oneOf(enumToArray(ProjectStatus))
    .required(APP_ERROR_MESSAGE.REQUIRED),
  currentMemberQuantity: yup
    .string()
    .required(APP_ERROR_MESSAGE.MIN_NUMBER(0))
    .test("is-over-0", APP_ERROR_MESSAGE.REQUIRED, (value) => {
      return value ? Number(value) > 0 : false;
    }),
  findingMemberQuantity: yup
    .string()
    .required(APP_ERROR_MESSAGE.MIN_NUMBER(0))
    .test("is-over-0", APP_ERROR_MESSAGE.REQUIRED, (value) => {
      return value ? Number(value) > 0 : false;
    })
    .test("is-integer", APP_ERROR_MESSAGE.INTEGER, (value) => {
      return value ? Number.isInteger(value) : false;
    }),
  requiredSkills: yup
    .array()
    .of(yup.string())
    .test("is-not-empty-array", APP_ERROR_MESSAGE.REQUIRED, (value) => {
      return value ? value.length > 0 : false;
    }),
  readyToJoin: yup
    .mixed<IsReadyToJoin.ThreeChoices>()
    .oneOf(enumToArray(IsReadyToJoin.ThreeChoices))
    .required(APP_ERROR_MESSAGE.REQUIRED),
});

export const userWithNoIdeaSchema = yup.object().shape<YupValidation<UserWithNoIdea>>({
  readyToJoin: yup
    .mixed<IsReadyToJoin.ThreeChoices>()
    .oneOf(enumToArray(IsReadyToJoin.ThreeChoices))
    .required(APP_ERROR_MESSAGE.REQUIRED),
  experience: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
});
