import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { ProjectCreation } from "@/core/models/project";
import { UserWithNoIdea } from "@/core/models/user-with-no-idea";
import { projectSchema } from "@/features/home/project-management/tabs/my-project-tab/form/shema";
import { AppRadio } from "@/shared/components/radio/Radio";
import { AppRadioGroup } from "@/shared/components/radio/RadioGroup";

import {
  informationActivePageAtomFn,
  isAlreadyFilledInformationFormAtom,
} from "../../../information-atoms";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";
import { GotIdeaTab } from "./idea-tabs/GotIdeaTab";
import { NoIdeaTab } from "./idea-tabs/NoIdeaTab";
import { userWithNoIdeaSchema } from "./idea-tabs/schema";

enum TabValue {
  GotIdea = "gotIdea",
  NoIdea = "noIdea",
}

export const IdeaPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  const [activeTab, setActiveTab] = useState<string>(TabValue.GotIdea);
  const [, setIsFilledInfo] = useAtom(isAlreadyFilledInformationFormAtom);
  const noIdeaFormProps = useForm<UserWithNoIdea>({
    resolver: yupResolver(userWithNoIdeaSchema),
    shouldUnregister: true,
  });
  const gotIdeaFormProps = useForm<ProjectCreation>({
    resolver: yupResolver(projectSchema("full")),
    shouldUnregister: true,
  });

  const submitGotIdeaForm = (data: ProjectCreation) => {
    setIsFilledInfo(true);
  };
  const submitNoIdeaForm = (data: UserWithNoIdea) => {
    setIsFilledInfo(true);
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
        <Box marginBottom={2}>
          <AppRadioGroup value={activeTab} onChange={setActiveTab}>
            <Stack direction="row" justifyContent="space-between">
              <AppRadio label="Bạn đã có ý tưởng" value={TabValue.GotIdea} />
              <AppRadio label="Bạn chưa có ý tưởng" value={TabValue.NoIdea} />
            </Stack>
          </AppRadioGroup>
        </Box>
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
