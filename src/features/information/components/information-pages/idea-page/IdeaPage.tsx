import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";

import { informationActivePageAtomFn } from "../../../information-atoms";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";

export const IdeaPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  return (
    <>
      <InformationContentWrapper>
        <span>This is page 3</span>
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
