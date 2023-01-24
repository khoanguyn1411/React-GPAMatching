import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { Skill } from "@/core/models/skills";
import { UserSkillSet } from "@/core/models/user";
import { AppCheckbox } from "@/shared/components/checkbox-group/AppCheckbox";
import { CheckboxGroup } from "@/shared/components/checkbox-group/CheckboxGroup";
import { FormItem } from "@/shared/components/form-item/FormItem";
import { enumToArray } from "@/utils/funcs/enum-to-array";

import { informationActivePageAtomFn, skillSetAtom } from "../../../information-atoms";
import { InformationGPALogo } from "../../information-gpa-logo/InformationGPALogo";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";
import { schema } from "./schema";

export const SkillSetPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  const [, increasePage] = useAtom(informationActivePageAtomFn.increasePage);

  const [userSkillSet, setUserSkillSet] = useAtom(skillSetAtom);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSkillSet>({
    resolver: yupResolver(schema),
    defaultValues: { skillSet: userSkillSet?.skillSet ?? [] },
  });

  const handleSubmitPage2 = (data: UserSkillSet): void => {
    increasePage();
    setUserSkillSet(data);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitPage2)}>
      <InformationContentWrapper>
        <Stack direction="row" alignItems="center" padding="10px 0" spacing={1}>
          <InformationGPALogo />
          <Typography fontWeight={600}>Kỹ năng nổi trội của bạn là gì?</Typography>
        </Stack>
        <FormItem error={errors.skillSet?.message}>
          <Controller
            control={control}
            name="skillSet"
            render={({ field: { value, onChange } }) => (
              <CheckboxGroup value={value as string[]} onChange={onChange}>
                <Grid container>
                  {enumToArray(Skill).map((skill) => (
                    <Grid xs={4} key={skill}>
                      <AppCheckbox value={skill} label={Skill.toReadable(skill)} />
                    </Grid>
                  ))}
                </Grid>
              </CheckboxGroup>
            )}
          />
        </FormItem>
      </InformationContentWrapper>

      <InformationActionWrapper>
        <Button type="button" onClick={decreasePage} variant="outlined">
          Quay lại
        </Button>

        <Button type="submit" variant="contained">
          Tiếp theo
        </Button>
      </InformationActionWrapper>
    </form>
  );
};
