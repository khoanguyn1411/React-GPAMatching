import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { Project } from "@/core/models/project";
import { UserWithNoIdea } from "@/core/models/user-with-no-idea";
import { AppRadio } from "@/shared/components/radio/Radio";
import { AppRadioGroup } from "@/shared/components/radio/RadioGroup";

import { informationActivePageAtomFn } from "../../../information-atoms";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";
import { GotIdeaTab } from "./idea-tabs/GotIdeaTab";
import { NoIdeaTab } from "./idea-tabs/NoIdeaTab";
import { projectSchema, userWithNoIdeaSchema } from "./idea-tabs/schema";

enum TabValue {
  GotIdea = "gotIdea",
  NoIdea = "noIdea",
}

export const IdeaPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  const [activeTab, setActiveTab] = useState<string>(TabValue.GotIdea);
  const noIdeaFormProps = useForm<UserWithNoIdea>({
    resolver: yupResolver(userWithNoIdeaSchema),
  });
  const gotIdeaFormProps = useForm<Project>({
    resolver: yupResolver(projectSchema),
  });

  const submitGotIdeaForm = (data: Project) => {
    console.log(data);
  };
  const submitNoIdeaForm = (data: UserWithNoIdea) => {
    console.log(data);
  };

  const initializeSubmitFn = () => {
    if (activeTab === TabValue.GotIdea) {
      return gotIdeaFormProps.handleSubmit(submitGotIdeaForm);
    }
    return noIdeaFormProps.handleSubmit(submitNoIdeaForm);
  };
  return (
    <form onSubmit={initializeSubmitFn()}>
      <InformationContentWrapper>
        <Stack marginBottom={2}>
          <AppRadioGroup value={activeTab} onChange={setActiveTab}>
            <Stack direction="row" justifyContent="space-between">
              <AppRadio label="Bạn đã có ý tưởng" value={TabValue.GotIdea} />
              <AppRadio label="Bạn chưa có ý tưởng" value={TabValue.NoIdea} />
            </Stack>
          </AppRadioGroup>
        </Stack>
        {activeTab === TabValue.GotIdea && <GotIdeaTab formProps={gotIdeaFormProps} />}
        {activeTab === TabValue.NoIdea && <NoIdeaTab formProps={noIdeaFormProps} />}
      </InformationContentWrapper>
      <InformationActionWrapper>
        <Button onClick={decreasePage} variant="outlined">
          Quay lại
        </Button>

        <Button type="submit" variant="contained">
          Hoàn thành
        </Button>
      </InformationActionWrapper>
    </form>
  );
};
