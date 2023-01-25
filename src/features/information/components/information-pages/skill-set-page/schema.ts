import * as yup from "yup";

import { UserSkillSet } from "@/core/models/user";
import { APP_ERROR_MESSAGE } from "@/shared/constants/error-messages";
import { YupValidation } from "@/utils/types/yup";

export const schema = yup.object().shape<YupValidation<UserSkillSet>>({
  skillSet: yup.array().of(yup.string()),
});
