import { useAtom } from "jotai";
import { FC } from "react";

import { informationActivePageAtom } from "../information-atoms";
import { IdeaPage } from "./information-pages/IdeaPage";
import { InitializeInfoPage } from "./information-pages/InitializeInfoPage";
import { SkillSetPage } from "./information-pages/SkillSetPage";

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
