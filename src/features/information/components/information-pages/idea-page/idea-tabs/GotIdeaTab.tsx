import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

import { Project } from "@/core/models/project";
import { EditProjectForm } from "@/features/home/project-management/tabs/my-project-tab/EditProjectForm";

type Props = {
  formProps: UseFormReturn<Project>;
};

export const GotIdeaTab: FC<Props> = ({ formProps }) => {
  return <EditProjectForm mode="create" formProps={formProps} />;
};
