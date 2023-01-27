import * as yup from "yup";

import { UserSkillSet } from "@/core/models/user-skill-set";
import { APP_ERROR_MESSAGE } from "@/shared/constants/error-messages";
import { YupValidation } from "@/utils/types/yup";

export const schema = yup.object().shape<YupValidation<UserSkillSet>>({
  skillSet: yup
    .array()
    .of(yup.string())
    .test("is-empty-role-manager", APP_ERROR_MESSAGE.REQUIRED, (value) => {
      return value ? value.length > 0 : false;
    }),
});
