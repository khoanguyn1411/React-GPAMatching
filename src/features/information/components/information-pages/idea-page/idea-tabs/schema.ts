import * as yup from "yup";

import { IsReadyToJoin } from "@/core/models/is-ready-to-join";
import { UserWithNoIdea } from "@/core/models/user-with-no-idea";
import { APP_ERROR_MESSAGE } from "@/shared/constants/error-messages";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { YupValidation } from "@/utils/types/yup";

export const userWithNoIdeaSchema = yup.object().shape<YupValidation<UserWithNoIdea>>({
  readyToJoin: yup
    .mixed<IsReadyToJoin.ThreeChoices>()
    .oneOf(enumToArray(IsReadyToJoin.ThreeChoices))
    .required(APP_ERROR_MESSAGE.REQUIRED),
  experience: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
});
