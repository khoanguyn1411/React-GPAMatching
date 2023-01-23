import { Button, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useState } from "react";

import { AppRadio } from "@/shared/components/radio/Radio";
import { AppRadioGroup } from "@/shared/components/radio/RadioGroup";

import { informationActivePageAtomFn } from "../../../information-atoms";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";
import { GotIdeaTab } from "./idea-tabs/GotIdeaTab";
import { NoIdeaTab } from "./idea-tabs/NoIdeaTab";

enum TabValue {
  GotIdea = "gotIdea",
  NoIdea = "noIdea",
}

export const IdeaPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  const [activeTab, setActiveTab] = useState<string>(TabValue.GotIdea);
  return (
    <form>
      <InformationContentWrapper>
        <AppRadioGroup value={activeTab} onChange={setActiveTab}>
          <Stack justifyContent="space-between" direction="row">
            <AppRadio label="Bạn đã có ý tưởng" value={TabValue.GotIdea} />
            <AppRadio label="Bạn chưa có ý tưởng" value={TabValue.NoIdea} />
          </Stack>
        </AppRadioGroup>
        {activeTab === TabValue.GotIdea && <GotIdeaTab />}
        {activeTab === TabValue.NoIdea && <NoIdeaTab />}
      </InformationContentWrapper>
      <InformationActionWrapper>
        <Button onClick={decreasePage} variant="outlined">
          Quay lại
        </Button>

        <Button variant="contained">Hoàn thành</Button>
      </InformationActionWrapper>
    </form>
  );
};
