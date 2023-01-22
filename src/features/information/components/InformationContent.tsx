import { useAtom } from "jotai";
import { FC } from "react";

import { informationActivePageAtom } from "../information-atoms";
import { IdeaPage } from "./information-pages/idea-page/IdeaPage";
import { InitializeInfoPage } from "./information-pages/initialize-info-page/InitializeInfoPage";
import { SkillSetPage } from "./information-pages/skill-set-page/SkillSetPage";

export const InformationContent: FC = () => {
  const [activePage] = useAtom(informationActivePageAtom);
  if (activePage === 1) {
    return <InitializeInfoPage />;
  }
  if (activePage === 2) {
    return <SkillSetPage />;
  }
  return <IdeaPage />;
};
