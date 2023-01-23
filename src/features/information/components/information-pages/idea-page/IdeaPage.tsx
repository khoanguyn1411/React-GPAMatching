import { Button, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useState } from "react";

import { AppRadio } from "@/shared/components/radio/Radio";
import { AppRadioGroup } from "@/shared/components/radio/RadioGroup";

import { informationActivePageAtomFn } from "../../../information-atoms";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";

export const IdeaPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  const [fg, setFr] = useState("");
  console.log(fg);
  return (
    <>
      <InformationContentWrapper>
        <AppRadioGroup value={fg} onChange={setFr}>
          <Stack justifyContent={"space-between"} direction="row">
            <AppRadio label="Bạn đã có ý tưởng" value="got-idea" />
            <AppRadio label="Bạn chưa có ý tưởng" value="no-idea" />
          </Stack>
        </AppRadioGroup>
      </InformationContentWrapper>
      <InformationActionWrapper>
        <Button onClick={decreasePage} variant="outlined">
          Quay lại
        </Button>

        <Button variant="contained">Hoàn thành</Button>
      </InformationActionWrapper>
    </>
  );
};
