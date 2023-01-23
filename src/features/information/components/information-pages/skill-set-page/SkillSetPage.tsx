import { Button, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useState } from "react";

import { AppCheckbox } from "@/shared/components/checkbox-group/AppCheckbox";
import { CheckboxGroup } from "@/shared/components/checkbox-group/CheckboxGroup";

import { informationActivePageAtomFn } from "../../../information-atoms";
import { InformationGPALogo } from "../../information-gpa-logo/InformationGPALogo";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";

export const SkillSetPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  const [, increasePage] = useAtom(informationActivePageAtomFn.increasePage);
  const [chk, setChk] = useState<string[]>([]);
  return (
    <form>
      <InformationContentWrapper>
        <Stack direction="row" alignItems="center" padding="10px 0" spacing={1}>
          <InformationGPALogo />
          <Typography fontWeight={600}>Kỹ năng nổi trội của bạn là gì?</Typography>
        </Stack>
        <CheckboxGroup value={chk} onChange={setChk}>
          <AppCheckbox value={"Test 1"} label="Test 1" />
          <AppCheckbox value={"Test 2"} label="Test 2" />
        </CheckboxGroup>
      </InformationContentWrapper>

      <InformationActionWrapper>
        <Button onClick={decreasePage} variant="outlined">
          Quay lại
        </Button>

        <Button onClick={increasePage} variant="contained">
          Tiếp theo
        </Button>
      </InformationActionWrapper>
    </form>
  );
};
