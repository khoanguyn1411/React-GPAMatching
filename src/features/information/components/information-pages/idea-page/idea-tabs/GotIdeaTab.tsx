import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

import { ProjectCreation } from "@/core/models/project";
import { EditProjectForm } from "@/features/home/project-management/tabs/my-project-tab/form/EditProjectForm";

type Props = {
  formProps: UseFormReturn<ProjectCreation>;
};

export const GotIdeaTab: FC<Props> = ({ formProps }) => {
  return <EditProjectForm mode="create" formProps={formProps} />;
};
