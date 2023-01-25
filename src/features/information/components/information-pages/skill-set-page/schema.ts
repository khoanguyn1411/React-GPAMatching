import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants/error-messages";
import { UserSkillSet } from "@/core/models/user";
import { YupValidation } from "@/utils/types/yup";

export const schema = yup.object().shape<YupValidation<UserSkillSet>>({
  skillSet: yup.array().of(yup.string()),
});
